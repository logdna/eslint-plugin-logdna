'use strict'

// ESLint flat config for the plugin project itself
module.exports = [
  {
    ignores: [
      'node_modules/**',
      'coverage/**'
    ]
  },
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'commonjs'
    },
    rules: {
      // Add any project-specific rules here
      'no-unused-vars': 'error',
      'no-console': 'warn'
    }
  },
  // Use our own plugin's rules for this project
  {
    files: ['lib/**/*.js'],
    plugins: {
      logdna: require('./lib/index.js')
    },
    rules: {
      'logdna/grouped-require': 'error',
      'logdna/require-file-extension': 'error'
    }
  }
]

