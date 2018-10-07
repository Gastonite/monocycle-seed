const isRegExp = require('lodash/isRegExp')
const isUndefined = require('lodash/isUndefined')

const stringify = state => JSON.stringify(
  state,
  (k, v) => isUndefined(v) ? '<undefined>' : (
    isRegExp(v) ? v.toString() : v
  ),
  process.env.NODE_ENV === 'production' ? void 0 : 2
)

module.exports = stringify