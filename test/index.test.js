const ava = require('ava');
const cli = require('commander');

ava('commander command check', (test) => {
  test.truthy(cli.command);
});
