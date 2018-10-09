const { WithBlockToggler } = require('../BlockToggler')
const { makeIconButton } = require('components/IconButton')

var fs = require('fs');
var boldIcon = fs.readFileSync(require.resolve('font-awesome-svg-png/black/svg/bold.svg'), 'utf8');


const ToggleBoldButton = makeIconButton(boldIcon)
  .map(WithBlockToggler({
    type: 'strong',
    delimiter: '**',
    patterns: {
      start: /(\*\*|__)(?![\s\S]*(\*\*|__))/,
      end: /(\*\*|__)/
    }
  }))

module.exports = {
  default: ToggleBoldButton,
  ToggleBoldButton,
}