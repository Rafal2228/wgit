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
    })
    return tags
  }

  wgit
    .loadConfig = function (filename) {
    var file = find(filename, {cwd: wgit.home})
    if (file) {
      wgit.projects = require(file).projects
      wgit.tags = wgit.scan()
    } else {
      console.log('No valid root found.')
      process.exit(1)
    }
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
    .browse = function (tag) {
    return wgit.projects
      .map(function (item) {
        var repo = wgit._tagged(item.repos, tag)
        return repo ? [item.root, repo] : null
      })
      .filter(function (item) {
        return item != null
      })
  }
}
