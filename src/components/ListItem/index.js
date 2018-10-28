const Cycle = require('component')
const { makeView } = require('components/View')
const Factory = require('utilities/factory')

const WithListItem = (options = {}) => {

  const {
    sel = '',
    has,
    ...viewOptions
  } = options = Cycle.coerce(options)


  const classes = { ListItem: 'ListItem', ...options.classes }
  
  Cycle.log('WithListItem()', { classes, has })

  const ListItem = makeView({
    ...viewOptions,
    sel: `li.${classes.ListItem}${sel}`,
    has,
  })

  return component => Object.assign(
    Cycle([component, ListItem]),
    { isListItem: true }
  )
}

const makeListItem = Factory(WithListItem)

module.exports = {
  default: makeListItem,
  makeListItem,
  WithListItem
}