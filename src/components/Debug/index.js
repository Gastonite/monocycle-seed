const c = require('component')
const stringify = require('utilities/stringify')
const { pre } = require('@cycle/dom')
const { default: $ } = require('xstream')
const { rem, hsla } = require('csx')
const { stylesheet } = require('typestyle')
const { scroll, padding } = require('csstips')

const makeDebug = ({
  classes = { Debug: 'Debug' },
  from = $.empty
} = {}) => {

  const Debug = sources => ({
    DOM: from(sources)
      .map(stringify)
      .map(pre.bind(void 0, `.${classes.Debug}`))
  })

  return c(Debug)
}

const DebugState = makeDebug({
  from: sources => sources.onion.state$
})


module.exports = {
  default: makeDebug,
  makeDebug,
  DebugState,
}