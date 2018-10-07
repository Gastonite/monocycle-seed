const { layerParent, attachToBottom } = require('csstips/lib')
const { rem } = require('csx/lib')

module.exports = ({
  minHeight = rem(6.4),
  boxShadow = '0 0.5px 0 0 rgba(0, 0, 0, 0.156), 0 1.5px 0 0 rgba(0, 0, 0, 0.055)',
  colors = {}
} = {}) => {

  return [
    layerParent,
    {
      $debugName: 'Field',
      boxShadow,
      minHeight,
      '&.valid::after': {
        backgroundColor: colors.valid,
      },
      '&.invalid::after': {
        backgroundColor: colors.invalid,
      },
      '&.invalid::after, &.valid::after, &.active::after': {
        left: '0',
        width: '100%',
      },
      '&::after': {
        content: '""',
        ...attachToBottom,
        bottom: -2,
        display: 'block',
        width: '0',
        left: '50%',
        height: '3px',
        transition: '.3s ease all',
        backgroundColor: colors.primary,
      }
    },
  ]
}
