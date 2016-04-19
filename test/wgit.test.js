const ava = require('ava');
const clearRequire = require('clear-require');
const wgit = require('../lib/wgit');
const cmd = require('cmd-exec').init();
const chalk = require('chalk');

ava('cmd exec function', (test) => {
  test.truthy(cmd.exec);
});

ava('chalk colors', (test) => {
  let colors = [
    'red',
    'blue',
    'green',
    'yellow',
  ].forEach((color) => {
      test.truthy(chalk[color]);
  });
});

ava('executeAction exists', (test) => {
  test.truthy(wgit.executeAction);
});

ava.cb('try executeAction', (test) => {
  test.plan(2);
  wgit.executeAction('echo win')
  .then((item) => {
    test.truthy(item);
    test.is(item.message, 'win\n');
    test.end();
  });
});

ava('cleanItem exists', (test) => {
  test.truthy(wgit.cleanItem);
});

ava('try cleanItem', function (test) {
  let items = [
    {message: 'valid'},
    {message: ''},
    {message: null},
    {},
  ];

  items = wgit.cleanItem(items, (i) => i);
  test.deepEqual(items, ['valid']);
});

ava('trimItem exists', (test) => {
  test.truthy(wgit.trimItem);
});

ava('try trimItem', (test) => {
  let items = [
    {message: ' valid \n'},
    {message: ' \nvalid'},
    {message: 'valid\n '},
    {message: 'valid'},
    {message: ''},
    {message: null},
    {},
  ];

  items = wgit.trimItem(items);
  test.deepEqual(items, ['valid', 'valid', 'valid', 'valid']);
});

ava('trimRightItem exists', (test) => {
  test.truthy(wgit.trimRightItem);
});

ava('try trimRightItem', (test) => {
  let items = [
    { message: ' valid \n' },
    { message: ' \nvalid' },
    { message: 'valid\n ' },
    { message: 'valid' },
    { message: '' },
    { message: null },
    {},
  ];

  items = wgit.trimRightItem(items, (i) => i);
  test.deepEqual(items, [' valid ', ' \nvalid', 'valid\n ', 'valid']);
});

ava('printPretty exists', (test) => {
  test.truthy(wgit.printPretty);
});

ava('try printPretty', (test) => {
  let tmp = console.log;
  let changed = false;
  let myLog = () => {
    changed = true;
  };

  console.log = myLog;
  wgit.printPretty({ name: "test" }, [{ message: "" }]);
  test.is(changed, false);
  wgit.printPretty({ name: "test" }, [{ message: "test" }]);
  test.is(changed, true);
  console.log = tmp;
});

ava('printSub exists', (test) => {
  test.truthy(wgit.printSub);
});

ava('try printSub', (test) => {
  let tmp = console.log;
  let changed = false;
  let myLog = () => {
    changed = true;
  };

  console.log = myLog;
  wgit.printSub({ name: "test" }, [{ message: "" }], [{ message: "" }]);
  test.is(changed, false);
  wgit.printSub({ name: "test" }, [{ message: "test" }], [{ message: "" }]);
  test.is(changed, true);
  console.log = tmp;
});
