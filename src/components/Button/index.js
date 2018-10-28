const Cycle = require('component')
const { makeClickable } = require('components/Clickable')
const { WithDumbButton } = require('components/DumbButton')
const Factory = require('utilities/factory')


const defaultScope = {
  DOM: 'Button',
  '*': null
}

const WithButton = (options = {}) => {

  const {
    has = `I'm a Button`,
    scope = defaultScope
  } = options = Cycle.coerce(options)

  // const classes = { Button: '',  }

  const Button = makeClickable()
    .map(WithDumbButton({
      ...options,
      has,
    }))
    // .isolation(scope)

  return component => Cycle([
    component,
    Button
  ], 'Button')
}

const makeButton = Factory(WithButton)

module.exports = {
  default: makeButton,
  makeButton,
  WithButton
}