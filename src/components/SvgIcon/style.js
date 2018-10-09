const { style } = require('typestyle')
// const { colors, SPACE_SIZE, ICON_SIZE } = require('style')
// const { colors } = require('csstips')
// const { rem } = require('csx')


export const defaultColors = {
  default: 'gray',
  active: 'white'
}
export default ({
  size = 36,
  colors = defaultColors
} = {}) => {


  return {
    SvgIcon: style({
      $debugName: 'SvgIcon',
      position: 'relative',
      width: size,
      height: size,
      background: `no-repeat center`,
      backgroundSize: '100%',
      // margin: rem(SPACE_SIZE / 2),
      display: 'block',
      'svg': {
        width: '100%',
        height: '100%',
        'path, polygon, circle': {
          fill: colors.default,
          // fill: colors.primary.darken(.18).toString()
        },
      },

      '.primary > &': {
        'path, polygon, circle': {
          fill: colors.primary,
          // fill: colors.primary.darken(.18).toString()
        }
      },

      // '.primary &, &.primary': {
      //   '& > svg': {


      //     'path, polygon, circle': {
      //       fill: 'red !important'
      //       // fill: colors.primary.darken(.18).toString()
      //     },



      // }
      // }


    })
  }
}