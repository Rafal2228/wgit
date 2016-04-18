const ava = require('ava');
const clearRequire = require('clear-require');
const loader = require('../lib/loader');

ava.afterEach((t) => {
  clearRequire('../lib/loader');
})

ava('import exports', function (test) {
  var dummy = loader('.wgit.json');
  test.truthy(dummy.args)
  test.truthy(dummy.home)
  test.truthy(dummy.root)
})

ava('require findup-sync', function (test) {
  try {
    clearRequire('findup-sync')
    require('findup-sync')
    test.pass()
  } catch (e) {
    test.fail()
  }
})

ava('import scan', function (test) {
  var dummy = loader('.wgit.json')
  test.truthy(dummy.scan)
})

ava('try scan', function (test) {
  var dummy = loader('.wgit.json')
  dummy.projects = [
    {
      repos: [{tag: 'one'}, {tag: 'two'}, {tag:'three'}]
    },
    {
      repos: [{tag: 'four'}, {tag: 'five'}]
    }
  ]
  dummy.scan()

  test.deepEqual(dummy.tags, ['one', 'two', 'three', 'four', 'five'])
})

ava('import _tagged', function (test) {
  var dummy = loader('.wgit.json');
  test.truthy(dummy._tagged)
})

ava('try _tagged', function (test) {
  var items = [{tag: 'one'}, {tag: 'two'}, {tag: 'three'}]
  var dummy = loader('.wgit.json')
  var tags = dummy._tagged(items, 'two')
  test.deepEqual(tags, {tag: 'two'})
})

ava('import browse', function (test) {
  var dummy = loader('.wgit.json')
  test.truthy(dummy.browse)
})

ava('try browse', function (test) {
  var dummy = loader('.wgit.json')
  dummy.projects = [
    {
      root: 'a',
      repos: [
        {tag: 'one'}, {tag: 'two'}, {tag: 'three'}
      ]
    },
    {
      root: 'b',
      repos: [
        {tag: 'four'}, {tag: 'five'}
      ]
    }
  ]
  var good_repo = dummy.browse('two')
  test.deepEqual(good_repo, [['a', {tag: 'two'}]])
  var bad_repo = dummy.browse('9000')
  test.deepEqual(bad_repo, [])
})
