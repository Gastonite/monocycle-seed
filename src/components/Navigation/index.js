const Cycle = require('component')
const isFunction = require('lodash/isFunction')
const { WithLayout, makeLayout } = require('components/Layout')
const { makeLinkList } = require('components/LinkList')
const unless = require('ramda/src/unless')
const pipe = require('ramda/src/pipe')
const { mergeClasses } = require('utilities/style')

const WithNavigation = (options = {}) => {

  const {
    kind = '',
    [Cycle.hasKey]: has = Cycle.Empty,
    ...layoutOptions
  } = Cycle.coerce(options)

  const classes = {
    Navigation: 'Navigation',
    Bar: 'Bar',
    ...layoutOptions.classes
  }

  Cycle.log('WithNavigation()', { classes, mergeClasses, has, layoutOptions })

  return WithLayout({
    ...layoutOptions,
    kind: 'nav' + kind,
    classes: mergeClasses(classes, {
      Layout: classes.Navigation
    }),
    [Cycle.hasKey]: has
      .map(unless(isFunction, pipe(
        Cycle.coerce,
        ({ [Cycle.hasKey]: has, ...layoutOptions }) =>
          Cycle([
            makeLayout({
              classes,
              ...layoutOptions,
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