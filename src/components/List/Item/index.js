const castArray = require('lodash.castarray')
const Cycle = require('component')
const { default: $ } = require('xstream')
const isNotPlainObject = require('assertions/isNotPlainObject')
const objOf = require('ramda/src/objOf')
const when = require('ramda/src/when')
const ItemView = require('./view')


const WithItem = (options = {}) => {

  const {
    View = ItemView,
    [Cycle.hasKey]: has = Cycle.Empty
  } = options = when(
    isNotPlainObject,
    objOf(Cycle.hasKey),
    options
  )

  const classes = { Item: 'Item', ...options.classes }
  
  Cycle.log('Item', { classes, has })

  const Item = Cycle({
    View: View.bind(void 0, `.${classes.Item}`),
    [Cycle.hasKey]: castArray(has)
  })

  return component => Cycle([component, Item])
}

const makeItem = options => WithItem(options)()

module.exports = {
  default: makeItem,
  makeItem,
  WithItem
}