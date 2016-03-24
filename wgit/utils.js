const find = require('findup-sync')
const cmd = require('cmd-exec')
const chalk = require('chalk')
const format = require('string-format')

module.exports = function (wgit) {
  wgit.chalk = chalk
  wgit.format = format

  wgit.loadConfig = function (filename) {
    var file = find(filename, { cwd: process.cwd() })
    if (file) {
      wgit.contents = require(file)
      wgit.repos = wgit.contents
        .local_packages
        .map(function (item) {
          return item.alias
        })
    } else {
      console.log('No valid file found.')
      process.exit(1)
    }
  }

  wgit.register = function (cli, command, action) {
    cli
      .command(command)
      .action(action)
  }

  wgit.executeAction = function (command, success) {
    cmd
      .init()
      .exec(command)
      .then(success)
      .fail(function (err) {
        console.log(err.message)
      })
  }

  wgit.printPretty = function (item, res) {
    var message = ''
    message = res
      .map(function (item) {
        return item.message.trim()
      })
      .filter(function (item) {
        return item.length > 0
      })
    if (message) {
      message = message.join(', ')
      console.log(
        wgit.chalk.blue(item.name),
        wgit.chalk.green(wgit.format('({})', item.alias)),
        wgit.chalk.yellow(message)
      )
    }
  }
}
