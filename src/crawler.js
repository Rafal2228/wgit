import fs from 'fs';
import path from 'path';
import bluebird from 'bluebird';
import 'babel-polyfill';
const asyncReadDir = bluebird.promisify(fs.readdir);
const asyncLstat = bluebird.promisify(fs.lstat);

const skipFolders = [
  '.git',
  'node_modules',
  'bower_components',
];

class Crawler {

  static crawl(dir) {
    let repos = [];
    let submodules = [];

    let innerCrawl = async (dir, submodule = false) => {
      let files = [];
      try {
        files = await asyncReadDir(dir);
      } catch (err) {
        return;
      }

      if (files.some((item) => item === '.git')) {
        if (!submodule) {
          repos.push(dir);
          submodule = true;
        } else {
          submodules.push(dir);
        }
      }

      for (let item of files) {
        if (skipFolders.indexOf(item) != -1) {
          continue;
        }

        let fullPath = path.join(dir, item);
        let stats = await asyncLstat(fullPath);

        if (stats.isDirectory()) {
          await innerCrawl(fullPath, submodule);
        }
      }

      return {repos, submodules};
    }

    return innerCrawl(dir);
  }

}

export default Crawler;
