const Cycle = require('component')
const { WithLayout } = require('components/Layout')
const { mergeClasses } = require('utilities/style')
const Factory = require('utilities/factory')

const WithCard = (options = {}) => {

  const {
    kind = '',
    classes,
    [Cycle.hasKey]: has,
    ...viewOptions
  } = options = Cycle.coerce(options)

  return WithLayout({
    ...viewOptions,
    classes: mergeClasses({ Card: 'Card' }, classes, {
      Layout: classes.Card
    }),
    kind,
    direction: 'column',
    [Cycle.hasKey]: has,
  })
}

const makeCard = Factory(WithCard)

module.exports = {
  default: makeCard,
  makeCard,
  WithCard
}