'use strict'

const {RuleTester} = require('eslint')
const ruleTester = new RuleTester({
  parserOptions: {
    ecmaVersion: 2019
  , sourceType: 'script'
  }
})

module.exports = {
  ruleTester
, testRule
}

function testRule(t, ruleName, ruleDefinition, cases) {
  return t.test(ruleDefinition.meta.docs.description, async () => {
    ruleTester.run(ruleName, ruleDefinition, cases)
  })
}
