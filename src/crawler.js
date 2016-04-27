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
    return Crawler.readDir(dir).then((v) => {
      let repos = [];
      let subrepos = [];
      v.forEach((item) => item.repo ? repos.push(item.repo) : subrepos.push(item.subrepo));
      return { repos, subrepos };
    });
  }

  static readDir(dir, submodule = false) {
    return readDirAsync(dir)
    .map((item) => {
      if (skipFolders.indexOf(item) != -1) {
        return;
      }

      const fullPath = path.join(dir, item);
      return lstatAsync(fullPath)
      .then((stats) => {
        if (item === '.git') {
          if (!submodule) {
            submodule = true;
            return { repo: dir };
          } else {
            return { subrepo: dir };
          }
        }

        if (stats.isDirectory()) {
          return Crawler.readDir(fullPath, submodule);
        }
      });
    })
    .reduce(function (a, b) {
      if (!b) {
        return a;
      }

      return a.concat(b);
    }, [])
    .catch(() => {});
  }
}

export default Crawler;
