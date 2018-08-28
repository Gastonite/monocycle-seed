const castArray = require('lodash.castarray')
const Cycle = require('component')
const ListItemView = require('./view')


const WithListItem = (options = {}) => {

  const {
    View = ListItemView,
    [Cycle.hasKey]: has = Cycle.Empty
  } = options = Cycle.coerce(options)


  const classes = { ListItem: 'ListItem', ...options.classes }
  
  // Cycle.log('ListItem', { classes, has })

  const ListItem = Cycle({
    View: View.bind(void 0, `.${classes.ListItem}`),
    [Cycle.hasKey]: castArray(has)
  })

  return component => Object.assign(
    Cycle([component, ListItem]),
    { isListItem: true }
  )
}

const makeListItem = options => WithListItem(options)()

module.exports = {
  default: makeListItem,
  makeListItem,
  WithListItem
}