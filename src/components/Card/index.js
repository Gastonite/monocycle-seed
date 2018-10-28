const Cycle = require('component')
const { WithLayout } = require('../Layout')
const { mergeClasses } = require('utilities/style')
const Factory = require('utilities/factory')

const WithCard = (options = {}) => {

  const {
    classes = {},
    has,
    ...viewOptions
  } = options = Cycle.coerce(options)

  return WithLayout({
    direction: 'column',
    ...viewOptions,
    classes: mergeClasses({ Card: 'Card' }, classes, {
      Layout: classes.Card
    }),
    has,
  })
}

const makeCard = Factory(WithCard)

module.exports = {
  default: makeCard,
  makeCard,
  WithCard
}