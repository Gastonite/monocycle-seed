const { Stream: $ } = require('xstream')
// const { div, button } = require('@cycle/dom');
// const { makeView, WithView } = require('components/View');
// const { DebugState } = require('components/Debug');
// const always = require('ramda/src/always');
// const { makeButton, WithButton } = require('components/Button');
// const { WithClickable, makeClickable } = require('components/Clickable');


function Counter555(sources) {

  const addClick$ = sources.DOM
    .select('.add')
    .events('click')

  const subtractClick$ = sources.DOM
    .select('.subtract')
    .events('click')

  const change$ = $.merge(
    addClick$.mapTo(+1),
    subtractClick$.mapTo(-1)
  )


  const count$ = change$.fold((total, change) => total + change, 0);

  return {
    DOM: count$.map(count =>
      div('.counter', [
        div('.count', count.toString()),
        button('.add', 'Add'),
        button('.subtract', 'Subtract')
      ])
    )
  }
}


/* const Counter = sources => ({ DOM: sources.onion.state$ })

module.exports = makeView([

  makeButton('-')
    .listener({
      from: sinks => sinks.click$.mapTo(-1),
      to: 'remove$'
    })
    .isolation('removeButton'),

  makeButton('+')
    .listener({
      from: sinks => sinks.click$.mapTo(1),
      to: 'add$'
    })
    .isolation('addButton'),
])

  .transition([
    always(0),
    {
      from: (sinks) => $.merge(sinks.add$, sinks.remove$),
      name: 'update',
      reducer: change => total => total + change
    }
  ])

  .concat(Counter, { View: div }) */

const pipe = require('ramda/src/pipe')
const when = require('ramda/src/when')
const over = require('ramda/src/over')
const both = require('ramda/src/both')
const path = require('ramda/src/path')
const applyTo = require('ramda/src/applyTo')
const map = require('ramda/src/map')
const complement = require('ramda/src/complement')
const lensIndex = require('ramda/src/lensIndex')
const either = require('ramda/src/either')
const mapObjIndexed = require('ramda/src/mapObjIndexed')
const objOf = require('ramda/src/objOf')
const unless = require('ramda/src/unless')
const lensProp = require('ramda/src/lensProp')
const isEmpty = require('ramda/src/isEmpty')
const prop = require('ramda/src/prop')
const castArray = require('lodash/castArray')
const isUndefined = require('lodash/isUndefined')
const isString = require('lodash/isString')
// const schema = require('./schema.json')
const Cycle = require('component')
const log = require('utilities/log').Log('lab')

const { WithListener } = require('monocycle/operators/listener');
const { WithButton } = require('monocycle-dom/Button');
const { WithClickable } = require('monocycle-dom/Clickable');
const { WithView } = require('monocycle-dom/View');
const { WithTransition } = require('monocycle-state/Transition');
const isNonEmptyString = both(isString, Boolean)

// Cycle.define('Counter', () => sources => ({ DOM: sources.onion.state$ }))
// Cycle.define('Transition', WithTransition)
// Cycle.define('View', WithView)
Cycle.define('Listener', WithListener)
Cycle.define('Clickable', WithClickable)
Cycle.define('Button', WithButton)

const isFalsy = complement(Boolean)

const component = pipe(
  // path(['has', 0, 'has', 0]),
  when(isString, objOf('kind')),
  over(lensProp('kind'), either(pipe(Cycle.get, prop('make')), kind => {
    throw new Error(`'${kind}' component is not defined`)
  })),
  over(lensProp('with'), unless(either(isFalsy, isEmpty), pipe(
    castArray,
    map(pipe(
      castArray,
      over(lensIndex(0), either(pipe(Cycle.get, prop('With')), kind => {
        throw new Error(`'${kind}' component is not defined`)
      })),
      ([behavior, options]) => {
        return behavior(options)
      }
    )),
    // mapObjIndexed((value, key) => pipe(
    //   get,
    //   prop('With'),
    //   applyTo(value)
    // )(key))
    // either(pipe(get, prop('with')), kind => {
    //   throw new Error(`'${kind}' component is not defined`)
    // })
  )))
)({
  "kind": "Button",
  "has": "-",
  "scope": "removeButton"
})


const a = component.kind()
console.log('ici')
const b = map(applyTo(a))(component.with)


console.log('component=', component)
module.exports = b;