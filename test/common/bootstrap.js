'use strict'

const {RuleTester} = require('eslint')

// ESLint v9+ uses languageOptions instead of parserOptions
const ruleTester = new RuleTester({
  languageOptions: {
    ecmaVersion: 2022
  , sourceType: 'script'
  , globals: {
      require: 'readonly'
    , module: 'readonly'
    , exports: 'writable'
    , __dirname: 'readonly'
    , __filename: 'readonly'
    , process: 'readonly'
    , console: 'readonly'
    , Buffer: 'readonly'
    }
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
