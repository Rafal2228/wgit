#!/usr/bin/env node

const cli = require('commander')

const WatchGit = function () {}
const wgit = WatchGit.prototype

var _load = function (items) {
    items.map(function (item) {
        require('./wgit/' + item)(wgit)
    })
}
_load(['exports', 'loader', 'core', 'actions'])

instance = new WatchGit()
instance.loadConfig('.wgit.json')
instance.register(cli, 'list', instance.actionStatus)
// instance.default(cli, 'help', instance.actionHelp)
// instance.register(cli, 'init', instance.actionInit)
instance.register(cli, 'status <tag>', instance.actionTagStatus)
instance.register(cli, 'branch <tag>', instance.actionTagBranch)
instance.register(cli, 'diff <tag>', instance.actionTagDiff)
instance.register(cli, 'apply <tag>', instance.actionApply)
cli.parse(process.argv)
