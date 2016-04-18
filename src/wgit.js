#!/usr/bin/env node

const cli = require('commander')

const WatchGit = function () {}
const wgit = WatchGit.prototype

var _load = function (items) {
  items.map(function (item) {
    require('./' + item)(wgit)
  })
}
_load(['exports', 'loader', 'core', 'actions'])

instance = new WatchGit()
instance.loadConfig('.wgit.json')
instance.register(cli, 'init', instance.actionInit)
instance.register(cli, 'list', instance.actionList)
instance.register(cli, 'status <tag>', instance.actionDelegate)
instance.register(cli, 'submodule <tag>', instance.actionDelegate)
instance.register(cli, 'branch <tag>', instance.actionDelegate)
instance.register(cli, 'tag <tag>', instance.actionDelegate)
instance.register(cli, 'diff <tag>', instance.actionDelegate)
instance.register(cli, 'cached <tag>', instance.actionCached)
instance.register(cli, 'fetch <tag>', instance.actionDelegate)
instance.register(cli, 'pull <tag>', instance.actionDelegate)
instance.register(cli, 'dunk <tag>', instance.actionDunk)

cli.version('0.1.4', '-v, --version')
cli.parse(wgit.args)
if (!wgit.args.slice(2).length) {
  cli.help(function (i) {return i})
}
