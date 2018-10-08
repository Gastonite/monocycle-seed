const dropRepeats = require('xstream/extra/dropRepeats').default
const Cycle = require('component')
const { WithInput } = require('components/Input')
const Factory = require('utilities/factory')

const WithFieldInput = options => {

  const {
    [Cycle.hasKey]: has
  } = options = Cycle.coerce(options)

  const classes = { FieldInput: 'FieldInput', ...options.classes }

  return component => Cycle(component)
    .map(WithInput({
      kind: '.' + classes.FieldInput,
      from: (sinks, sources) =>
        sources.onion.state$
          .compose(dropRepeats())         
          .map(({ value, viewValue }) => ({
            hook: viewValue !== value ? void 0 : {
              insert: vnode => vnode.elm.value = viewValue || '',
              update: (oldVnode, vnode) => vnode.elm.value = viewValue || '',
            }
          }))
    }))
}

const makeFieldInput = Factory(WithFieldInput)

module.exports = {
  default: makeFieldInput,
  makeFieldInput,
  WithFieldInput
}
