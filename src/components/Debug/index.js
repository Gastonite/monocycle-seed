const Cycle = require('component')
const stringify = require('utilities/stringify')
const { pre } = require('@cycle/dom')
const { default: $ } = require('xstream')

const makeDebug = ({
  classes = { Debug: 'Debug' },
  from = $.empty
} = {}) => {

  const Debug = sources => ({
    DOM: from(sources)
      .map(stringify)
      .map(pre.bind(void 0, `.${classes.Debug}`))
  })

  return Cycle(Debug)
}

const DebugState = makeDebug({
  from: sources => sources.onion.state$
})


module.exports = {
  default: makeDebug,
  makeDebug,
  DebugState,
}