const path = require('path')

module.exports = function (wgit) {
  wgit
    .actionInit = function () {
    var root = path.dirname(process.mainModule.filename)
    var template = path.join(root, 'templates/template.json')
    var target = path.join(wgit.home, '.wgit.json')
    var cmd = wgit.format('cp {} {}', template, target)
    wgit.executeAction(cmd, function (_) {
      console.log(wgit.chalk.green(wgit.format('Now you can set your projects in {}', target)))
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
      branch: wgit.format('git -C {} rev-parse --abbrev-ref HEAD', dir),
      diff: wgit.format('git -C {} diff --shortstat', dir)
    }
    wgit.executeAction(args.branch, function (res_branch) {
      wgit.executeAction(args.diff, function (res_diff) {
        callback([res_branch, res_diff], repo, dir)
      })
    })
  }

  wgit
    .executeSub = function (res, repo, dir) {
    var sub = wgit.format('git -C {} submodule', dir)
    wgit.executeAction(sub, function (res_sub) {
      console.log(
        res_sub.message
          .split('\n')
          .filter(function(i) {return i != ''})
          .map(function (i) {
            return i
              .split(' ')
              .filter(function (i) {return i != ''})
              [1]
          })
          .map(function (i) {
            return wgit.executeStatus(, repo, path.join(dir, i))
          })
      )
      wgit.printPretty(repo, res, [res_sub])
    })
  }

  wgit
    .actionDelegate= function (tag) {
    var delegate = process.argv[2]
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
      console.log(wgit.chalk.red('Incorrect repo alias.'))
    }
  }

  wgit
    .executeRemote = function (item, delegate) {
    var dir = path.join(item[0], item[1].repo)
    var cmd = wgit.format('git -C {} {}', dir, delegate)
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
