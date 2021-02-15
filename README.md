# `eslint-plugin-logdna`

> ESlint plugin containing a collection of rules for enforcing code style at LogDNA

## Installation

**Requires eslint also**

We do not use peer dependencies, so make sure that `eslint` is also installed as a dev dependency.

```shell
npm install eslint-plugin-logdna eslint --save-dev
```

## Usage

Add `logdna` to the plugins section of your ESLint configuration. You can omit 
the `eslint-plugin-` prefix. Then you can configure the rules you want to use:

```json
{
  "plugins": [
    "logdna"
  ],
  "rules": {
    "logdna/grouped-require": 2,
    "logdna/require-file-extension": 2,
    "logdna/tap-consistent-assertions": [2, {
      "preferredMap": {
        "error": "error",
        "equal": "strictEqual",
        "not": "notStrictEqual",
        "same": "deepEqual",
        "notSame": "notDeepEqual",
        "strictSame": "strictDeepEqual",
        "strictNotSame": "strictDeepNotEqual",
        "match": "match",
        "notMatch": "notMatch",
        "type": "type"
      }
    }]
  }
}
```

## Rules

### `logdna/grouped-require`

Enforce sorted require declarations within modules

```js
// Bad
const foo = require('./lib/foo.js') //local
const http = require('http') // builtin
require('foo') // static
const logger = require('@logdna/logger') // scoped
const tap = require('tap') // contrib

// Good
require('foo') // static
const http = require('http') // builtin
const tap = require('tap') // contrib
const logger = require('@logdna/logger') // scoped
const foo = require('./lib/foo.js') //local
```

#### Options

* `typeOrder` [`<Array>`][] - sort order of require types 
(default: `['static', 'builtin', 'contrib', 'scoped', 'local']`)

### `logdna/tap-consistent-assertions`

Enforce consistent aliases for tap assertions

```js
// {
//   "plugins": [
//     "logdna"
//   ],
//   "rules": {
//     "logdna/tap-consistent-assertions": {
//       "preferredMap": {
//         "equal": "strictEqual"
//       }
//     }
//   }
// }

// Bad
test('foo', async (t) => {
  t.is_equal(1, 1)
  t.equal(1, 1)
  t.identical(1, 1)
})

// Good
test('foo', async (t) => {
  t.strictEqual(1, 1)
  t.strictEqual(1, 1)
  t.strictEqual(1, 1)
})
```

#### Options
* `preferredMap` [`<Object>`][] -  maps the "primary" assertion method to the preferred alias
* `calleePattern` [`<String>`][] - pattern to match for tap's `Test` object (default: `/^t+$/`)

### `logdna/require-file-extension`

Enforce file extension for local modules/files

```js
// Bad
const foo = require('./lib/foo')

// Good
const foo = require('./lib/foo.js')
```

## License

Copyright © [LogDNA](https://logdna.com), released under an MIT license. See the [LICENSE](./LICENSE) file and https://opensource.org/licenses/MIT

*Happy Logging!*

[`<Object>`]: https://mdn.io/object
[`<String>`]: https://mdn.io/string
[`<Array>`]: https://mdn.io/array
