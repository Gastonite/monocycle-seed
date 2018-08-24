const isRegExp = require('assertions/isRegExp')
const isUndefined = require('assertions/isUndefined')

const stringify = state => JSON.stringify(
  state,
  (k, v) => isUndefined(v) ? 'UNDEFINED' : (
    isRegExp(v) ? v.toString() : v
  ),
  2
)

module.exports = stringify