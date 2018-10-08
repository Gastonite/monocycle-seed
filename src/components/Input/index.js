const { ViewHelper } = require('components/View')
const Factory = require('utilities/factory')

const WithInput = ViewHelper('input')

const makeInput = Factory(WithInput)

module.exports = {
  default: makeInput,
  makeInput,
  WithInput
}