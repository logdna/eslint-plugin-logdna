'use strict'

const synonyms = require('../common/tap-synonyms.js')
const tapAssertionSelector = require('../common/tap-assertion-selector.js')

const DEFAULT_CALLEE_PATTERN = '/^t+$/'

module.exports = {
  meta: {
    type: 'suggestion'
  , fixable: 'code'
  , deprecated: true
  , docs: {
      description: 'Enforce consistent aliases for tap assertions'
    , category: 'LogDNA'
    }
  , schema: [
      {
        type: 'object'
      , properties: {
          preferredMap: {
            type: 'object'
          }
        , calleePattern: {
            type: 'string'
          }
        }
      , additionalProperties: false
      }
    ]
  }
, create(context) {
    const {
      preferredMap = {}
    , calleePattern = DEFAULT_CALLEE_PATTERN
    } = context.options[0] || {}

    if (Object.keys(preferredMap).length === 0) {
      return {}
    }

    const targetMap = Object.keys(preferredMap).reduce((map, primary) => {
      if (synonyms[primary]) {
        map.set(primary, preferredMap[primary])
        for (const alias of synonyms[primary]) {
          map.set(alias, preferredMap[primary])
        }
      }
      return map
    }, new Map())

    if (!targetMap.size) {
      return {}
    }

    const selector = tapAssertionSelector(targetMap, calleePattern)
    return {
      [selector]: (node) => {
        const method = node.callee.property.name
        const preferred = targetMap.get(method)

        if (preferred && preferred !== method) {
          context.report({
            node
          , message: `The "${preferred}" alias is preferred over "${method}"`
          , fix(fixer) {
              return fixer.replaceText(node.callee.property, preferred)
            }
          })
        }
      }
    }
  }
}
