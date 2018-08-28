const { div } = require('@cycle/dom')
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

const LayoutView = pipe(
  createTagFunction(`div`),
  vnode => {

    const { text } = vnode
    const {
      direction,
      fill,
      spaced,
      end, //@todo end et flex-start
      props = {},
      ...others
    } = vnode.data

    // Cycle.log('LayoutView()', { end, data: vnode.data, others })

    return {
      ...vnode,
      // text: void 0,
      data: {
        ...vnode.data,
        class: {
          ...vnode.data.class,
          col: ['col', 'column', 'vertical'].includes(direction),
          fill,
          spaced,
          end,
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

//   console.error('LayoutView()', {
//     ...options
//   //   small,
//   //   end,
//   //   style,
//   //   baseStyle,
//   //   mergeStyle: mergeClasses(baseStyle, style)
//   })

//   const style = mergeClasses(baseStyle, options.style)

//   return div(`.${style.Layout}`, {
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



module.exports = LayoutView
// module.exports = content => {

//   const {
//     content,
//     small,
//     end,
//   } = options

//   return div.bind(void 0, `.${style.Layout}`, {
//     class: {
//       //   // [style.layout]: true,
//       // small
//     },
//     style: {
//       justifyContent: `flex-${!end ? 'start' : 'end'}`,
//     }
//   }, content)
// }