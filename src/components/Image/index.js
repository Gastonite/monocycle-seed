const Cycle = require('component')
const { WithView } = require('components/View')
const Factory = require('utilities/factory')

const WithImage = (options = {}) => {

  const {
    sel = '',
    has,
    ...viewOptions
  } = Cycle.coerce(options)

  const classes = { Image: 'Image', ...options.classes }

  return WithView({
    sel: 'img.' + classes.Image +  sel,
    ...viewOptions,
    has 
  })
}

const makeImage = Factory(WithImage)

module.exports = {
  default: makeImage,
  makeImage,
  WithImage
}