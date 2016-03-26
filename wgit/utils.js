const find = require('findup-sync')
const cmd = require('cmd-exec')
const chalk = require('chalk')
const format = require('string-format')

module.exports = function (wgit) {
  wgit.chalk = chalk
  wgit.format = format

  wgit.scan = function () {
    var tags = []
    var append = function (item) {
      tags.push(item.tag)
    }
    wgit.projects.map(function (item) {
      item.repos.map(append)
      item.groups.map(append)
    })
    return tags
  }

  wgit._browse = function (tag) {
    var tagged = function (item) {
      return item.tag === tag
    }
    return wgit.projects
      .map(function (item) {
        var repo = item.repos.filter(tagged).shift()
        return repo ? [item.root, repo] : null
      })
      .filter(function (item) {
        return item != null
      })
  }

  wgit.browse = function (tag) {
    var tagged = function (item) {
      return item.tag === tag
    }
    var groups = wgit.projects
      .map(function (item) {
        var group = item.groups.filter(tagged).shift()
        if (group)
          return group.repos.map(function (tag) {
            return wgit._browse(tag).shift()
          })
      })
      .filter(function (item) {
        return item != null
      })
      .shift()
    return (groups && groups.length) ? groups : wgit._browse(tag)
  }

  wgit.loadConfig = function (filename) {
    var file = find(filename, { cwd: process.cwd() })
    if (file) {
      wgit.projects = require(file).projects
      wgit.tags = wgit.scan()
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

  wgit.printPretty = function (repo, res) {
    var message = res
      .map(function (item) {
        return item.message.trim()
      })
      .filter(function (item) {
        return item.length > 0
      })
    if (message) {
      message = message.join(', ')
      console.log(
        wgit.chalk.blue(repo.name),
        wgit.chalk.green(wgit.format('({})', repo.tag)),
        wgit.chalk.yellow(message)
      )
    }
  }
}
