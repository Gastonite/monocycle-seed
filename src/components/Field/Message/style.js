const { attachToTop } = require('csstips/lib')
const { em } = require('csx/lib')


module.exports = ({
  colors = {},
  size = em(.7),
} = {}) => {

  return [
    attachToTop,
    {
      $debugName: 'FieldMessage',
      color: colors.default,
      left: 'initial',
      padding: em(.5),
      fontSize: size,
      opacity: 0,
      transition: '.2s ease opacity',  
      '.invalid &': {
        opacity: 1,
        color: colors.invalid
      },
      '.valid &': {
        color: colors.valid
      },
    }
  ]
}
