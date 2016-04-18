const path = require('path');
const chalk = require('chalk');
const loader = require('./loader')('.wgit.json');
const wgit = require('./wgit');

class Dispatcher {

  register(cli, command, action) {
    cli.command(command).action(action);
  }

  actionInit() {
    let root = path.dirname(loader.root);
    let template = path.join(root, '../src/templates/template.json');
    let target = path.join(loader.home, '.wgit.json');
    let cmd = `cp ${template} ${target}`;
    wgit.executeAction(cmd)
    .then(() => {
      console.log(chalk.green(`Now you can set your projects in ${target}`));
    })
    .catch((msg) => {
      console.log(chalk.red(msg));
    });
  }

  actionList() {
    loader.projects.map((project) => {
      project.repos.map((repo) => {
        let dir = path.join(project.root, repo.repo);
        this.executeStatus(this.executeSub, repo, dir);
      });
    });
  }

  executeStatus(callback, repo, dir) {
    let args = {
      branch: `git -C ${dir} rev-parse --abbrev-ref HEAD`,
      diff: `git -C ${dir} diff --shortstat`,
    };
    wgit.executeAction(args.branch)
    .then((resBranch) => {
      wgit.executeAction(args.diff)
      .then((resDiff) => {
        callback([resBranch, resDiff], repo, dir);
      });
    })
    .catch((msg) => {
      console.log(chalk.red(msg));
    });
  }

  executeSub(res, repo, dir) {
    let sub = `git -C ${dir} submodule | cut -d\' \' -f3`;
    wgit.executeAction(sub)
    .then((resSub) => {
      let modules = resSub.message.trim().split('\n').filter((i) => i !== '');
      wgit.printPretty(repo, res);
      modules.map((i) => {
        repo.root = dir;
        this.executeStatus((res, repo, dir) => {
          let subDir = dir.replace(repo.root, '');
          wgit.printSub(repo, [{ message: subDir }], res);
        }, repo, path.join(dir, i));
      });
    })
    .catch((msg) => {
      console.log(chalk.red(msg));
    });
  }

  actionDelegate(tag) {
    let delegate = loader.args[2];
    return this.actionTag(tag, delegate, this.executeRemote);
  }

  actionCached(tag) {
    this.actionTag(tag, 'diff --cached', this.executeRemote);
  }

  actionDunk(tag) {
    this.actionTag(tag, null, this.executeDunk);
  }

  actionTag(tag, delegate, remote) {
    let index = loader.tags.indexOf(tag);
    if (index !== -1) {
      let tagged = loader.browse(tag);
      tagged.map((item) => remote(item, delegate));
    } else {
      console.log(chalk.red('Incorrect repo alias.'));
    }
  }

  executeRemote(item, delegate) {
    let dir = path.join(item[0], item[1].repo);
    let cmd = `git -C ${dir} ${delegate}`;
    wgit.executeAction(cmd).then((resDelegate) => {
      wgit.printPretty(item[1], [resDelegate]);
    });
  }

  executeDunk(item) {
    let dir = path.join(item[0], item[1].repo);
    dir = dir.replace('~', loader.home);
    process.chdir(dir);
    console.log(process.cwd());
  }
}

module.exports = new Dispatcher();
