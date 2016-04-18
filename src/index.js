#!/usr/bin/env node

const cli = require('commander');

const loader = require('loader')('.wgit.json');
const dispatcher = require('dispatcher');

dispatcher.register(cli, 'init', dispatcher.actionInit);
dispatcher.register(cli, 'list', dispatcher.actionList);
dispatcher.register(cli, 'status <tag>', dispatcher.actionDelegate);
dispatcher.register(cli, 'submodule <tag>', dispatcher.actionDelegate);
dispatcher.register(cli, 'branch <tag>', dispatcher.actionDelegate);
dispatcher.register(cli, 'tag <tag>', dispatcher.actionDelegate);
dispatcher.register(cli, 'diff <tag>', dispatcher.actionDelegate);
dispatcher.register(cli, 'cached <tag>', dispatcher.actionCached);
dispatcher.register(cli, 'fetch <tag>', dispatcher.actionDelegate);
dispatcher.register(cli, 'pull <tag>', dispatcher.actionDelegate);
dispatcher.register(cli, 'dunk <tag>', dispatcher.actionDunk);

cli.version('0.1.4', '-v, --version');
cli.parse(loader.args);

if (!loader.args.slice(2).length) {
  cli.help((i) => i);
}
