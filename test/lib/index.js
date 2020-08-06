'use strict'

const {test} = require('tap')
const plugin = require('../../lib/index.js')

test('plugin exposes rules', async (t) => {
  t.ok(plugin.rules['grouped-require'], 'grouped-require')
  t.ok(plugin.rules['require-file-extension'], 'require-file-extension')
  t.ok(plugin.rules['tap-consistent-assertions'], 'tap-consistent-assertions')
})
