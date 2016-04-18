const ava = require('ava')
const exports = require('../lib/exports')

ava('import exports', function (test) {
  var dummy = {}
  exports(dummy)
  test.truthy(dummy.args)
  test.truthy(dummy.home)
  test.truthy(dummy.root)
})
