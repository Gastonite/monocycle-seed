const { div } = require('@cycle/dom')
const { mergeClasses } = require('utilities/style')
const style = require('style')
const { classes } = require('typestyle/lib');
// const { style, classes } = require('typestyle')
// const { isString } = require('util')
const pipe = require('ramda/src/pipe')
const { default: { createTagFunction } } = require('@cycle/dom/lib/cjs/hyperscript-helpers')
const baseStyle = require('style')
const { rem } = require('csx/lib')

const BarView = pipe(
  createTagFunction(`div`),
  vnode => {

    const { text } = vnode
    const { size, alignRight, props = {}, ...others } = vnode.data


    console.error('BarView()', { alignRight, size, data: vnode.data, others })


    return {
      ...vnode,
      // text: void 0,
      data: {
        ...vnode.data,
        class: {
          ...vnode.data.class,

          big: size === 'big',
          small: size === 'small',
        },
        style: {
          ...vnode.data.style,
          justifyContent: `flex-${!alignRight ? 'start' : 'end'}`,
        },
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
//     alignRight,
//   } = options

//   console.error('BarView()', {
//     ...options
//   //   small,
//   //   alignRight,
//   //   style,
//   //   baseStyle,
//   //   mergeStyle: mergeClasses(baseStyle, style)
//   })

//   const style = mergeClasses(baseStyle, options.style)

//   return div(`.${style.Bar}`, {
//     // props: {
//     //   className: classes(
//     //     style.bar,
//     //     small && 'small'
//     //   )
//     // },
//     class: {
//     //   // [style.bar]: true,
//       small
//     },
//     style:  {
//       justifyContent: `flex-${!alignRight ? 'start' : 'end'}`,
//     }
//   }, content)
// }



module.exports = BarView
// module.exports = content => {

//   const {
//     content,
//     small,
//     alignRight,
//   } = options

//   return div.bind(void 0, `.${style.Bar}`, {
//     class: {
//       //   // [style.bar]: true,
//       // small
//     },
//     style: {
//       justifyContent: `flex-${!alignRight ? 'start' : 'end'}`,
//     }
//   }, content)
// }