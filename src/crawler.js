import fs from 'fs';
import path from 'path';
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
      let repos = [];
      let subrepos = [];
      list.forEach((item) => item.repo ? repos.push(item.repo) : subrepos.push(item.subrepo));
      return { repos, subrepos };
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
