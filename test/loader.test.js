const ava = require('ava');
const clearRequire = require('clear-require');
const loader = require('../lib/loader');

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
  var dummy = {}
  test.falsy(dummy.scan)
  loader(dummy)
  test.truthy(dummy.scan)
})

ava('try scan', function (test) {
  var dummy = {
    projects: [
      {
        repos: [{tag: 'one'}, {tag: 'two'}, {tag:'three'}]
      },
      {
        repos: [{tag: 'four'}, {tag: 'five'}]
      }
    ]
  }
  loader(dummy)
  var tags = dummy.scan()
  test.deepEqual(tags, ['one', 'two', 'three', 'four', 'five'])
})

ava('import loadConfig', function (test) {
  var dummy = {}
  test.falsy(dummy.loadConfig)
  loader(dummy)
  test.truthy(dummy.loadConfig)
})

ava('import _tagged', function (test) {
  var dummy = {}
  test.falsy(dummy._tagged)
  loader(dummy)
  test.truthy(dummy._tagged)
})

ava('try _tagged', function (test) {
  var items = [{tag: 'one'}, {tag: 'two'}, {tag: 'three'}]
  var dummy = {}
  loader(dummy)
  var tags = dummy._tagged(items, 'two')
  test.deepEqual(tags, {tag: 'two'})
})

ava('import browse', function (test) {
  var dummy = {}
  test.falsy(dummy.browse)
  loader(dummy)
  test.truthy(dummy.browse)
})

ava('try browse', function (test) {
  var dummy = {
    projects: [
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
  }
  loader(dummy)
  var good_repo = dummy.browse('two')
  test.deepEqual(good_repo, [['a', {tag: 'two'}]])
  var bad_repo = dummy.browse('9000')
  test.deepEqual(bad_repo, [])
})
