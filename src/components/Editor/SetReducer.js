const Cycle = require('component')
const isString = require('lodash/isString')

const WithSetReducer = ({
  key = 'value',
  from = 'value$'
} = {}) => {

  if (!isString(key))
    throw new Error(`'key' must be a string`)

  return f => Cycle(f)
    .transition({
      name: 'set',
      from,
      reducer: value => (state = {}) =>
        value === state[key] ? state : ({
          ...state,
          [key]: value
        })
    })
}

const makeSetReducer = options => WithSetReducer(options)()

module.exports = {
  default: makeSetReducer,
  makeSetReducer,
  WithSetReducer
}