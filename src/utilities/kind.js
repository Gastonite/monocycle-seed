const assert = require('browser-assert')
const pipe = require('ramda/src/pipe')
const match = require('ramda/src/match')
const over = require('ramda/src/over')
const lensProp = require('ramda/src/lensProp')
const filter = require('ramda/src/filter')
const unless = require('ramda/src/unless')
const union = require('ramda/src/union')
const isArray = require('lodash/isArray')
const isNonEmptyString = require('predicates/isNonEmptyString')
const isNotEmpty = require('predicates/isNotEmpty')
const castArray = require('lodash/castArray')


const KindReducer = kinds => {


  kinds = castArray(kinds)
  // .filter(isNonString)

  kinds.forEach((kind, i) => {
    assert(
      isNotEmpty(
        match(
          /^[-\w]+$/,
          assert(
            isNonEmptyString(kind),
            `'kind' must be a non empty string`
          ) || kind
        )
      ),
      `'kind[${i}]' must be a string composed of alphanumeric chars [A-Za-z0-9_-]`
    )
  })

  return over(lensProp('kind'), pipe(
    // when(isNonEmptyString, Array.of),
    unless(isArray, Array.of),
    filter(isNonEmptyString),
    union(kinds)
  ))
}

module.exports = KindReducer
