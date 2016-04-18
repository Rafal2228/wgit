const ava = require('ava')
const clearRequire = require('clear-require')
const core = require('../lib/core')

ava('require cmd-exec', function (test) {
  try {
    clearRequire('cmd-exec')
    require('cmd-exec')
    test.pass()
  } catch (e) {
    test.fail()
  }
})

ava('require chalk', function (test) {
  try {
    clearRequire('chalk')
    require('chalk')
    test.pass()
  } catch (e) {
    test.fail()
  }
})

ava('require commander', function (test) {
  try {
    clearRequire('commander')
    require('commander')
    test.pass()
  } catch (e) {
    test.fail()
  }
})

ava('import register', function (test) {
  var dummy = {}
  test.falsy(dummy.register)
  core(dummy)
  test.truthy(dummy.register)
})

ava('try register', function (test) {
  clearRequire('commander')
  const cli = require('commander')
  var dummy = {}
  core(dummy)
  dummy.register(cli, 'keyword', function () {
    cli.parse(['node', 'file', 'keyword'])
  })
})

ava('import executeAction', function (test) {
  var dummy = {}
  test.falsy(dummy.executeAction)
  core(dummy)
  test.truthy(dummy.executeAction)
})

ava.cb('try executeAction', function (test) {
  var dummy = {}
  core(dummy)
  test.plan(2)
  dummy.executeAction('echo win').then((item) => {
    test.truthy(item)
    test.is(item.message, 'win\n')
    test.end()
  })
})

ava('import cleanItem', function (test) {
  var dummy = {}
  test.falsy(dummy.cleanItem)
  core(dummy)
  test.truthy(dummy.cleanItem)
})

ava('try cleanItem', function (test) {
  var dummy = {}
  core(dummy)
  var items = [
    {message: 'valid'},
    {message: ''},
    {message: null},
    {}
  ]
  items = dummy.cleanItem(items, function (i) { return i })
  test.deepEqual(items, ['valid'])
})

ava('import trimItem', function (test) {
  var dummy = {}
  test.falsy(dummy.trimItem)
  core(dummy)
  test.truthy(dummy.trimItem)
})

ava('try trimItem', function (test) {
  var dummy = {}
  core(dummy)
  var items = [
    {message: ' valid \n'},
    {message: ' \nvalid'},
    {message: 'valid\n '},
    {message: 'valid'},
    {message: ''},
    {message: null},
    {}
  ]
  items = dummy.trimItem(items)
  test.deepEqual(items, ['valid', 'valid', 'valid', 'valid'])
})

ava('import trimRightItem', function (test) {
  var dummy = {}
  test.falsy(dummy.trimRightItem)
  core(dummy)
  test.truthy(dummy.trimRightItem)
})

ava('try trimRightItem', function (test) {
  var dummy = {}
  core(dummy)
  var items = [
    {message: ' valid \n'},
    {message: ' \nvalid'},
    {message: 'valid\n '},
    {message: 'valid'},
    {message: ''},
    {message: null},
    {}
  ]
  items = dummy.trimRightItem(items, function (i) { return i })
  test.deepEqual(items, [' valid ', ' \nvalid', 'valid\n ', 'valid'])
})

ava('import printPretty', function (test) {
  var dummy = {}
  test.falsy(dummy.printPretty)
  core(dummy)
  test.truthy(dummy.printPretty)
})

ava('import printSub', function (test) {
  var dummy = {}
  test.falsy(dummy.printSub)
  core(dummy)
  test.truthy(dummy.printSub)
})
