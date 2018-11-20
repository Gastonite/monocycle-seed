const both = require('ramda/src/both')
const isNotEmpty = require('./isNotEmpty')
const isString = require('ramda-adjunct/lib/isString').default

module.exports = both(isString, isNotEmpty)