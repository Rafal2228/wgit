const path = require('path')
const chalk = require('chalk')
const format = require('string-format')

module.exports = function (wgit) {
  wgit
    .actionInit = function () {
    var root = path.dirname(wgit.root)
    var template = path.join(root, 'templates/template.json')
    var target = path.join(wgit.home, '.wgit.json')
    var cmd = format('cp {} {}', template, target)
    wgit.executeAction(cmd, function (_) {
      console.log(chalk.green(format('Now you can set your projects in {}', target)))
    })
  }

  wgit
    .actionList = function () {
    wgit.projects
      .map(function (project) {
        project.repos
          .map(function (repo) {
            var dir = path.join(project.root, repo.repo)
            wgit.executeStatus(wgit.executeSub, repo, dir)
          })
      })
  }

  wgit
    .executeStatus = function (callback, repo, dir) {
    var args = {
      branch: format('git -C {} rev-parse --abbrev-ref HEAD', dir),
      diff: format('git -C {} diff --shortstat', dir)
    }
    wgit.executeAction(args.branch, function (res_branch) {
      wgit.executeAction(args.diff, function (res_diff) {
        callback([res_branch, res_diff], repo, dir)
      })
    })
  }

  wgit
    .executeSub = function (res, repo, dir) {
    var sub = format('git -C {} submodule | cut -d\' \' -f3', dir)
    wgit.executeAction(sub, function (res_sub) {
      var modules = res_sub.message
        .trim()
        .split('\n')
        .filter(function (i) {return i!=''})
      wgit.printPretty(repo, res)
      modules.map(function (i) {
        repo.root = dir
        wgit.executeStatus(function (res, repo, dir) {
          var subDir = dir.replace(repo.root, '')
          wgit.printSub(repo, [{message: subDir}], res)
        }, repo, path.join(dir, i))
      })
    })
  }

  wgit
    .actionDelegate= function (tag) {
    var delegate = wgit.args[2]
    return wgit.actionTag(tag, delegate, wgit.executeRemote)
  }

  wgit
    .actionCached = function (tag) {
    return wgit.actionTag(tag, 'diff --cached', wgit.executeRemote)
  }

  wgit
    .actionDunk = function (tag) {
    return wgit.actionTag(tag, null, wgit.executeDunk)
  }

  wgit
    .actionTag = function (tag, delegate, remote) {
    var index = wgit.tags.indexOf(tag)
    if (index != -1) {
      var tagged = wgit.browse(tag)
      tagged.map(function (item) {
        remote(item, delegate)
      })
    } else {
      console.log(chalk.red('Incorrect repo alias.'))
    }
  }

  wgit
    .executeRemote = function (item, delegate) {
    var dir = path.join(item[0], item[1].repo)
    var cmd = format('git -C {} {}', dir, delegate)
    wgit.executeAction(cmd, function (res_delegate) {
      wgit.printPretty(item[1], [res_delegate])
    })
  }

  wgit
    .executeDunk = function (item, _) {
    var dir = path.join(item[0], item[1].repo)
    dir = dir.replace('~', wgit.home)
    process.chdir(dir)
    console.log(process.cwd())
  }
}
