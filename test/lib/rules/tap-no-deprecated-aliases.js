'use strict'

const {test} = require('tap')
const {testRule} = require('../../common/bootstrap.js')
const rules = require('../../../lib/rules/index.js')

const RULE_NAME = 'tap-no-deprecated-aliases'

test(RULE_NAME, async (t) => {
  testRule(t, RULE_NAME, rules[RULE_NAME], {
    valid: [
      {
        code: `
          test('foo', async (t) => {
            t.same(true)
          })
        `
      }
    , {
        code: `
          test('foo', async (t) => {
            t.match(true)
          })
        `
      }
    ]
  , invalid: [
      {
        code: `
        test('foo', async (t) => {
          t.deepEqual(true)
        })
      `
      , output: `
        test('foo', async (t) => {
          t.same(true)
        })
      `
      , errors: [
          {message: 'The "deepEqual" alias is deprecated in favor of "same"'}
        ]
      }
    , {
        code: `
        test('foo', async (tt) => {
          tt.loose_equal(true)
        })
      `
      , output: `
        test('foo', async (tt) => {
          tt.same(true)
        })
      `
      , errors: [
          {message: 'The "loose_equal" alias is deprecated in favor of "same"'}
        ]
      }
    , {
        code: `
          test('foo', async (tea) => {
            tea.tearDown(() => {
              return
            })

            // unchanged - calleePattern does not match
            t.deepEqual(true)
          })
        `
      , output: `
          test('foo', async (tea) => {
            tea.teardown(() => {
              return
            })

            // unchanged - calleePattern does not match
            t.deepEqual(true)
          })
        `
      , options: [{
          calleePattern: '/^tea+$/'
        }]
      , errors: [
          {message: 'The "tearDown" alias is deprecated in favor of "teardown"'}
        ]
      }
    ]
  })
})
