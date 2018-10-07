const { ViewHelper } = require('components/View')
const Factory = require('utilities/factory')

const WithHeader = ViewHelper('header')

const makeHeader = Factory(WithHeader)

module.exports = {
  default: makeHeader,
  makeHeader,
  WithHeader
}