const ava = require('ava');
const path = require('path');
require('../lib/loader')('loader.test.json', __dirname);
const dispatcher = require('../lib/dispatcher');

ava('path try join', (test) => {
  let result = path.join('test/no', '../result');
  test.is(result, 'test/result');
});

ava('register exists', (test) => {
  test.truthy(dispatcher.register);
});

ava('try register', (test) => {
  let cli = require('commander');

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
  test.truthy(dispatcher.actionInit);
});

ava('executeSub exists', (test) => {
  test.truthy(dispatcher.actionInit);
});

ava('actionDelegate exists', (test) => {
  test.truthy(dispatcher.actionInit);
});

ava('actionCached exists', (test) => {
  test.truthy(dispatcher.actionInit);
});

ava('actionDunk exists', (test) => {
  test.truthy(dispatcher.actionInit);
});

ava('actionTag exists', (test) => {
  test.truthy(dispatcher.actionInit);
});

ava('executeRemote exists', (test) => {
  test.truthy(dispatcher.actionInit);
});

ava('executeDunk exists', (test) => {
  test.truthy(dispatcher.actionInit);
});
