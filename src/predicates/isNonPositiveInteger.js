const both = require('ramda/src/both')
const isNotPositive = require('./isNotPositive')
const isInteger = require('lodash/isInteger')

const isNonPositiveInteger = both(isInteger, isNotPositive)

module.exports = isNonPositiveInteger