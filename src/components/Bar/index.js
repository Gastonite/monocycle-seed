const Cycle = require('component')
const pipe = require('ramda/src/pipe')
const { WithLayout } = require('components/Layout')
const Factory = require('utilities/factory')

const WithBar = (options = {}) => {

  const {
    kind = '',
    size,
    dockTo,
    [Cycle.hasKey]: has = Cycle.Empty,
    ...layoutOptions
  } = options = Cycle.coerce(options)

  const classes = { Bar: 'Bar', ...options.classes }
  Cycle.log('Bar', { has, classes, layoutOptions })

  return pipe(
    WithLayout({
      ...layoutOptions,
      kind: kind + '.' + classes.Bar,
      classes,
      class: {
        ...(layoutOptions.class || {}),
        big: size === 'big',
        small: size === 'small',
      },
      [Cycle.hasKey]: has,
    }),  
  )

}

const makeBar = Factory(WithBar)

module.exports = {
  makeBar,
  WithBar
}
