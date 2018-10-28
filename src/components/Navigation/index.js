const Cycle = require('component')
const isFunction = require('lodash/isFunction')
const { WithLayout, makeLayout } = require('components/Layout')
const { makeLinkList } = require('components/LinkList')
const unless = require('ramda/src/unless')
const pipe = require('ramda/src/pipe')
const { mergeClasses } = require('utilities/style')
const Factory = require('utilities/factory')

const WithNavigation = (options = {}) => {

  const {
    sel = '',
    has = Cycle.Empty,
    ...layoutOptions
  } = Cycle.coerce(options)

  const classes = {
    Navigation: 'Navigation',
    Bar: 'Bar',
    ...layoutOptions.classes
  }

  Cycle.log('WithNavigation()', {
    classes,
    mergeClasses,
    has,
    layoutOptions
  })

  return WithLayout({
    ...layoutOptions,
    sel: 'nav' + sel,
    classes: mergeClasses(classes, {
      Layout: classes.Navigation
    }),
    has: has 
      .map(unless(isFunction, pipe(
        Cycle.coerce,
        ({ has, ...layoutOptions }) =>
          Cycle([
            makeLayout({
              classes,
              ...layoutOptions,
            }),
            makeLinkList({
              classes,
              has 
            })
          ])
      )))
  })
}

const makeNavigation = Factory(WithNavigation)

module.exports = {
  default: makeNavigation,
  makeNavigation,
  WithNavigation
}