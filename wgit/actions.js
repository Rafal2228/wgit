const path = require('path')
const format = require('string-format')

module.exports = function (wgit) {
  wgit.actionStatus = function () {
    var contents = []
    wgit.contents.local_packages
      .map(function (item) {
        var repo = path.join(wgit.contents.global_package, item.package)
        wgit.executeAction(
          wgit.format('git -C {} rev-parse --abbrev-ref HEAD', repo), function (res_branch) {
            wgit.executeAction(wgit.format('git -C {} diff --shortstat', repo), function (res_diff) {
              res = [res_branch, res_diff]
              wgit.printPretty(item, res)
            })
        })
      })
  }

  wgit.actionRepo = function (alias, delegate, args) {
    var index = wgit.repos.indexOf(alias)
    if (index != -1) {
      var item = wgit.contents.local_packages[index]
      var repo = path.join(wgit.contents.global_package, item.package)
      wgit.executeAction(wgit.format('git -C {} {}', repo, delegate), function (res_delegate) {
        res = [res_delegate]
        wgit.printPretty(item, res)
        console.log(args)
      })
    } else {
      console.log(wgit.chalk.red('Incorrect repo alias.'))
    }
  }
}
