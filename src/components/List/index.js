const castArray = require('lodash.castarray')
const Cycle = require('component')
const isNotPlainObject = require('assertions/isNotPlainObject')
const objOf = require('ramda/src/objOf')
const when = require('ramda/src/when')
const ListView = require('./view')
const { makeItem } = require('./Item')

const WithList = (options = {}) => {

  const {
    View = ListView,
    [Cycle.hasKey]: has = Cycle.Empty
  } = options = when(
    isNotPlainObject,
    objOf(Cycle.hasKey),
    options
  )

  const classes = { List: 'List', ...options.classes }

  // Cycle.log('List', { classes, has })

  const List = Cycle({
    View: View.bind(void 0, `.${classes.List}`),
    [Cycle.hasKey]: has === Cycle.Empty
      ? has
      : castArray(has).map(makeItem)
  })

  return component => Cycle([component, List])
}

const makeList = options => WithList(options)()

module.exports = {
  default: makeList,
  makeList,
  WithList
}