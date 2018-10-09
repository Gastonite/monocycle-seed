const { WithLineToggler } = require('../LineToggler')
// const ulIcon = require('font-awesome-svg-png/black/svg/list-ul.svg')
const { makeIconButton } = require('components/IconButton')
var fs = require('fs');
var ulIcon = fs.readFileSync(require.resolve('font-awesome-svg-png/black/svg/list-ul.svg'), 'utf8');

const ToggleUnorderedListButton = makeIconButton(ulIcon)
  .map(WithLineToggler({
    type: 'variable-2',
    delimiter: '* ',
    pattern: /^(\s*)(\*|\-|\+)\s+/,
  }))

module.exports = {
  default: ToggleUnorderedListButton,
  ToggleUnorderedListButton,
}