'use strict'

const {test} = require('tap')
const {testRule} = require('../../common/bootstrap.js')
const rules = require('../../../lib/rules/index.js')

const RULE_NAME = 'tap-consistent-assertions'

test(RULE_NAME, async (t) => {
  testRule(t, RULE_NAME, rules['tap-consistent-assertions'], {
    valid: [
      {
        code: `
          test('foo', async (t) => {
            t.ok(true)
          })
        `
      }
    , {
        code: `
          test('foo', async (t) => {
            t.ok(true)
          })
        `, options: [{
          preferredMap: {notARealRule: 'not_ok'}
        }]
      }
    , {
        code: `
          test('foo', async (t) => {
            t.false(true)
          })
        `, options: [{
          preferredMap: {notARealRule: 'notReal', notOk: 'false'}
        }]
      }
    , {
        code: `
          test('foo', async (t) => {
            t.ok(true)
            t.test('bar', async(tt) => {
              tt.not_ok(false)
            })
          })
        `
      , options: [{
          preferredMap: {notOk: 'not_ok'}
        }]
      }
    , {
        code: `
          t.is_equal(result, 'not in test scope')
          t.test('foo', async (subtest) => {
            subtest.strict_equal(result, 'callee does not match')
          })
        `
      , options: [{
          preferredMap: {equal: 'isStrictly'}
        }]
      }
    ]
  , invalid: [
      {
        code: `
          test('foo', async (t) => {
            t.ok(true)
            t.test('bar', async (tt) => {
              tt.notOk(false)
              tt.strict_equals(1, 1)
              tt.same({foo: "bar"}, {foo: "bar"})
            })
            t.test('bar', function (tt) {
              tt.strict_equals(1, 1)
            })
          })
          t.is_equal(result, 'not in test scope')
        `
      , output: `
          test('foo', async (t) => {
            t.ok(true)
            t.test('bar', async (tt) => {
              tt.notOk(false)
              tt.strictEqual(1, 1)
              tt.deepEqual({foo: "bar"}, {foo: "bar"})
            })
            t.test('bar', function (tt) {
              tt.strictEqual(1, 1)
            })
          })
          t.is_equal(result, 'not in test scope')
        `
      , options: [{
          preferredMap: {same: 'deepEqual', equal: 'strictEqual'}
        }]
      , errors: [
          {message: 'The "strictEqual" alias is preferred over "strict_equals"'}
        , {message: 'The "deepEqual" alias is preferred over "same"'}
        , {message: 'The "strictEqual" alias is preferred over "strict_equals"'}
        ]
      }
    ]
  })
})
