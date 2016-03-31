const path = require('path')
const format = require('string-format')

module.exports = function (wgit) {
    wgit
        .actionStatus = function () {
            wgit.projects
                .map(function (project) {
                    project.repos
                        .map(function (repo) {
                            var dir = path.join(project.root, repo.repo)
                            var branch = wgit.format('git -C {} rev-parse --abbrev-ref HEAD', dir)
                            wgit.executeAction(
                                branch,
                                function (res_branch) {
                                    var diff = wgit.format('git -C {} diff --shortstat', dir)
                                    wgit.executeAction(diff, function (res_diff) {
                                        wgit.printPretty(repo, [res_branch, res_diff])
                                    })
                                })
                        })
                })
        }

    wgit
        .actionApply = function (tag) {
            return wgit.actionTag(tag, null, wgit.enterRemote)
        }
    
    wgit
        .actionTagStatus = function (tag) {
            return wgit.actionTag(tag, 'status', wgit.executeRemote)
        }

    wgit
        .actionTagBranch = function (tag) {
            return wgit.actionTag(tag, 'branch', wgit.executeRemote)
        }

    wgit
        .actionTagDiff = function (tag) {
            return wgit.actionTag(tag, 'diff', wgit.executeRemote)
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
        .enterRemote = function (item, _) {
            var dir = path.join(item[0], item[1].repo)
            var cmd = wgit.format('bash cd.sh {}', dir)
            wgit.executeAction(cmd, function (res_delegate) {
                wgit.printPretty(item[1], [res_delegate])
                console.log(process.cwd())
            })
        }

    wgit
        .executeRemote = function (item, delegate) {
            var dir = path.join(item[0], item[1].repo)
            var cmd = wgit.format('git -C {} {}', dir, delegate)
            wgit.executeAction(cmd, function (res_delegate) {
                wgit.printPretty(item[1], [res_delegate])
            })
        }
}
