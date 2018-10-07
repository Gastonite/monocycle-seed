const Cycle = require('component')
const { WithView } = require('components/View')
const Factory = require('utilities/factory')

const WithButton = (options = {}) => {

  const {
    [Cycle.hasKey]: has,
  } = options = Cycle.coerce(options)

  const classes = { Button: '', ...options.classes }

  return WithView({
    ...options,
    kind: 'button.' + classes.Button,
    [Cycle.hasKey]: has,
  })
}

const makeButton = Factory(WithButton)

module.exports = {
  default: makeButton,
  makeButton,
  WithButton
}
