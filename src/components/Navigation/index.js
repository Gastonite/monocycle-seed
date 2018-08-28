const castArray = require('lodash.castarray')
const Cycle = require('component')
const isNotFunction = require('assertions/isNotFunction')
const NavigationView = require('./view')
const { makeLinkList } = require('components/LinkList')
const { WithBar, makeBar } = require('components/Bar')
const when = require('ramda/src/when')
const pipe = require('ramda/src/pipe')
const { mergeClasses } = require('utilities/style')

const WithNavigation = (options = {}) => {

  const {
    View = NavigationView,
    [Cycle.hasKey]: has = Cycle.Empty,
    ...barOptions
  } = options = Cycle.coerce(options)

  const classes = {
    Navigation: 'Navigation',
    Bar: 'Bar',
    ...options.classes
  }

  const Test = Cycle([
    makeBar({ classes }),
    makeLinkList({
      classes
    })
  ])

  Cycle.log('WithNavigation()', { classes, mergeClasses, has, Test })

  return WithBar({
    ...barOptions,
    classes: mergeClasses(classes, {
      Bar: classes.Navigation
    }),
    [Cycle.hasKey]: has === Cycle.Empty
      ? has
      : castArray(has)
        .map(when(isNotFunction, pipe(
          Cycle.coerce,
          ({ [Cycle.hasKey]: has, ...options }) =>
            Cycle([
              makeBar({
                classes,
                ...options,
              }),
              makeLinkList({
                classes,
                [Cycle.hasKey]: has
              })
            ])
        )))
  })
}

const makeNavigation = options => WithNavigation(options)()

module.exports = {
  default: makeNavigation,
  makeNavigation,
  WithNavigation
}