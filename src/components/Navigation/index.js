const castArray = require('lodash.castarray')
const Cycle = require('component')
const { classes } = require('typestyle')
const isFunction = require('assertions/isFunction')
const isNotPlainObject = require('assertions/isNotPlainObject')
const objOf = require('ramda/src/objOf')
const when = require('ramda/src/when')
const NavigationView = require('./view')
const { makeLinkList } = require('components/LinkList')
const { makeList } = require('components/List')
const { mergeClasses } = require('utilities/style')

const WithNavigation = (options = {}) => {

  const {
    View = NavigationView,
    [Cycle.hasKey]: has = Cycle.Empty
  } = options = when(
    isNotPlainObject,
    objOf(Cycle.hasKey),
    options
  )

  const classes = { Navigation: 'Navigation', ...options.classes }

  // Cycle.log('WithNavigation()', { classes, has })

  const Navigation = Cycle({
    View: NavigationView.bind(void 0, `.${classes.Navigation}`),
    [Cycle.hasKey]: has === Cycle.Empty
      ? has
      : castArray(has).map(x => isFunction(x) && x.isLinkList ? x : makeLinkList(x))
  })

  return component => Cycle([component, Navigation])
}

const makeNavigation = options => WithNavigation(options)()

module.exports = {
  default: makeNavigation,
  makeNavigation,
  WithNavigation
}