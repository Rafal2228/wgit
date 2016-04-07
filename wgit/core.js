const cmd = require('cmd-exec')

module.exports = function (wgit) {
  wgit
    .register = function (cli, command, action) {
    cli
      .command(command)
      .action(action)
  }

  wgit
    .executeAction = function (command, success) {
    cmd
      .init()
      .exec(command)
      .then(success)
      .fail(function (err) {
        console.log(err.message)
      })
  }

  wgit
    .cleanItem = function (res, callback) {
    return res
      .map(function (item) {
        return item.message ? callback(item.message) : []
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
    .printPretty = function (repo, res, sub) {
    var message = wgit.trimItem(res)
    var optional = sub ? wgit.trimRightItem(sub) : []
    if (message.length) {
      message = message.join(', ')
      console.log(
        wgit.chalk.blue(repo.name),
        wgit.chalk.green(wgit.format('({})', repo.tag)),
        wgit.chalk.yellow(message)
      )
      if (optional.length) {
        console.log(
          wgit.chalk.grey(optional)
        )
      }
    }
  }
}
