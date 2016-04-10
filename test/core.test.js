const ava = require('ava')
const core = require('../wgit/core')
const cli = require('commander')

ava('import register', function (test) {
  var dummy = {}
  test.false(!!dummy.register)
  core(dummy)
  test.true(!!dummy.register)
})

ava('try register', function (test) {
  var dummy = {}
  core(dummy)
  dummy.register(cli, 'try', function () {})
  test.pass()
})

ava('import executeAction', function (test) {
  var dummy = {}
  test.false(!!dummy.executeAction)
  core(dummy)
  test.true(!!dummy.executeAction)
})