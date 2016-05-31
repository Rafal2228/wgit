import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import Promise from 'bluebird';
const readDirAsync = Promise.promisify(fs.readdir);
const lstatAsync = Promise.promisify(fs.lstat);
const skipFolders = [
  'node_modules',
  'bower_components',
];

class Crawler {

  static crawl(dir) {
    return Crawler.readDir(dir)
    .then((list) => {
      const repos = [];
      const subrepos = [];

      function standardize(path) {
        return { tag: '', path: path };
      }

      list.forEach((item) => item.repo ?
       repos.push(standardize(item.repo)) :
       subrepos.push(item.subrepo));

      subrepos.forEach((item) => {
        const repo = _.find(repos, (i) => item.indexOf(i.path) > -1);
        if (!repo.submodules) {
          repo.submodules = [];
        }

        repo.submodules.push(standardize(item));
      });
      return repos;
    });
  }

  static readDir(dir, submodule = false) {
    return readDirAsync(dir)
    .map((item) => {
      if (skipFolders.indexOf(item) != -1) {
        return;
      }

      if (item === '.git') {
        if (!submodule) {
          submodule = true;
          return { repo: dir };
        } else {
          return { subrepo: dir };
        }
      }

      const fullPath = path.join(dir, item);
      return lstatAsync(fullPath)
      .then((stats) => {
        if (stats.isDirectory()) {
          return Crawler.readDir(fullPath, submodule);
        }
      });
    })
    .reduce(function (list, item) {
      if (!item) {
        return list;
      }

      return list.concat(item);
    }, [])
    .catch(() => {});
  }
}

export default Crawler;
