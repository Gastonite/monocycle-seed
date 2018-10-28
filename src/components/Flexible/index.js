const Cycle = require('component')
const { WithView } = require('components/View')
const concat = require('ramda/src/concat')
const over = require('ramda/src/over')
const pipe = require('ramda/src/pipe')
const lensProp = require('ramda/src/lensProp')
const Factory = require('utilities/factory')

const getThruthyOrVoid = x => isUndefined(x) ? x : (x ? x: void 0)

const parseOptions = pipe(
  Cycle.coerce,
  over(lensProp('grow'), getThruthyOrVoid),
  over(lensProp('shrink'), getThruthyOrVoid),
  over(lensProp('basis'), getThruthyOrVoid),

)
const WithFlexible = (options = {}) => {

  const {
    has = Cycle.Empty,
    sel = '',
    grow,
    shrink,
    basis,
    ...viewOptions
  } = options = Cycle.coerce(options)

  const classes = { Flexible: 'Flexible', ...options.classes }

  Cycle.log('WithFlexible()', { has })

  return WithView({
    ...viewOptions,
    sel: concat(`.${classes.Flexible}`, sel),
    style: {
      flexGrow: grow,
      flexShrink: shrink,
      flexBasis: basis,
    },
    has 
  })
}

const makeFlexible = Factory(WithFlexible)

module.exports = {
  default: makeFlexible,
  makeFlexible,
  WithFlexible,
}