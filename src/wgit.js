import cmd from 'cmd-exec';
import chalk from 'chalk';

class WatchGit {
  executeAction(command) {
    return cmd.init().exec(command);
  }

  cleanItem(res, callback) {
    return res
      .map((item) => item.message ? callback(item.message) : '')
      .filter((item) => item.length > 0);
  }

  trimItem(res) {
    return this.cleanItem(res, (item) => item.trim());
  }

  trimRightItem(res) {
    return this.cleanItem(res, (item) => item.replace(/\n+$/, ''));
  }

  printPretty(repo, res) {
    let message = this.trimItem(res);
    if (!message.length) {
      return;
    }

    message = message.join(', ');
    console.log(
      chalk.blue(repo.name),
      chalk.green(`(${repo.tag})`),
      chalk.yellow(message)
    );
  }

  printSub(repo, _sub, _message) {
    let sub = this.trimItem(_sub);
    let message = _message ? this.trimRightItem(_message) : [];
    if (!sub.length) {
      return;
    }

    sub = sub.join(', ');
    console.log(
      chalk.blue(repo.name),
      chalk.green(`(${repo.tag})`),
      chalk.red(`(${sub})`),
      chalk.yellow(message)
    );
  }
}

export const wgit = new WatchGit();
