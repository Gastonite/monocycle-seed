const assert = require('browser-assert')
const isFunction = require('lodash/isFunction')

const Memoize = (...args) => {

  const _memoized = new Map()

  let value

  const memoize = (func, key) => {
    
    assert(isFunction(func), `'func' must be a function`)

    key = key || func

    return _memoized.get(key) || (
      value = func(...args),
      _memoized.set(key, value),/*  && value */
      value
    )
  }

  return memoize
}

module.exports = Memoize
