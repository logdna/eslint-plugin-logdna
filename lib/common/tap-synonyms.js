'use strict'
// @see https://github.com/tapjs/node-tap/blob/f323cdca28cc0a286e29585d8081e04b08704143/lib/synonyms.js
// A list of all the synonyms of assert methods.
// In addition to these, multi-word camelCase are also synonymized to
// all lowercase and snake_case

function multiword(obj) {
  return Object.keys(obj).reduce((s, i) => {
    s[i] = [multiword_(i)]
      .concat(obj[i].map(multiword_))
      .reduce((s, i) => {
        s.push.apply(s, i)
        return s
      }, [])
    return s
  }, obj)
}

function multiword_(str) {
  return str.match(/[A-Z]/) ? [
    str
  , str.toLowerCase()
  , str.replace(/[A-Z]/g, ($0) => {
      return '_' + $0.toLowerCase()
    })
  ] : [str]
}

module.exports = multiword({
  'ok': ['true', 'assert']
, 'notOk': ['false', 'assertNot']

, 'error': ['ifError', 'ifErr']
, 'throws': ['throw']
, 'doesNotThrow': ['notThrow']

  // exactly the same.  ===
, 'equal': [
    'equals', 'isEqual', 'is', 'strictEqual', 'strictEquals', 'strictIs'
  , 'isStrict', 'isStrictly', 'identical'
  ]

  // not equal.  !==
, 'not': [
    'inequal', 'notEqual', 'notEquals', 'notStrictEqual', 'notStrictEquals'
  , 'isNotEqual', 'isNot', 'doesNotEqual', 'isInequal'
  ]

  // deep equivalence.  == for scalars
, 'same': [
    'equivalent', 'looseEqual', 'looseEquals', 'deepEqual'
  , 'deepEquals', 'isLoose', 'looseIs', 'isEquivalent'
  ]

  // deep inequivalence. != for scalars
, 'notSame': [
    'inequivalent', 'looseInequal', 'notDeep', 'deepInequal'
  , 'notLoose', 'looseNot', 'notEquivalent', 'isNotDeepEqual'
  , 'isNotDeeply', 'notDeepEqual', 'isInequivalent'
  , 'isNotEquivalent'
  ]

  // deep equivalence, === for scalars
, 'strictSame': [
    'strictEquivalent', 'strictDeepEqual', 'sameStrict', 'deepIs'
  , 'isDeeply', 'isDeep', 'strictDeepEquals'
  ]

  // deep inequivalence, !== for scalars
, 'strictNotSame': [
    'strictInequivalent', 'strictDeepInequal', 'notSameStrict', 'deepNot'
  , 'notDeeply', 'strictDeepInequals', 'notStrictSame'
  ]

  // found has the fields in wanted, string matches regexp
, 'match': [
    'has', 'hasFields', 'matches', 'similar', 'like', 'isLike'
  , 'includes', 'include', 'isSimilar', 'contains'
  ]

, 'notMatch': [
    'dissimilar', 'unsimilar', 'notSimilar', 'unlike', 'isUnlike'
  , 'notLike', 'isNotLike', 'doesNotHave', 'isNotSimilar', 'isDissimilar'
  ]

, 'type': [
    'isa', 'isA'
  ]
})
