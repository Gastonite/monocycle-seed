const { ViewHelper } = require('components/View')
const Factory = require('utilities/factory')

const WithTextarea = ViewHelper('textarea')

const makeTextarea = Factory(WithTextarea)

module.exports = {
  default: makeTextarea,
  makeTextarea,
  WithTextarea
}