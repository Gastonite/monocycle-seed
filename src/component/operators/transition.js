const { Stream: $ } = require('xstream')
const isString = require('lodash/isString')
const { Empty } = require('monocycle/component')
const isObject = require('lodash/isObject')
const isFunction = require('lodash/isFunction')
const identity = require('ramda/src/identity')
const prop = require('ramda/src/prop')
const { WithListener } = require('./listener')
const equals = require('ramda/src/equals')
const curry = require('ramda/src/curry')
const capitalize = require('monocycle/utilities/capitalize')
const Factory = require('utilities/factory')
const castArray = require('lodash/castArray')

const prefixNameReducer = ({ kind } = {}, name) => !kind
  ? name
  : `${kind.length > 1
    ? '(' + kind.toString() + ')'
    : kind[0]
  } ${name}`

const logState = curry(({ log, name }, reducer) => {

  let noPrefix = false

  if (isObject(name)) {

    noPrefix = Boolean(name.noPrefix)
    name = name.name
  }

  return before => {

    const after = reducer(before)

    if (!noPrefix && isObject(after))
      name = prefixNameReducer(after, name)

    !equals(before, after) && log(`%c${name}:`, [
      'color: #32b87c',
    ].join(';'), { before, after })

    return after
  }
})

const WithTransition = (options, Cycle) => {

  return WithListener(
    castArray(options)
      .map((options) => {
        options = options || Empty

        options = !isFunction(options)
          ? options
          : { reducer: options }

        const {
          reducer = identity,
          name = 'init',
          before = true,
          ...listenerOptions
        } = options

        Cycle.log('WithTransition()', {
          options,
          listenerOptions
        })

        const from = isString(options.from)
          ? prop(options.from)
          : options.from

        const getReducer$ = !isFunction(from)
          ? () => $.of(void 0).mapTo(reducer)
          : (sinks, sources) => (from(sinks, sources) || $.empty()).map(reducer)

        return {
          kind: `${capitalize(name)}Transition`,
          from: (sinks, sources) => {

            const args = [
              getReducer$(sinks, sources).map(logState({
                name,
                log: Cycle.log
              })),
              sinks.onion || $.empty()
            ]

            return $.merge.apply(void 0,
              before
                ? args
                : args.reverse()
            )
          },
          to: 'onion'
        }
      })
  )
}

const makeTransition = Factory(WithTransition)

module.exports = {
  default: makeTransition,
  makeTransition,
  WithTransition
}
