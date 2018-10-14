const { Stream: $ } = require('xstream')
const isFunctor = require('@f/is-functor')
const Cycle = require('component')
const { h } = require('snabbdom/h')
const pipe = require('ramda/src/pipe')
const path = require('ramda/src/path')
const lensProp = require('ramda/src/lensProp')
const over = require('ramda/src/over')
const concat = require('ramda/src/concat')
const Factory = require('utilities/factory')
const isString = require('lodash/isString')
const isFunction = require('lodash/isFunction')
const startsWith = require('ramda/src/startsWith')
const map = require('ramda/src/map')
const when = require('ramda/src/when')
const unless = require('ramda/src/unless')
const prop = require('ramda/src/prop')
const always = require('ramda/src/always')
const mergeDeepRight = require('ramda/src/mergeDeepRight')
const log = require('utilities/log').Log('View')
const { WithListener } = require('component/operators/listener')

const parseOptions = pipe(
  Cycle.coerce,

  over(lensProp('from'), pipe(
    when(isString, prop),
    unless(isFunction, always(void 0)),
  )),
  over(lensProp('kind'), pipe(
    unless(isString, always('div')),
    when(startsWith('.'), concat('div')),
  )),
)

const WithView = (options = {}) => {

  const {
    kind = 'div',
    [Cycle.hasKey]: has,
    from,
    View: _View = h,
    ...snabbdomOptions
  } = options = parseOptions(options)

  Cycle.log('WithView()', {
    kind,
    from,
    View: _View,
  })

  const View = _View.bind(void 0, kind)

  if (!from)
    return component => Cycle([component, Cycle({
      View: View.bind(void 0, snabbdomOptions),
      [Cycle.hasKey]: has,
    }, 'View')])

  const render = ({ [Cycle.hasKey]: has, ...options }) => View(options, has)

  return pipe(
    WithView(snabbdomOptions, 'ReactiveView'),
    WithListener({
      from: pipe(
        from,
        unless(
          pipe(path(['addListener']), isFunction),
          $.empty
        ),
        map(pipe(
          Cycle.coerce,
          mergeDeepRight(snabbdomOptions),
          log.partial(['ReactiveView()', kind, options]),
          render
        ))
      ),
      to: 'DOM'
    })
  )
}

const makeView = Factory(WithView)

const ViewHelper = (kind) => {
  return (options = {}) => {

    const {
      kind: _kind = '',
      [Cycle.hasKey]: has,
    } = options = Cycle.coerce(options)

    return WithView({
      ...options,
      [Cycle.hasKey]: has,
      kind: kind + _kind
    })
  }
}

module.exports = {
  WithView,
  default: makeView,
  makeView,
  ViewHelper
}
