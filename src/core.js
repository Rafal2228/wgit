const cmd = require('cmd-exec').init();
const chalk = require('chalk');

module.exports = function (wgit) {
  wgit.register = (cli, command, action) => {
    cli.command(command).action(action);
  };

  wgit.executeAction = (command) => cmd.exec(command);

  wgit.cleanItem = function (res, callback) {
    return res
      .map((item) => item.message ? callback(item.message) : '')
      .filter((item) => item.length > 0);
  };

  wgit.trimItem = function (res) {
    return this.cleanItem(res, (item) => item.trim());
  };

  wgit.trimRightItem = function (res) {
    return this.cleanItem(res, (item) => item.replace(/\n+$/, ''));
  };

  wgit.printPretty = function (repo, res) {
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
  };

  wgit.printSub = function (repo, _sub, _message) {
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
  };
};
