const { div } = require('@cycle/dom')


// module.exports = div

const { mergeClasses } = require('utilities/style')
const style = require('style')
const { classes } = require('typestyle/lib');
// const { style, classes } = require('typestyle')
// const { isString } = require('util')
const pipe = require('ramda/src/pipe')
const { default: { createTagFunction } } = require('@cycle/dom/lib/cjs/hyperscript-helpers')
const Cycle = require('component')
const baseStyle = require('style')
const { rem } = require('csx/lib')

const factors = ['flex1', 'flex2', 'flex3', 'flex4', 'flex5', 'flex6', 'flex7', 'flex8', 'flex9', 'flex10', 'flex11', 'flex12']

const FlexibleView = pipe(
  createTagFunction(`div`),
  vnode => {

    
    let {
      factor = 1,
    } = vnode.data

    factor = Number.isInteger(factor) && factor > 0 && factor < 13
      ? factor
      : 1

    // Cycle.log('FlexibleView()', { factor })

    const flexClass = factors[factor - 1]


    return {
      ...vnode,
      // text: void 0,
      data: {
        ...vnode.data,
        class: {
          ...vnode.data.class,
          [flexClass]: true
          // big: size === 'big',
          // small: size === 'small',
        },
        // style: {
        //   ...vnode.data.style,
        //   // justifyContent: `flex-${!end ? 'start' : 'end'}`,
        // },
        //   props: {
        //     ...props,
        //     className: classes(
        //       baseStyle.SvgIcon,
        //       color && style({
        //         '& > svg circle': {
        //           stroke: color
        //         },
        //         '& > svg path': {
        //           color
        //         }

        //       }),
        //       props.className
        //     ),
        //     innerHTML: text
        //   }
      }
    }
  }
)
// module.exports = (options = {}) => {

//   const {
//     content,
//     small,
//     end,
//   } = options

//   console.error('FlexibleView()', {
//     ...options
//   //   small,
//   //   end,
//   //   style,
//   //   baseStyle,
//   //   mergeStyle: mergeClasses(baseStyle, style)
//   })

//   const style = mergeClasses(baseStyle, options.style)

//   return div(`.${style.Flexible}`, {
//     // props: {
//     //   className: classes(
//     //     style.layout,
//     //     small && 'small'
//     //   )
//     // },
//     class: {
//     //   // [style.layout]: true,
//       small
//     },
//     style:  {
//       justifyContent: `flex-${!end ? 'start' : 'end'}`,
//     }
//   }, content)
// }



module.exports = FlexibleView
// module.exports = content => {

//   const {
//     content,
//     small,
//     end,
//   } = options

//   return div.bind(void 0, `.${style.Flexible}`, {
//     class: {
//       //   // [style.layout]: true,
//       // small
//     },
//     style: {
//       justifyContent: `flex-${!end ? 'start' : 'end'}`,
//     }
//   }, content)
// }