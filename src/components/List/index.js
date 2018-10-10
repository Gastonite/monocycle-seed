const lensProp = require('ramda/src/lensProp')
const map = require('ramda/src/map')
const unless = require('ramda/src/unless')
const isFunction = require('lodash/isFunction')
const over = require('ramda/src/over')
const pipe = require('ramda/src/pipe')
const prop = require('ramda/src/prop')
const both = require('ramda/src/both')
const Cycle = require('component')
const { makeListItem } = require('components/ListItem')
const { WithView } = require('components/View')
const Factory = require('utilities/factory')

const WithList = (options = {}) => {

  const {
    kind = '',
    href = '',
    ordered = false,
    [Cycle.hasKey]: has,
    ...viewOptions
  } = parseOptions(options)

  return WithView({
    ...viewOptions,
    classes: {
      List: 'List',
      ...(viewOptions.classes || {})
    },
    [Cycle.hasKey]: has,
    kind: `${ordered ? 'o' : 'u'}l${kind}`,
  })
}


const parseOptions = pipe(
  Cycle.coerce,
  over(lensProp(Cycle.hasKey),
    map(
      unless(
        both(isFunction, prop('isListItem')),
        pipe(Cycle.coerce, makeListItem)
      )
    )
  )
)

const makeList = Factory(WithList)

module.exports = {
  default: makeList,
  makeList,
  WithList
}