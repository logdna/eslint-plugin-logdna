'use strict'

module.exports = function tapAssertionSelector(targetMap, calleePattern) {
  const matches = []
  for (const method of targetMap.keys()) {
    matches.push(`[callee.property.name="${method}"]`)
  }

  const scopeSelector = `:function[params.0.name=${calleePattern}]`
  const calleeSelector = [
    '[type="CallExpression"]'
  , '[callee.type="MemberExpression"]'
  , '[callee.computed=false]'
  , '[callee.property.type="Identifier"]'
  , `:matches(${matches.join(', ')})`
  , '[callee.object.type="Identifier"]'
  , `[callee.object.name=${calleePattern}]`
  ].join('')

  return `${scopeSelector} ${calleeSelector}`
}
