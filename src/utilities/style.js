const intersection = require('lodash/intersection')
const isNonEmptyString = require('predicates/isNonEmptyString')
const { classes } = require('typestyle')


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

const Selector = input => isNonEmptyString(input)
  ? '.' + input.replace(' ', '.')
  : void 0

module.exports = {
  mergeClasses,
  bgMixin,
  colorMixin,
  Selector
}