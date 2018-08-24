const { rem, hsla } = require('csx/lib')
const { padding, scroll } = require('csstips')


module.exports = ({

} = {}) => {

  return [
    scroll,
    padding(rem(.5)),
    {
      $debugName: 'Debug',
      fontSize: rem(.6),
      backgroundColor: hsla(0, 0, 0, 1).lighten(0.2).toString(),
      color: hsla(0, 0, 1, 1).darken(0.2).toString(),
      fontFamily: '"Source Sans Pro"',
      // maxHeight: rem(12),

    }
  ]
}
