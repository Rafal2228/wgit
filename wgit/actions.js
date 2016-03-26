const path = require('path')
const format = require('string-format')

module.exports = function (wgit) {
  wgit.actionStatus = function () {
    wgit.projects
      .map(function (project) {
        project.repos.map(function (repo) {
          var dir = path.join(project.root, repo.repo)
          wgit.executeAction(
            wgit.format('git -C {} rev-parse --abbrev-ref HEAD', dir), function (res_branch) {
              wgit.executeAction(wgit.format('git -C {} diff --shortstat', dir), function (res_diff) {
                var res = [res_branch, res_diff]
                wgit.printPretty(repo, res)
              })
          })
        })
      })
  }

  wgit.actionTag = function (tag, delegate) {
    var index = wgit.tags.indexOf(tag)
    if (index != -1) {
      var tagged = wgit.browse(tag)
      tagged.map(function (item) {
        var repo = path.join(item[0], item[1].repo)
        wgit.executeAction(wgit.format('git -C {} {}', repo, delegate), function (res_delegate) {
          var res = [res_delegate]
          wgit.printPretty(item[1], res)
        })
      })
    } else {
      console.log(wgit.chalk.red('Incorrect repo alias.'))
    }
  }
}
