var fs = require('fs');
var minusIcon = fs.readFileSync(require.resolve('font-awesome-svg-png/black/svg/minus.svg'), 'utf8');

const { WithInserter } = require('../Inserter')
const { makeIconButton } = require('components/IconButton')


const DrawHorizontalLineButton = makeIconButton(minusIcon)
  .map(WithInserter({
    type: 'horizontalRule',
    delimiter: '\n\n-----\n\n'
  }))


module.exports = {
  default: DrawHorizontalLineButton,
  DrawHorizontalLineButton,
}