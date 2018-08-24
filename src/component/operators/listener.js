// const isString = require('lodash/isString')
// const isFunction = require('lodash/isFunction')
const { default: $ } = require('xstream')
const identity = require('ramda/src/identity')
const prop = require('ramda/src/prop')
const assert = require('assert')
const { isFunction, isString } = require('util')
// const assertFunction = require('assertions/assertFunction')
// const assertString = require('assertions/assertString')
const capitalize = require('monocycle/utilities/capitalize')

const WithListener = (options = {}) => {

  let {
    from,
    combiner = (before, sink$) => sink$,
    to = '',
    kind,
  } = isFunction(options) || isString(options)
      ? { from: options }
      : options

  if (isString(from))
    from = prop(from)

    assert(isFunction(from), `'from' must be a function`)
    assert(isString(to), `'to' must be a function`)
  // assertFunction(from, 'from')
  // assertString(to, 'to')

  // console.log('WithListener()', kind)

  kind = kind || `${capitalize(to)}Listener`


  return component => {


    const Listener = sources => {

      const sinks = component(sources)
      const event$ = from(sinks, sources) || $.empty()
  
      return to
        ? Object.assign({}, sinks, { [to]: !sinks[to] ? event$ : combiner(sinks[to], event$) })
        : (event$.addListener(identity) || sinks)
    }

    
    return Object.assign(Listener, { kind })
  }
}

module.exports = WithListener