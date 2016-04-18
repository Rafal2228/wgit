const path = require('path');
const chalk = require('chalk');

module.exports = function (wgit) {
  wgit.actionInit = function () {
    let root = path.dirname(this.root);
    let template = path.join(root, 'templates/template.json');
    let target = path.join(this.home, '.wgit.json');
    let cmd = `cp ${template} ${target}`;
    this.executeAction(cmd)
    .then(() => {
      console.log(chalk.green(`Now you can set your projects in ${target}`));
    })
    .catch((msg) => {
      console.log(chalk.red(msg));
    });
  };

  wgit.actionList = function () {
    this.projects.map((project) => {
      project.repos.map((repo) => {
        let dir = path.join(project.root, repo.repo);
        this.executeStatus(this.executeSub, repo, dir);
      });
    });
  };

  wgit.executeStatus = function (callback, repo, dir) {
    let args = {
      branch: `git -C ${dir} rev-parse --abbrev-ref HEAD`,
      diff: `git -C ${dir} diff --shortstat`,
    };
    this.executeAction(args.branch)
    .then((resBranch) => {
      this.executeAction(args.diff)
      .then((resDiff) => {
        callback([resBranch, resDiff], repo, dir);
      });
    })
    .catch((msg) => {
      console.log(chalk.red(msg));
    });
  };

  wgit.executeSub = function (res, repo, dir) {
    let sub = `git -C ${dir} submodule | cut -d\' \' -f3`;
    this.executeAction(sub)
    .then((resSub) => {
      let modules = resSub.message.trim().split('\n').filter((i) => i !== '');
      this.printPretty(repo, res);
      modules.map((i) => {
        repo.root = dir;
        this.executeStatus((res, repo, dir) => {
          let subDir = dir.replace(repo.root, '');
          this.printSub(repo, [{ message: subDir }], res);
        }, repo, path.join(dir, i));
      });
    })
    .catch((msg) => {
      console.log(chalk.red(msg));
    });
  };

  wgit.actionDelegate = function (tag) {
    let delegate = this.args[2];
    return wgit.actionTag(tag, delegate, this.executeRemote);
  };

  wgit.actionCached = function (tag) {
    this.actionTag(tag, 'diff --cached', this.executeRemote);
  };

  wgit.actionDunk = function (tag) {
    this.actionTag(tag, null, this.executeDunk);
  };

  wgit.actionTag = function (tag, delegate, remote) {
    let index = this.tags.indexOf(tag);
    if (index !== -1) {
      let tagged = this.browse(tag);
      tagged.map((item) => remote(item, delegate));
    } else {
      console.log(chalk.red('Incorrect repo alias.'));
    }
  };

  wgit.executeRemote = function (item, delegate) {
    let dir = path.join(item[0], item[1].repo);
    let cmd = `git -C ${dir} ${delegate}`;
    this.executeAction(cmd).then((resDelegate) => {
      this.printPretty(item[1], [resDelegate]);
    });
  };

  wgit.executeDunk = function (item) {
    let dir = path.join(item[0], item[1].repo);
    dir = dir.replace('~', this.home);
    process.chdir(dir);
    console.log(process.cwd());
  };
};
