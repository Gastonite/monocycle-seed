const Cycle = require('component')
const { WithView } = require('components/View')
const Factory = require('utilities/factory')
const pipe = require('ramda/src/pipe')

const parseOptions = pipe(
  Cycle.coerce,
)

const WithDumbButton = (options = {}) => {

  const {
    [Cycle.hasKey]: has = `I'm a dumb Button`,
  } = options = parseOptions(options)

  const classes = { Button: '', ...options.classes }

  Cycle.log('WithButton()', {
    has
  })
  
  return WithView({
    ...options,
    kind: 'button.' + classes.Button,
    [Cycle.hasKey]: has,
  })
}

const makeDumbButton = Factory(WithDumbButton)

module.exports = {
  default: makeDumbButton,
  makeDumbButton,
  WithDumbButton
}
