'use strict'

const isBuiltinModule = require('is-builtin-module')
const {get} = require('dot-prop')

module.exports = {
  getRequiredModuleName
, isRequire
, isStaticRequire
, isBuiltin
, isScoped
, isLocal
, isTopLevel
}

function isRequire(node) {
  const value = get(node, 'declarations.0.init.callee.name')
  return !!(value && value === 'require')
}

function isStaticRequire(node) {
  if (!node || node.type !== 'CallExpression') return false
  const calleeType = get(node, 'callee.type')
  const calleeName = get(node, 'callee.name')

  return (
    node.arguments.length === 1
      && calleeType === 'Identifier'
      && calleeName === 'require'
  )
}

function isScoped(node) {
  const value = get(node, 'declarations.0.init.arguments.0.value')
  return !!(value && value.startsWith('@'))
}

function isBuiltin(node) {
  const value = get(node, 'declarations.0.init.arguments.0.value')
  return !!(value && isBuiltinModule(value))
}

/**
 * Determine if a given variable declaration or call expression
 * node is a local require statement
 * @param {'VariableDeclaration' | 'CallExpression'} node
 * @returns
 */
function isLocal(node) {
  const value = getRequiredModuleName(node)
  return !!(value && value.startsWith('.'))
}

function isTopLevel(node) {
  const value = get(node, 'parent.type')
  return !!(value && value === 'Program')
}

/**
 * Returns the name of the module loaded in a require statement
 * @param {'CallExpression' | 'VariableDeclaration'} node
 * @returns
 */
function getRequiredModuleName(node) {
  return get(node, 'declarations.0.init.arguments.0.value')
    || get(node, 'arguments.0.value')
}
