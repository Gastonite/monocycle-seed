const { flex1, flex2, flex3, flex4, flex5, flex6, flex7, flex8, flex9, flex10, flex11, flex12 } = require('csstips/lib/flex')

module.exports = ({

} = {}) => {

  return [
    {
      $debugName: 'Flexible',
      flex: 'var(--factor)',
      // '& > *': content,
      '&.flex1, &.flex': flex1,
      '&.flex2': flex2,
      '&.flex3': flex3,
      '&.flex4': flex4,
      '&.flex5': flex5,
      '&.flex6': flex6,
      '&.flex7': flex7,
      '&.flex8': flex8,
      '&.flex9': flex9,
      '&.flex10': flex10,
      '&.flex11': flex11,
      '&.flex12': flex12,
    }
  ]
}
