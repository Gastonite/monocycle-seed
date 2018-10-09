const { WithBlockToggler } = require('../BlockToggler')
const { makeIconButton } = require('components/IconButton')
var fs = require('fs');
var italicIcon = fs.readFileSync(require.resolve('font-awesome-svg-png/black/svg/italic.svg'), 'utf8');



const ToggleItalicButton = makeIconButton(italicIcon)
  .map(WithBlockToggler({
    type: 'em',
    delimiter: '*',
    patterns: {
      start: /(\*|_)(?![\s\S]*(\*|_))/,
      end: /(\*|_)/
    }
  }))

module.exports = {
  default: ToggleItalicButton,
  ToggleItalicButton,
}