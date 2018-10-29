const { default: $ } = require('xstream')
const identity = require('ramda/src/identity')
const prop = require('ramda/src/prop')
const pipe = require('ramda/src/pipe')
const apply = require('ramda/src/apply')
const over = require('ramda/src/over')
const lensProp = require('ramda/src/lensProp')
const map = require('ramda/src/map')
const when = require('ramda/src/when')
const either = require('ramda/src/either')
const objOf = require('ramda/src/objOf')
const castArray = require('lodash/castArray')
const assert = require('assert')
const isFunction = require('lodash/isFunction')
const isString = require('lodash/isString')

const coerceOptions = when(either(isFunction, isString), objOf('from'))

const WithListener = (options = {}) => {

  return pipe(
    coerceOptions,
    castArray,
    map((options) => {

      let {
        from,
        defaultListener = identity,
        combiner = (before, sink$) => sink$,
        to = '',
      } = pipe(
        coerceOptions,
        over(lensProp('from'), when(isString, prop))
      )(options)

      assert(isFunction(from), `'from' must be a function`)
      assert(isString(to), `'to' must be a function`)

      return component => {

        const Listener = sources => {

          const sinks = component(sources)
          const event$ = from(sinks, sources) || $.empty()

          return to
            ? Object.assign({}, sinks, { [to]: !sinks[to] ? event$ : combiner(sinks[to], event$) })
            : (event$.addListener(defaultListener) || sinks)
        }

        return Listener
      }
    }),
    apply(pipe)
  )(options)
}

module.exports = {
  default: WithListener,
  WithListener
}
