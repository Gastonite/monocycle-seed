const { WithReplacer } = require('../Replacer')
const { makeIconButton } = require('components/IconButton')
var fs = require('fs');
var linkIcon = fs.readFileSync(require.resolve('font-awesome-svg-png/black/svg/link.svg'), 'utf8');

const DrawLinkButton = makeIconButton(linkIcon)
  .map(WithReplacer({
    type: 'link',
    start: '[',
    end: ']()',
  }))

module.exports = {
  default: DrawLinkButton,
  DrawLinkButton,
}