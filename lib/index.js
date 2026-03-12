'use strict'

const rules = require('./rules/index.js')
const pkg = require('../package.json')

// ESLint v9+ flat config plugin format
module.exports = {
  // Plugin metadata
  meta: {
    name: pkg.name
  , version: pkg.version
  }

  // Rule definitions
, rules

  // Flat config presets
, configs: {}
}

// Flat config recommended preset
module.exports.configs.recommended = {
  name: 'logdna/recommended'
, plugins: {
    logdna: module.exports
  }
, rules: {
    'logdna/grouped-require': 'error'
  , 'logdna/require-file-extension': 'error'
  , 'logdna/tap-no-deprecated-aliases': 'error'
  }
}
