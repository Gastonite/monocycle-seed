const intersection = require('lodash/intersection')
const { classes } = require('typestyle/lib/internal/utilities')


const mergeClasses = (baseStyle = {}, ...args) => args.reduce((before, style = {}) => {
  return {
    ...before,
    ...style,
    ...intersection(Object.keys(before), Object.keys(style))
      .reduce((merged, key) => ({
        ...merged,
        [key]: classes(before[key], style[key])
      }), {})
  }
}, baseStyle)


const bgMixin = background => ({ background })

const colorMixin = color => ({ color })

module.exports = {
  mergeClasses,
  bgMixin,
  colorMixin
}