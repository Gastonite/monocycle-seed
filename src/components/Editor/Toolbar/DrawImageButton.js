const { WithReplacer } = require('../Replacer')
const { makeIconButton } = require('components/IconButton')
var fs = require('fs');
var imageIcon = fs.readFileSync(require.resolve('font-awesome-svg-png/black/svg/image.svg'), 'utf8');

const DrawImageButton = makeIconButton(imageIcon)
  .map(WithReplacer({
    type: 'image',
    start: '![',
    end: ']()',
  }))

module.exports = {
  default: DrawImageButton,
  DrawImageButton,
}