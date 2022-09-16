'use strict'

const {
  isLocal,
  isStaticRequire,
  getRequiredModuleName
} = require('../common/require-type.js')

const REQUIRE_EXTENSIONS = new Set(['js', 'json', 'node'])

module.exports = {
  meta: {
    type: 'suggestion'
  , docs: {
      description: 'Enforce file extension for local modules/files'
    , category: 'LogDNA'
    }
  }
, create(context) {
    const nodes = []

    return {
      CallExpression(node) {
        if (!isStaticRequire(node)) return
        if (!isLocal(node)) return
        nodes.push(node)
      }
    , 'Program:exit'() {
        for (const node of nodes) {
          const path = getRequiredModuleName(node)
          const parts = path.split('.')
          const hasExtension = parts.length > 1
            && REQUIRE_EXTENSIONS.has(parts[parts.length - 1])

          if (!hasExtension) {
            context.report({
              node
            , message: 'Missing file extension for local module.'
            })
          }
        }
      }
    }
  }
}
