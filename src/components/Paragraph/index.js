const { ViewHelper } = require('components/View')
const Factory = require('utilities/factory')

const WithParagraph = ViewHelper('p')

const makeParagraph = Factory(WithParagraph)

module.exports = {
  default: makeParagraph,
  makeParagraph,
  WithParagraph
}