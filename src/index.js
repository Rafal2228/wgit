#!/usr/bin/env node
import cli from 'commander';
import Loader from './loader';
import Dispatcher from './dispatcher';
const loader = new Loader('.wgit.json');
const dispatcher = new Dispatcher(loader);

dispatcher.register(cli, 'init', dispatcher.actionInit.bind(dispatcher));
dispatcher.register(cli, 'list', dispatcher.actionList.bind(dispatcher));
dispatcher.register(cli, 'status <tag>', dispatcher.actionDelegate.bind(dispatcher));
dispatcher.register(cli, 'submodule <tag>', dispatcher.actionDelegate.bind(dispatcher));
dispatcher.register(cli, 'branch <tag>', dispatcher.actionDelegate.bind(dispatcher));
dispatcher.register(cli, 'tag <tag>', dispatcher.actionDelegate.bind(dispatcher));
dispatcher.register(cli, 'diff <tag>', dispatcher.actionDelegate.bind(dispatcher));
dispatcher.register(cli, 'cached <tag>', dispatcher.actionCached.bind(dispatcher));
dispatcher.register(cli, 'fetch <tag>', dispatcher.actionDelegate.bind(dispatcher));
dispatcher.register(cli, 'pull <tag>', dispatcher.actionDelegate.bind(dispatcher));
dispatcher.register(cli, 'dunk <tag>', dispatcher.actionDunk.bind(dispatcher));

cli.version('0.1.4', '-v, --version');
cli.parse(loader.args);

if (!loader.args.slice(2).length) {
  cli.help((i) => i);
}
