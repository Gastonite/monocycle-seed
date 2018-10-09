const { WithLineToggler } = require('../LineToggler')
const { makeIconButton } = require('components/IconButton')
var fs = require('fs');
var olIcon = fs.readFileSync(require.resolve('font-awesome-svg-png/black/svg/list-ol.svg'), 'utf8');

const ToggleOrderedListButton = makeIconButton(olIcon)
  .map(WithLineToggler({
    type: 'variable-2',
    delimiter: '1. ',
    pattern: /^(\s*)\d+\.\s+/,
  }))

module.exports = {
  default: ToggleOrderedListButton,
  ToggleOrderedListButton,
}