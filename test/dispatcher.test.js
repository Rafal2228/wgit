import ava from 'ava';
import path from 'path';
import cli from 'commander';
import { dispatcher } from '../lib/dispatcher';

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

ava('actionDelegate exists', (test) => {
  test.truthy(dispatcher.actionDelegate);
});

ava('actionCached exists', (test) => {
  test.truthy(dispatcher.actionCached);
});

ava('actionDunk exists', (test) => {
  test.truthy(dispatcher.actionDunk);
});

ava('actionTag exists', (test) => {
  test.truthy(dispatcher.actionTag);
});

ava('executeRemote exists', (test) => {
  test.truthy(dispatcher.executeRemote);
});

ava('executeDunk exists', (test) => {
  test.truthy(dispatcher.executeDunk);
});
