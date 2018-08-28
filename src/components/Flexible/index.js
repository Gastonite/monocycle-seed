const Cycle = require('component')
const FlexibleView = require('./view')

const WithFlexible = (options = {}) => {

  const {
    View = FlexibleView,
    factor = 1,
    [Cycle.hasKey]: has = Cycle.Empty
  } = options = Cycle.coerce(options)

  const classes = { Flexible: 'Flexible', ...options.classes }

  // Cycle.log('WithFlexible()', { has  })

  const Flexible = Cycle({
    View: View.bind(void 0, `.${classes.Flexible}`, {
      factor: parseInt(factor, 10)
    }),
    [Cycle.hasKey]: has
  }, 'Flexible')


  return component => {

    const WithFlexible = Cycle([
      component,
      Flexible
    ])

    return WithFlexible
  }
}

const makeFlexible = options => WithFlexible(options)()

module.exports = {
  default: makeFlexible,
  makeFlexible,
  WithFlexible
}