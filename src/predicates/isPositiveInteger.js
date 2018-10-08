const isInteger = require('lodash/isInteger')
const isPositive = require('predicates/isPositive')
const both = require('ramda/src/both')

module.exports = both(isInteger, isPositive)