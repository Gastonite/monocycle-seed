const Cycle = require('component')
const stringify = require('monocycle/utilities/stringify')
const { pre } = require('@cycle/dom')
const { default: $ } = require('xstream')

const makeDebug = ({
  View = pre,
  classes = { Debug: 'Debug' },
  from = $.empty
} = {}) => {

  const Debug = sources => ({
    DOM: from(sources)
      .map(stringify)
      .map(View.bind(void 0, `.${classes.Debug}`))
  })

  return Cycle(
    process.env.NODE_ENV === 'production'
      ? []
      : [Debug]
  )
}

const DebugState = makeDebug({
  from: sources => sources.onion.state$
})


module.exports = {
  default: makeDebug,
  makeDebug,
  DebugState,
}