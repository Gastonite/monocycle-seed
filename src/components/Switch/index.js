const { default: $ } = require('xstream')
const noop = require('lodash/noop')
const identical = require('ramda/src/identical')
const either = require('ramda/src/either')
const always = require('ramda/src/always')
const assertObject = require('assertions/assertObject')
const assertFunction = require('assertions/assertFunction')
const isArray = require('lodash/isArray')
const isFunction = require('lodash/isFunction')
const Cycle = require('component')
const isString = require('assertions/isString')
const { default: dropRepeats } = require('xstream/extra/dropRepeats')
const Memoize = require('utilities/memoize')
const prop = require('ramda/src/prop')
const { div } = require('@cycle/dom')


const WithSwitch = ({
  from,
  SinksNames = Object.keys,
  first = false,
  View,
  Default = () => ({ DOM: $.of(div('No component found')) }),
  resolve = noop
} = {}) => {


  const getDefault = always(Default)

  if (isArray(resolve)) {

    const resolvers = resolve.map((resolver, i) => {

      if (isFunction(resolver))
      resolver = { resolve: i, value: resolver }

      assertObject(resolver, `resolve[${i}]`)

      return {
        ...resolver,
        resolve: isFunction(resolver.resolve)
          ? resolver.resolve
          : identical(resolver.resolve)
      }
    })

    resolve = (path = '') => {

      const _resolve = resolver => {

        const returned = resolver.resolve(path)

        return returned && (resolved = {
          resolved: returned,
          value: resolver.value.isComponent
            ? resolver.value
            : resolver.value(returned)
        })
      }

      let resolved
      if (first) {
        let returned
        resolvers
          .some(x => (returned = _resolve(x), returned && (resolved = returned)))
          // Cycle.log('Switch.resolved', returned)
        return returned && resolved.value
      }

      resolved = resolvers
        .map(_resolve)
        .filter(Boolean)

      return resolved.length > 0 && Cycle({
        View,
        has: resolved.map(prop('value'))
      })
    }
  }

  if (isString(from))
    from = prop(from)

  assertFunction(from, 'from')
  assertFunction(resolve, 'resolve')

  return f => Cycle(f)

    .after((sinks, sources) => {

      const memoize = Memoize(sources)

      const value$ = (from(sinks, sources) || $.empty())
        .compose(dropRepeats())
        .map(either(resolve, getDefault))
        .map(memoize)
        .remember()

      return SinksNames(sources).reduce((before, key) => ({
        ...before,
        [key]: value$.map(either(prop(key), $.empty)).flatten()
      }), sinks)
    })
}

const Case = (resolve, value) => ({ resolve, value })

const makeSwitch = options => WithSwitch(options)()

module.exports = {
  default: makeSwitch,
  makeSwitch,
  WithSwitch,
  Case,
}