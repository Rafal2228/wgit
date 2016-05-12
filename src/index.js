#!/usr/bin/env node
import cli from 'commander';
import Loader from './loader';
import Dispatcher from './dispatcher';
const loader = new Loader('.wgit.json');
const dispatcher = new Dispatcher(loader);

dispatcher.register(cli, 'init', dispatcher.actionInit.bind(dispatcher));
dispatcher.register(cli, 'list', dispatcher.actionList.bind(dispatcher));
dispatcher.register(cli, 'dunk <tag>', dispatcher.actionDunk.bind(dispatcher));

cli.version('0.1.5', '-v, --version');
cli.parse(loader.args);

if (!loader.args.slice(2).length) {
  cli.help((i) => i);
}
