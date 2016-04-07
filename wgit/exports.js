const chalk = require('chalk')
const format = require('string-format')

module.exports = function (wgit) {
  wgit.chalk = chalk
  wgit.format = format
  wgit.home = process.env['HOME']
}
