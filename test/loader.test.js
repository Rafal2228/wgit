const ava = require('ava');
const loader = require('../lib/loader');
const find = require('findup-sync');

ava.beforeEach((test) => {
  test.context.loader = loader('loader.test.json', __dirname);
});

ava('findup-sync finds this tests', (test) => {
  let file = find('loader.test.json', { cwd: __dirname });
  test.truthy(file);
});

ava('loader constants', (test) => {
  test.truthy(test.context.loader.args);
  test.truthy(test.context.loader.home);
  test.truthy(test.context.loader.root);
});

ava('loader fail to find file', (test) => {
  let tmp = console.log;
  let tmpExit = process.exit;
  let changed = 0;
  let myLog = () => {
    changed++;
  };

  console.log = myLog;
  process.exit = myLog;
  test.context.loader = loader('loader.fake.test.json');
  test.is(changed, 2);
  console.log = tmp;
  process.exit = tmpExit;
});

ava('scan exists', (test) => {
  test.truthy(test.context.loader.scan);
});

ava('try scan', (test) => {
  test.context.loader.projects = [
    {
      repos: [{ tag: 'one' }, { tag: 'two' }, { tag: 'three' }],
    },
    {
      repos: [{ tag: 'four' }, { tag: 'five' }],
    },
  ];
  test.context.loader.scan();

  test.deepEqual(test.context.loader.tags, ['one', 'two', 'three', 'four', 'five']);
});

ava('_tagged exists', (test) => {
  test.truthy(test.context.loader._tagged);
});

ava('try _tagged', (test) => {
  let items = [{ tag: 'one' }, { tag: 'two' }, { tag: 'three' }];
  let tags = test.context.loader._tagged(items, 'two');
  test.deepEqual(tags, { tag: 'two' });
});

ava('browse exists', (test) => {
  test.truthy(test.context.loader.browse);
});

ava('try browse', (test) => {
  test.context.loader.projects = [
    {
      root: 'a',
      repos: [
        { tag: 'one' },
        { tag: 'two' },
        { tag: 'three' },
      ],
    },
    {
      root: 'b',
      repos: [
        { tag: 'four' },
        { tag: 'five' },
      ],
    },
  ];

  let goodRepo = test.context.loader.browse('two');
  test.deepEqual(goodRepo, [['a', { tag: 'two' }]]);
  let badRepo = test.context.loader.browse('9000');
  test.deepEqual(badRepo, []);
});
