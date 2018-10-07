const Cycle = require('component')
const { makeView } = require('components/View')


const WithListItem = (options = {}) => {

  const {
    kind = '',
    [Cycle.hasKey]: has,
    ...viewOptions
  } = options = Cycle.coerce(options)


  const classes = { ListItem: 'ListItem', ...options.classes }
  
  // Cycle.log('ListItem', { classes, has })

  const ListItem = makeView({
    ...viewOptions,
    kind: `li.${classes.ListItem}${kind}`,
    [Cycle.hasKey]: has,
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