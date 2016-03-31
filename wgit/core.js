const cmd = require('cmd-exec')

module.exports = function (wgit) {
    wgit
        .register = function (cli, command, action) {
            cli
                .command(command)
                .action(action)
        }

    wgit
        .default = function (cli, command, action) {
            cli
                .command(command, null, {isDefault: true})
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
        .printPretty = function (repo, res) {
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
