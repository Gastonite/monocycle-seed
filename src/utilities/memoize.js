const assertFunction = require('assertions/assertFunction')

const Memoize = (...args) => {

  const _memoized = new Map()

  let value

  const memoize = (func, key) => {
    
    assertFunction(func, 'func')

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
