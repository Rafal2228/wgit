const cmd = require('cmd-exec').init();
const chalk = require('chalk');
const format = require('string-format');

module.exports = function (wgit) {
  wgit.register = function (cli, command, action) {
    cli
      .command(command)
      .action(action)
  }

  wgit.executeAction = function (command) {
    return cmd.exec(command);
  }

  wgit
    .cleanItem = function (res, callback) {
    return res
      .map(function (item) {
        return item.message ? callback(item.message) : ''
      })
      .filter(function (item) {
        return item.length > 0
      })
  }

  wgit
    .trimItem = function (res) {
    return wgit.cleanItem(res, function (item) {
      return item.trim()
    })
  }

  wgit
    .trimRightItem = function (res) {
    return wgit.cleanItem(res, function (item) {
      return item.replace(/\n+$/, '')
    })
  }

  wgit
    .printPretty = function (repo, res) {
    var message = wgit.trimItem(res)
    if (message.length) {
      message = message.join(', ')
      console.log(
        chalk.blue(repo.name),
        chalk.green(format('({})', repo.tag)),
        chalk.yellow(message)
      )
    }
  }

  wgit
    .printSub = function (repo, _sub, _message) {
    var sub = wgit.trimItem(_sub)
    var message = _message ? wgit.trimRightItem(_message) : []
    if (sub.length) {
      sub = sub.join(', ')
      console.log(
        chalk.blue(repo.name),
        chalk.green(format('({})', repo.tag)),
        chalk.red(format('({})', sub)),
        chalk.yellow(message)
      )
    }
  }
}
