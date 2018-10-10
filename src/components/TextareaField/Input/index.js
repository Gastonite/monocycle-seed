const dropRepeats = require('xstream/extra/dropRepeats').default
const Cycle = require('component')
const { WithTextarea } = require('components/Textarea')
const { rem } = require('csx/lib')
const Factory = require('utilities/factory')

const syncHeightHandler = function () {

  // this.parentNode.style.height = "auto";
  // this.parentNode.style.height = (this.scrollHeight)+"px";

  this.parentNode.style.height = "auto";

  const height = (this.scrollHeight)+"px"

  this.parentNode.style.height = height
  this.style.height = height;
}

const WithTextareaFieldInput = options => {

  const {
    [Cycle.hasKey]: has
  } = options = Cycle.coerce(options)

  const classes = { FieldInput: 'FieldInput', ...options.classes }

  return component => Cycle(component)
    .map(WithTextarea({
      kind: '.' + classes.FieldInput,
      from: (sinks, sources) =>
        sources.onion.state$
          .compose(dropRepeats())
          .map(({ value, viewValue }) => ({
            style: {
              resize: 'none',
              paddingTop: rem(2.56)
            },
            hook: {
              insert: vnode => {

                vnode.elm.addEventListener("input", syncHeightHandler, false)
              
                setTimeout(syncHeightHandler.bind(vnode.elm), 0)

                vnode.elm.value = viewValue || ''
              },
              update: (oldVnode, vnode) => vnode.elm.value = viewValue || '',
              destroy: vnode => {
              
                vnode.elm.removeEventListener("input", syncHeightHandler)
              },
            }
          }))
    }))
}

const makeTextareaFieldInput = Factory(WithTextareaFieldInput)

module.exports = {
  default: makeTextareaFieldInput,
  makeTextareaFieldInput,
  WithTextareaFieldInput
}
