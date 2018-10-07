const { Stream: $ } = require('xstream')
const dropRepeats = require('xstream/extra/dropRepeats').default

const Cycle = require('component')
const { h } = require('snabbdom/h')
const pipe = require('ramda/src/pipe')
const lensProp = require('ramda/src/lensProp')
const over = require('ramda/src/over')
const concat = require('ramda/src/concat')
const castArray = require('lodash/castArray')
const isPlainObject = require('lodash/isPlainObject')
const Factory = require('utilities/factory')
const isNumber = require('lodash/isNumber')
const isInteger = require('lodash/isInteger')
const isString = require('lodash/isString')
const isFunction = require('lodash/isFunction')
const startsWith = require('ramda/src/startsWith')
const join = require('ramda/src/join')
const objOf = require('ramda/src/objOf')
const prepend = require('ramda/src/prepend')
const when = require('ramda/src/when')
const unless = require('ramda/src/unless')
const prop = require('ramda/src/prop')
const always = require('ramda/src/always')
const mergeDeepRight = require('ramda/src/mergeDeepRight')
const log = require('utilities/log').Log('View')

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

  const ViewComponent = from
    ? makeView(snabbdomOptions)
      .listener({
        from: (sinks, sources) => (from(sinks, sources) || $.empty())

          .map(options => {

            log('ReactiveView()', kind, options)

            const {
              [Cycle.hasKey]: has,
              ...mergedOptions
            } = pipe(
              Cycle.coerce,
              log.partial('ReactiveView1'),
              mergeDeepRight(snabbdomOptions),
              log.partial('ReactiveView2'),
            )(options)

            return View(mergedOptions, has)
          }),
        to: 'DOM'
      })
    : Cycle({
      View: View.bind(void 0, snabbdomOptions),
      [Cycle.hasKey]: has,
    })

  return component => Cycle([component, ViewComponent])
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
