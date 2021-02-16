'use strict'

const {test} = require('tap')
const {testRule} = require('../../common/bootstrap.js')
const rules = require('../../../lib/rules/index.js')

const RULE_NAME = 'grouped-require'

test(RULE_NAME, async (t) => {
  testRule(t, RULE_NAME, rules['grouped-require'], {
    valid: [
      {
        code: `
          const dynamic = './something.js';
          require('timers');
          run()
          const net = require('net');
          const http = require('http');
          const something = require(dynamic)
          const {promisify} = require('util')
          const jquery = require('jquery');
          const bar = require('@foo/bar')
          const {biz, buzz} = require('@foo/boz')
          const test = require('../test/foo.js')
          if (bar) {
            const c = require('baz');
            require('static')
          }
        `
      }
    , {
        code: `
          const test = require('../test/foo.js')
          const bar = require('@foo/bar')
          const {biz} = require('@foo/boz')
          const jquery = require('jquery');
          const net = require('net');
          const http = require('http');
          const {promisify} = require('util')
          require('timers')
          const buzz = biz
          if (bar) {
            const c = require('baz');
          }
        `
      , options: [{
          typeOrder: ['local', 'scoped', 'contrib', 'builtin', 'static']
        }]
      }
    , {
        code: `
          const test = require('../test/foo.js')
        `
      }
    ]
  , invalid: [
      {
        code: `
          const jquery = require('jquery');
          require('timers')
          const net = require('net');
          const http = require('http');
          const {promisify} = require('util')
          const test = require('../test/foo.js')
          const bar = require('@foo/bar')
          const {biz, buzz} = require('@foo/boz')
          if (bar) {
            const c = require('baz');
          }
        `
      , errors: [
          {message: "Expected 'static' require before 'contrib' require."}
        , {message: "Expected 'scoped' require before 'local' require."}
        ]
      }
    ]
  })
})
