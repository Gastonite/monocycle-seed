const both = require('ramda/src/both')
const isNotEmpty = require('./isNotEmpty')
const isString = require('lodash/isString')

module.exports = both(isString, isNotEmpty)