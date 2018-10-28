const Cycle = require('component')
const { WithView } = require('components/View')
const either = require('ramda/src/either')
const path = require('ramda/src/path')
const always = require('ramda/src/always')
const Factory = require('utilities/factory')

const WithFieldMessage = (options = {}, ...rest) => {


  options = Cycle.coerce(options)

  const classes = { FieldMessage: 'FieldMessage', ...options.classes }

  return WithView({
    sel: '.' + classes.FieldMessage,
    from: (sinks, sources) => sources.onion.state$
      .map(either(path(['error', 'message']), always(''))),
    ...options,
  })
}

const makeFieldMessage = Factory(WithFieldMessage)

module.exports = {
  default: makeFieldMessage,
  makeFieldMessage,
  WithFieldMessage
}
