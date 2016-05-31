import ava from 'ava';
import path from 'path';
import cli from 'commander';
import Loader from '../lib/loader';
import Dispatcher from '../lib/dispatcher';
const loader = new Loader('loader.test.json', __dirname);
const dispatcher = new Dispatcher(loader);

ava('path try join', (test) => {
  let result = path.join('test/no', '../result');
  test.is(result, 'test/result');
});

ava('register exists', (test) => {
  test.truthy(dispatcher.register);
});

ava('try register', (test) => {
  dispatcher.register(cli, 'keyword', () => {
    let res = cli.parse(['node', 'file', 'keyword']);
    test.truthy(res);
  });
});

ava('actionInit exists', (test) => {
  test.truthy(dispatcher.actionInit);
});

ava('actionList exists', (test) => {
  test.truthy(dispatcher.actionList);
});

ava('executeStatus exists', (test) => {
  test.truthy(dispatcher.executeStatus);
});

ava('executeSub exists', (test) => {
  test.truthy(dispatcher.executeSub);
});

ava('actionDunk exists', (test) => {
  test.truthy(dispatcher.actionDunk);
});

ava('executeDunk exists', (test) => {
  test.truthy(dispatcher.executeDunk);
});
