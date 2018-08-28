const castArray = require('lodash.castarray')
const Cycle = require('component')
const ListView = require('./view')
const { makeListItem } = require('components/ListItem')
const isFunction = require('assertions/isFunction')
const { Selector } = require('utilities/style')


const WithList = (options = {}) => {

  const {
    View = ListView,
    [Cycle.hasKey]: has = Cycle.Empty
  } = options = Cycle.coerce(options)


  const classes = { List: 'List', ...options.classes }

  // Cycle.log('List', { classes, has })

  const List = Cycle({
    View: View.bind(void 0, Selector(classes.List)),
    [Cycle.hasKey]: has === Cycle.Empty
      ? has
      : castArray(has).map(x => isFunction(x) && x.isListItem ? x : makeListItem({
        ...Cycle.coerce(x),
        classes
      }))
      // : castArray(has).map(makeItem)
  }, 'List')

  return component => Cycle([component, List])
}

const makeList = options => WithList(options)()

module.exports = {
  default: makeList,
  makeList,
  WithList
}