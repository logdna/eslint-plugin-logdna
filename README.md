# `eslint-plugin-logdna`
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

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

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/mdeltito"><img src="https://avatars.githubusercontent.com/u/69520?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Mike Del Tito</b></sub></a><br /><a href="https://github.com/logdna/eslint-plugin-logdna/commits?author=mdeltito" title="Code">💻</a> <a href="https://github.com/logdna/eslint-plugin-logdna/commits?author=mdeltito" title="Documentation">📖</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!

## License

Copyright © [LogDNA](https://logdna.com), released under an MIT license. See the [LICENSE](./LICENSE) file and https://opensource.org/licenses/MIT

*Happy Logging!*

[`<Object>`]: https://mdn.io/object
[`<String>`]: https://mdn.io/string
[`<Array>`]: https://mdn.io/array
