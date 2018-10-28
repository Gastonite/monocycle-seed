const Cycle = require('component')
const Factory = require('utilities/factory')
const isInteger = require('lodash/isInteger')
const allPass = require('ramda/src/allPass')
const prop = require('ramda/src/prop')
const when = require('ramda/src/when')
const identity = require('lodash/identity')
const over = require('ramda/src/over')
const lensProp = require('ramda/src/lensProp')
const either = require('ramda/src/either')
const pipe = require('ramda/src/pipe')
const lt = require('ramda/src/lt')
const gt = require('ramda/src/gt')
const always = require('ramda/src/always')
const { WithView } = require('components/View')
// const log = require('utilities/log').Log('Heading')

const parseLevel = when(allPass([isInteger, lt(0), gt(7)]), identity)

const WithHeading = (options = {}, ...rest) => {

  const {
    level = rest[0],
    has,
  } = options = pipe(
    Cycle.coerce,
    over(lensProp('level'),
      either(
        parseLevel,
        either(
          pipe(
            always(rest),
            prop('0'),
            parseLevel
          ),
          always(1)
        )
      )
    )
  )(options)

  return WithView({
    ...options,
    has,
    sel: `h${level}`
  })
}

const makeHeading = Factory(WithHeading)

module.exports = {
  default: makeHeading,
  makeHeading,
}