const ava = require('ava');
const clearRequire = require('clear-require');
const dispatcher = require('../lib/dispatcher');

ava('require path', function (test) {
  try {
    clearRequire('path')
    require('path')
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

ava('try register', function (test) {
  clearRequire('commander')
  const cli = require('commander')
  var dummy = {}
  core(dummy)
  dummy.register(cli, 'keyword', function () {
    cli.parse(['node', 'file', 'keyword'])
  })
})

ava('import actionInit', function (test) {
  var dummy = {}
  test.falsy(dummy.actionInit)
  core(dummy)
  test.truthy(dummy.actionInit)
})

ava('import actionList', function (test) {
  var dummy = {}
  test.falsy(dummy.actionInit)
  core(dummy)
  test.truthy(dummy.actionInit)
})

ava('import executeStatus', function (test) {
  var dummy = {}
  test.falsy(dummy.actionInit)
  core(dummy)
  test.truthy(dummy.actionInit)
})

ava('import executeSub', function (test) {
  var dummy = {}
  test.falsy(dummy.actionInit)
  core(dummy)
  test.truthy(dummy.actionInit)
})

ava('import actionDelegate', function (test) {
  var dummy = {}
  test.falsy(dummy.actionInit)
  core(dummy)
  test.truthy(dummy.actionInit)
})

ava('import actionCached', function (test) {
  var dummy = {}
  test.falsy(dummy.actionInit)
  core(dummy)
  test.truthy(dummy.actionInit)
})

ava('import actionDunk', function (test) {
  var dummy = {}
  test.falsy(dummy.actionInit)
  core(dummy)
  test.truthy(dummy.actionInit)
})

ava('import actionTag', function (test) {
  var dummy = {}
  test.falsy(dummy.actionInit)
  core(dummy)
  test.truthy(dummy.actionInit)
})

ava('import executeRemote', function (test) {
  var dummy = {}
  test.falsy(dummy.actionInit)
  core(dummy)
  test.truthy(dummy.actionInit)
})

ava('import executeDunk', function (test) {
  var dummy = {}
  test.falsy(dummy.actionInit)
  core(dummy)
  test.truthy(dummy.actionInit)
})
