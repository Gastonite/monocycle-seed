const Cycle = require('component')
const { WithLabel } = require('components/Label')
const either = require('ramda/src/either')
const prop = require('ramda/src/prop')
const toUpper = require('ramda/src/toUpper')
const over = require('ramda/src/over')
const append = require('ramda/src/append')
const lensIndex = require('ramda/src/lensIndex')
const join = require('ramda/src/join')
const always = require('ramda/src/always')
const Factory = require('utilities/factory')


const WithFieldLabel = (options = {}, ...rest) => {

  const {
    [Cycle.hasKey]: has = rest[0],
  } = options = Cycle.coerce(options)

  const classes = { FieldLabel: 'FieldLabel', ...options.classes }

  return WithLabel({
    ...options,
    kind: '.' + classes.FieldLabel,
    from: (sinks, sources) => sources.onion.state$
      .map(either(
        either(
          prop('label'),
          prop('name')
        ),
        always('Unnamed')
      ))
      .map(append(':'))
      .map(over(lensIndex(0), toUpper))
      .map(join(''))
  })
}

const makeFieldLabel = Factory(WithFieldLabel)

module.exports = {
  default: makeFieldLabel,
  makeFieldLabel,
  WithFieldLabel
}
