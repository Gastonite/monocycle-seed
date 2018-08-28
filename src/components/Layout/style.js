const {
  horizontal,
  horizontallySpaced,
  vertical,
  verticallySpaced,
  content,
  layerParent,
  padding,
  fillParent,
  startJustified,
  endJustified
} = require('csstips/lib')
const { em } = require('csx/lib')


module.exports = ({
  gutterSize = em(1),
} = {}) => {

  const noPadding = padding(0)
  return [
    layerParent,
    {
      $debugName: 'Layout',
      '&.fill': fillParent,
      ...startJustified,
      '&.end': endJustified,
      '&:not(.col)': {
        ...horizontal,
        '&.spaced': {
          ...horizontallySpaced(gutterSize),
          ...padding(0, gutterSize),
        },
        '&.spaced > &.spaced': noPadding,
      },
      '&.col': {
        ...vertical,
        '&.spaced': {
          ...verticallySpaced(gutterSize),
          ...padding(gutterSize, 0),
        },
        '&.spaced > &.spaced': noPadding,
      },
      '& > *': content,
    }
  ]
}
