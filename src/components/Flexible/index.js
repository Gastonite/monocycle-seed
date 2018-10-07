const Cycle = require('component')
const { WithView } = require('components/View')
const concat = require('ramda/src/concat')

const WithFlexible = (options = {}) => {

  const {
    [Cycle.hasKey]: has = Cycle.Empty,
    kind = '',
    ...viewOptions
  } = options = Cycle.coerce(options)

  const factor = !options.factor
    ? 1
    : +options.factor

  const classes = { Flexible: 'Flexible', ...options.classes }

  Cycle.log('WithFlexible()', { has  })
  
  return WithView({
    ...viewOptions,
    kind: concat(`.${classes.Flexible}`, kind),
    factor,
    [Cycle.hasKey]: has
  })
}

const makeFlexible = options => WithFlexible(options)()

module.exports = {
  default: makeFlexible,
  makeFlexible,
  WithFlexible,
}