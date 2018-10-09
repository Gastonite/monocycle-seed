const { WithLineToggler } = require('../LineToggler')
const { makeIconButton } = require('components/IconButton')
var fs = require('fs');
var quoteIcon = fs.readFileSync(require.resolve('font-awesome-svg-png/black/svg/quote-right.svg'), 'utf8');


const ToggleQuoteButton = makeIconButton(quoteIcon)
  .map(WithLineToggler({
    type: ['atom', 'quote'],
    delimiter: '> ',
    pattern: /^(\s*)\>\s+/,
  }))

module.exports = {
  default: ToggleQuoteButton,
  ToggleQuoteButton,
}