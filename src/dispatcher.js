import path from 'path';
import chalk from 'chalk';
import { wgit } from './wgit';

class Dispatcher {

  constructor(loader) {
    this.loader = loader;
  }

  register(cli, command, action) {
    cli.command(command).action(action);
  }

  actionInit() {
    let root = path.dirname(this.loader.root);
    let template = path.join(root, '../src/templates/template.json');
    let target = path.join(this.loader.home, '.wgit.json');
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
    this.loader.projects.map((project) => {
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
        callback.call(this, [resBranch, resDiff], repo, dir);
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

  actionDunk(tag) {
    let index = this.loader.tags.indexOf(tag);
    if (index !== -1) {
      let tagged = this.loader.browse(tag);
      tagged.map((item) => this.executeDunk(item));
    } else {
      console.log(chalk.red('Incorrect repo alias.'));
    }
  }

  executeDunk(item) {
    let dir = path.join(item[0], item[1].repo);
    dir = dir.replace('~', this.loader.home);
    process.chdir(dir);
    console.log(process.cwd());
  }
}

export default Dispatcher;
