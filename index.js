#!/usr/bin/env node

const cli = require('commander')

// Declare class with prototype
const WatchGit = function () {}
const wgit = WatchGit.prototype

// Load dependencies
require('./wgit/utils')(wgit)
require('./wgit/actions')(wgit)

// Halt and catch fire
instance = new WatchGit()
instance.loadConfig('watch.json ')
cli.version('1.0.0')
instance.register(cli, 'status', instance.actionStatus)
instance.register(cli, 'tag <tag> <delegate> *', instance.actionTag)
cli.parse(process.argv)
