const { assert } = require('assertions')
const match = require('ramda/src/match')
const assertNonEmptyString = require('assertions/assertNonEmptyString')
const isArray = require('assertions/isArray')
const isNonEmptyString = require('assertions/isNonEmptyString')
const isNotEmpty = require('assertions/isNotEmpty')


const KindReducer = kind => {

  assert(
    isNotEmpty(match(/^[-\w]+$/, assertNonEmptyString(kind, 'kinddd'))),
    `'kind' must be a string composed of alphanumeric chars [A-Za-z0-9_-]`
  )

  return state => ({
    ...state,
    kind: isNonEmptyString(state.kind)
      ? [state.kind, kind]
      : (isArray(state.kind)
        ? [...state.kind, kind]
        : [kind]
      )
  })
}

module.exports = KindReducer
