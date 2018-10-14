const { Stream: $ } = require('xstream')
const Cycle = require('component')
const pipe = require('ramda/src/pipe')
const Factory = require('utilities/factory')
const dropRepeats = require('xstream/extra/dropRepeats').default
const { WithView } = require('components/View')
const parseOptions = pipe(
  Cycle.coerce,
  // over(lensProp('isTouchEvent'), either(isBoolean, always(false))),

)

const WithClickable = (options = {}) => {

  const {
    // useCapture = true,
    // isTouchEvent,
    down = { name: 'mousedown'/* , options: { useCapture: 0 }  */ },
    up = { name: 'mouseup' },
  } = options = parseOptions(options)

  const classes = { Clickable: '', ...options.classes }

  const Clickable = Cycle()
    .listener({
      from: (sinks, sources) => sources.DOM.events(down.name, down.options)
        .compose(dropRepeats())
        .mapTo(true),
      to: 'click$'
    })
    .map(WithView({
      kind: '.' + classes.Clickable,
      from: (sinks, sources) =>
        $.merge(
          sinks.click$,
          $.merge(
            // sources.DOM.events(up.name, up.options)
            //   .compose(dropRepeats()),
            sources.DOM.events('animationend', {})
              .compose(dropRepeats())
          )
            .mapTo(false)
        )
          .startWith(false)
          .map(click => ({
            class: {
              click
            }
          }))
    }))

  return component => Cycle([
    component,
    Clickable
  ])
}


const makeClickable = Factory(WithClickable)

module.exports = {
  default: makeClickable,
  makeClickable,
  WithClickable
}