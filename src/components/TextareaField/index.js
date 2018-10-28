const { WithField } = require('components/Form/Field')
const { makeTextareaFieldInput } = require('./Input')
const Cycle = require('component')
const Factory = require('utilities/factory')
const { mergeClasses } = require('utilities/style')

const WithTextareaField = (options = {}) => {

  const {
    classes,
    ...fieldOptions
  } = options = Cycle.coerce(options)

  return WithField({
    ...fieldOptions,
    classes: mergeClasses(classes, {
      Field: classes.TextareaField
    }),
    makeInput: makeTextareaFieldInput,
  })
}

const makeTextareaField = Factory(WithTextareaField)

module.exports = {
  default: makeTextareaField,
  makeTextareaField,
  WithTextareaField
}