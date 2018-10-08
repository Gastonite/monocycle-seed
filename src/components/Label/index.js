const { ViewHelper } = require('components/View')
const Factory = require('utilities/factory')

const WithLabel = ViewHelper('label')

const makeLabel = Factory(WithLabel)

module.exports = {
  default: makeLabel,
  makeLabel,
  WithLabel
}