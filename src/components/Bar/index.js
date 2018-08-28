const Cycle = require('component')
const { WithLayout, makeLayout } = require('components/Layout')
const { classes: mergeClasses } = require('typestyle')
const merge = require('snabbdom-merge')
const BarView = require('components/Bar/view')
const { Selector } = require('utilities/style')

const WithBar = (options = {}) => {

  const {
    View = BarView,
    size,
    [Cycle.hasKey]: has = Cycle.Empty,
    ...layoutOptions
  } = options = Cycle.coerce(options)

  const classes = { Bar: 'Bar', ...options.classes }

  // Cycle.log('Bar', { has  })

  const Bar = Cycle({
    View: View.bind(void 0, Selector(classes.Bar), { size }),
    [Cycle.hasKey]: has,
  }, 'Bar')

  return component => Cycle([
    component,
    makeLayout(layoutOptions),
    Bar
  ])
}

const makeBar = options => WithBar(options)()

module.exports = {
  makeBar,
  WithBar
}