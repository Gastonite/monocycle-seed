const { newLayer } = require('csstips/lib')

module.exports = ({
  colors = {}
} = {}) => {

  return [
    newLayer,
    {
      $debugName: 'FieldLabel',
      color: colors.default,
      padding: '.75em',
      lineHeight: 1.6,
      pointerEvents: 'none',
      transition: '.2s ease all',
      '.active > &, .valid > &, .invalid > &': {
        color: colors.primary,
        // color: color.Label.primary,
        left: '-.3em',
        top: '-.7em',
        fontSize: '.8em',
        outline: 'none'
      },
      '.invalid > &': {
        color: colors.invalid
      },
      '.valid > &': {
        color: colors.valid
      },
    }
  ]
}
