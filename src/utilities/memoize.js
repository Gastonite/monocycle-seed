const eq = require('lodash/fp/eq')
const assertFunction = require('assertions/assertFunction')

const Memoize = (...args) => {
  console.log('Memoize()')

  const _memoized = new Map()

  let value

  const memoize = (func, key) => {
    
    assertFunction(func, 'func')

    key = key || func
    // console.log(`memoize(${key})`, {
    //   func,
    // })

    return _memoized.get(key) || (
      // console.log(`memoize(${key}).call()`),
      value = func(...args),
      _memoized.set(key, value),/*  && value */
      value
    )
  }

  return memoize
}

module.exports = Memoize
