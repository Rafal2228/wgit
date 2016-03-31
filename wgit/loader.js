const find = require('findup-sync')

module.exports = function (wgit) {
    wgit
        .scan = function () {
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

    wgit
        ._tagged = function (items, tag) {
            return items
                .filter(function (item) {
                    return item.tag === tag
                })
                .shift()
        }

    wgit
        ._browse = function (tag) {
            return wgit.projects
                .map(function (item) {
                    var repo = wgit._tagged(item.repos, tag)
                    return repo ? [item.root, repo] : null
                })
                .filter(function (item) {
                    return item != null
                })
        }

    wgit
        .browse = function (tag) {
            var groups = wgit.projects
                .map(function (item) {
                    var group = wgit._tagged(item.groups, tag)
                    if (group)
                        return group.repos.map(function (tag) {
                            return wgit
                                ._browse(tag)
                                .shift()
                        })
                    else
                        return null
                })
                .filter(function (item) {
                    return item != null
                })
                .shift()
            return (groups && groups.length) ? groups : wgit._browse(tag)
        }

    wgit
        .loadConfig = function (filename) {
            var file = find(filename, {cwd: process.cwd()})
            if (file) {
                wgit.projects = require(file).projects
                wgit.tags = wgit.scan()
            } else {
                console.log('No valid file found.')
                process.exit(1)
            }
        }
}
