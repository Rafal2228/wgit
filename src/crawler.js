import fs from 'fs';
import path from 'path';
import Promise from 'bluebird';

let repos = [];
let submodules = [];
let counter =  0;
const skipFolders = [
  '.git',
  'node_modules',
  'bower_components',
];

class Crawler {

  static crawl(dir) {
    return new Promise(function (resolve, reject) {
      Crawler.readDir(resolve, reject, dir);
    });
  }

  static readDir(resolve, reject, dir, submodule = false) {
    fs.readdir(dir, function (err, files) {
      // if (err) reject(err);
      if (!files) {
        return;
      }

      if (files.some((item) => item === '.git')) {
        if (!submodule) {
          repos.push(dir);
          submodule = true;
        } else {
          submodules.push(dir);
        }

        counter += files.length - 1;
      } else {
        counter += files.length;
      }

      files.forEach((item) => {
        if (skipFolders.indexOf(item) != -1) {
          counter--;
          return;
        }

        const fullPath = path.join(dir, item);
        fs.lstat(fullPath, (err, stats) => {
          if (stats.isDirectory()) {
            Crawler.readDir(resolve, reject, fullPath, submodule);
          }

          counter--;
        });
      });

      if (counter === 0) {
        resolve({ repos, submodules });
      }
    });
  }
}

export default Crawler;
