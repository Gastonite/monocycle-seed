const { default: $ } = require('xstream')
const dropRepeats = require('xstream/extra/dropRepeats').default
const Cycle = require('component')
const { WithTextarea } = require('components/Textarea')
const { rem } = require('csx/lib')

const syncHeightHandler = function () {
  console.log('syncHeightHandler()')

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
    // .after((sinks, sources) => ({
    //   ...sinks,
    //   fieldInputState$: sources.onion.state$
    //     .compose(dropRepeats())
    //     .debug('TextareaFieldInput.state yo')
    //     .remember()
    // }))
    .map(WithTextarea({
      kind: '.' + classes.FieldInput,
      from: (sinks, sources) =>
        sources.onion.state$
          .compose(dropRepeats())
          // .debug('TextareaFieldInput.state yo')

          .map(({ value, viewValue }) => ({
            style: {
              resize: 'none',
              paddingTop: rem(2.56)
            },
            hook: {
              insert: vnode => {

                vnode.elm.addEventListener("input", syncHeightHandler, false)
              
                setTimeout(syncHeightHandler.bind(vnode.elm), 0)
              },
              destroy: vnode => {
              
                vnode.elm.removeEventListener("input", syncHeightHandler)
              },
            }
          }))
    }))
}

const makeTextareaFieldInput = options => WithTextareaFieldInput(options)()

module.exports = {
  default: makeTextareaFieldInput,
  makeTextareaFieldInput,
  WithTextareaFieldInput
}
