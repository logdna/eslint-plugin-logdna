## Changelog

## [2.0.1](https://github.com/logdna/eslint-plugin-logdna/compare/v2.0.0...v2.0.1) (2022-09-17)


### Bug Fixes

* **rules**: Check static require in expressions [72964d0](https://github.com/logdna/eslint-plugin-logdna/commit/72964d013b9ef97b1d67fe014baef872ca2f1bab) - Eric Satterwhite, closes: [#6](https://github.com/logdna/eslint-plugin-logdna/issues/6)

# [2.0.0](https://github.com/logdna/eslint-plugin-logdna/compare/v1.0.1...v2.0.0) (2021-04-12)


### Features

* **rules**: add tap-no-deprecated-aliases rule [436e120](https://github.com/logdna/eslint-plugin-logdna/commit/436e120df817cdb511e653103d33884553faa457) - Mike Del Tito


### **BREAKING CHANGES**

* **rules:** deprecated `tap-consistent-assertions` rule

tap@15.0.0 deprecated the use of aliases for assertion methods, which
invalidates the concept of a "preferred" alias. This adds a separate
rule for enforcing the use of unaliased assertion methods. This rule
is auto-fixable.

## [1.0.1](https://github.com/logdna/eslint-plugin-logdna/compare/v1.0.0...v1.0.1) (2021-02-16)


### Build System

* replace npmignore with explicit files list [f7837fb](https://github.com/logdna/eslint-plugin-logdna/commit/f7837fb06529e46112d26a7d67dc631e3ee76d2c) - Mike Del Tito


### Chores

* **deps**: update eslint tooling [856770b](https://github.com/logdna/eslint-plugin-logdna/commit/856770bd90bd6158a03cef36e45ee7f597cd0550) - Mike Del Tito


### Continuous Integration

* add semantic-release [9861143](https://github.com/logdna/eslint-plugin-logdna/commit/98611436c1a0f78051081a903fe2dd29bf90c07b) - Mike Del Tito


### Miscellaneous

* add @mdeltito as a contributor [010ba7f](https://github.com/logdna/eslint-plugin-logdna/commit/010ba7f580253e2cbf71f8f8c097d185859903ff) - Mike Del Tito
* fix example config [ced5a21](https://github.com/logdna/eslint-plugin-logdna/commit/ced5a21dec878aaac089d1518f8b507d056b0140) - Mike Del Tito

# 2020-10-29, Version 1.0.0 (Stable)

* [[1d9ef62c11](https://github.com/logdna/eslint-plugin-logdna/commit/1d9ef62c11)] - **(SEMVER-MAJOR)** package: initial implementation (Mike Del Tito)
