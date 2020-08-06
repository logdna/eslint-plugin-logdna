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
        `
      }
    ]
  , invalid: [
      {
        code: `
          const foo = require('../test/foo')
          if (bar) {
            const baz = require('./baz');
          }
        `
      , errors: [
          {message: 'Missing file extension for local module.'}
        , {message: 'Missing file extension for local module.'}
        ]
      }
    ]
  })
})
