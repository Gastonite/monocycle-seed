const Cycle = require('component')
const { WithView } = require('components/View')
const Factory = require('utilities/factory')

const WithImage = (options = {}) => {

  const {
    kind = '',
    [Cycle.hasKey]: has,
    ...viewOptions
  } = Cycle.coerce(options)

  const classes = { Image: 'Image', ...options.classes }

  return WithView({
    kind: 'img.' + classes.Image +  kind,
    ...viewOptions,
    [Cycle.hasKey]: has
  })
}

const makeImage = Factory(WithImage)

module.exports = {
  default: makeImage,
  makeImage,
  WithImage
}