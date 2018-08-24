const { horizontal, layerParent } = require('csstips/lib')
const { em } = require('csx/lib')


module.exports = ({
  boxShadow,
  height = em(4),
  smallHeight = em(2),
  bigHeight = em(6),
  backgroundColor = '#ccc'
} = {}) => {

  return [
    horizontal,
    layerParent,
    {
      $debugName: 'Bar',
      alignItems: 'center',
      backgroundColor,
      height,
      boxShadow,
      '&.small': {
        height: smallHeight,
        minHeight: smallHeight,
      },
      '&.big': {
        height: bigHeight,
        minHeight: bigHeight,
      }
    }
  ]
}
