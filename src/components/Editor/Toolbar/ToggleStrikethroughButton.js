const { WithBlockToggler } = require('../BlockToggler')

const { makeIconButton } = require('components/IconButton')
var fs = require('fs');
var strikethroughIcon = fs.readFileSync(require.resolve('font-awesome-svg-png/black/svg/strikethrough.svg'), 'utf8');


const ToggleStrikethroughButton = makeIconButton(strikethroughIcon)
  .map(WithBlockToggler({
    type: 'strikethrough',
    delimiter: '~~',
    patterns: {
      start: /(\*\*|~~)(?![\s\S]*(\*\*|~~))/,
      end: /(\*\*|~~)/
    }
  }))

module.exports = {
  default: ToggleStrikethroughButton,
  ToggleStrikethroughButton,
}