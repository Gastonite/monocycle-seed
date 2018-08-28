const { horizontal, center, centerCenter, verticallySpaced, horizontallySpaced, vertical, margin, padding } = require('csstips/lib')
const { em } = require('csx/lib')


module.exports = ({
  boxShadow,
  gutterSize = em(1),
  size = em(4),
  smallHeight = em(2),
  bigHeight = em(6),
  backgroundColor = '#ccc'
} = {}) => {

  return [
    center,
    {
      $debugName: 'Bar',
      backgroundColor,
      boxShadow,
      '&:not(.col)': {
        '&.spaced': padding(0, gutterSize),
        height: size,
        minHeight: size,
        '&.small': {
          height: smallHeight,
          minHeight: smallHeight,
        },
        '&.big': {
          height: bigHeight,
          minHeight: bigHeight,
        }
      },
      '&.col': {
        '&.spaced': padding(gutterSize, 0),
        width: size,
        minWidth: size,
        '&.small': {
          width: smallHeight,
          minWidth: smallHeight,
        },
        '&.big': {
          width: bigHeight,
          minWidth: bigHeight,
        }
      },
      [`& > &`]: {
        ...padding(0),
        width: 'inherit',
        height: 'inherit',
      },
    }
  ]
}
