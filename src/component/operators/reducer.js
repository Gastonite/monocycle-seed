const { default: $ } = require('xstream');
const isString = require('assertions/isString')
const isObject = require('assertions/isObject')
const isFunction = require('assertions/isFunction')
const identity = require('ramda/src/identity')
const prop = require('ramda/src/prop')
const WithListener = require('./listener')
const equals = require('ramda/src/equals')
const curry = require('ramda/src/curry')
const capitalize = require('monocycle/utilities/capitalize')



const prefixNameReducer = ({ kind } = {}, name) =>
  !kind
    ? name
    : `(${kind.join(',')}) ${name}`

const logState = curry((name, reducer) => {

  let noPrefix = false

  if (isObject(name)) {

    noPrefix = Boolean(name.noPrefix)
    name = name.name
  }

  return before => {

    const after = reducer(before)


    if (!noPrefix && isObject(after))
      name = prefixNameReducer(after, name)

    // console.log('logState()', {
    //   log: !equals(before, after)
    // })

    !equals(before, after) && console.log(`%c${name}:`, [
      'color: #26c47d',
      'color: #32b87c',
      // 'font-weight: bold',
    ].join(';'), { before, after })

    return after
  }
})


const WithReducer = (options = {}, override = false) => {

  options = !isFunction(options)
    ? options
    : { reducer: options }

  const {
    reducer = identity,
    name = 'init',
    before = true
  } = options

  // console.log('WithReducer()', options)

  const from = isString(options.from)
    ? prop(options.from)
    : options.from

  const getReducer$ = !isFunction(from)
    ? () => $.of(void 0).mapTo(reducer)
    : (sinks, sources) => (from(sinks, sources) || $.empty()).map(reducer)

  return WithListener({
    kind: `${capitalize(name)}Reducer`,
    from: (sinks, sources) => {
      // console.log('WithReducer()', 'from', sinks)

      const args = [
        getReducer$(sinks, sources).map(logState(name)),
        sinks.onion || $.empty()
      ]

      return $.merge.apply(null,
        before
          ? args
          : args.reverse()
      )
    },
    to: 'onion'
  })
}

module.exports = WithReducer