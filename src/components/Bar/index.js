const Cycle = require('component')
const { default: $ } = require('xstream')
const isNotPlainObject = require('assertions/isNotPlainObject')
const BarView = require('./view')
const objOf = require('ramda/src/objOf')
const when = require('ramda/src/when')

const WithBar = (options = {}) => {


  const {
    View = BarView,
    alignRight = false,
    size,
    [Cycle.hasKey]: has = Cycle.Empty
  } = options = when(
    isNotPlainObject,
    objOf(Cycle.hasKey),
    options
  )

  const classes = { Bar: 'Bar', ...options.classes }

  // Cycle.log('WithBar()', {
  //   has
  // })


  return component => Cycle([
    component,
    Cycle({
      View: View.bind(void 0, `.${classes.Bar}`, {
        alignRight,
        size
      }),
      [Cycle.hasKey]: has
    })
  ])
}

const makeBar = options => WithBar(options)()

module.exports = {
  makeBar,
  WithBar
}