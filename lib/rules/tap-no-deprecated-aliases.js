'use strict'

const synonyms = require('../common/tap-synonyms.js')
const tapAssertionSelector = require('../common/tap-assertion-selector.js')

const DEFAULT_CALLEE_PATTERN = '/^t+$/'

module.exports = {
  meta: {
    type: 'problem'
  , fixable: 'code'
  , docs: {
      description: 'Prevent usage of deprecated tap aliases (>= tap@15.0.0)'
    , category: 'LogDNA'
    }
  , schema: [
      {
        type: 'object'
      , properties: {
          calleePattern: {
            type: 'string'
          }
        }
      , additionalProperties: false
      }
    ]
  , messages: {
      deprecatedAlias: 'The "{{alias}}" alias is deprecated in favor of "{{main}}"'
    }
  }
, create(context) {
    const {
      calleePattern = DEFAULT_CALLEE_PATTERN
    } = context.options[0] || {}

    const targetMap = Object.keys(synonyms).reduce((map, primary) => {
      for (const alias of synonyms[primary]) {
        map.set(alias, primary)
      }
      return map
    }, new Map())

    const selector = tapAssertionSelector(targetMap, calleePattern)
    return {
      [selector]: (node) => {
        const alias = node.callee.property.name
        const main = targetMap.get(alias)

        if (main && main !== alias) {
          context.report({
            node
          , messageId: 'deprecatedAlias'
          , data: {
              alias
            , main
            }
          , fix(fixer) {
              return fixer.replaceText(node.callee.property, main)
            }
          })
        }
      }
    }
  }
}
