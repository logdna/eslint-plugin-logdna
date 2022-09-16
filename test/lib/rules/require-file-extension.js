'use strict'

const {test} = require('tap')
const {testRule} = require('../../common/bootstrap.js')
const rules = require('../../../lib/rules/index.js')

const RULE_NAME = 'require-file-extension'

test(RULE_NAME, async (t) => {
  testRule(t, RULE_NAME, rules['require-file-extension'], {
    valid: [
      {
        code: `
          const net = require('net')
          const foo = require('../test/foo.js')
          const bar = foo('./bar')
          if (bar) {
            const baz = require('./baz.json');
          }
          registerTransform(require('./transforms/parse.js'))
          module.exports = {
            bar: require('./bar2.js')
          }
        `
      }
    ]
  , invalid: [
      {
        code: `
          const foo = require('../test/foo');
          if (bar) {
            const baz = require('./baz');
          }
          registerTransform(require('../transforms/parse'))
          module.exports = require('../foo/bar');
        `
      , errors: [
          {message: 'Missing file extension for local module.'}
        , {message: 'Missing file extension for local module.'}
        , {message: 'Missing file extension for local module.'}
        , {message: 'Missing file extension for local module.'}
        ]
      }
    ]
  })
})
