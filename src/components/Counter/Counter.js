const { Stream: $ } = require('xstream')
const { makeComponent } = require('monocycle')
const always = require('ramda/src/always')
const concat = require('ramda/src/concat')
const { ensurePlainObj } = require('monocycle/utilities/ensurePlainObj')
const { WithAfter } = require('monocycle/components/After')
const { WithListener } = require('monocycle/components/Listener')
const { WithReducer } = require('monocycle-state/Reducer')
const { WithView } = require('monocycle-dom/View')
const { pipe } = require('monocycle/utilities/pipe')
const over = require('ramda/src/over')
const add = require('ramda/src/add')
const unless = require('ramda/src/unless')
const tap = require('ramda/src/tap')
const toString = require('ramda/src/toString')
const lensProp = require('ramda/src/lensProp')
const isFunction = require('ramda-adjunct/lib/isFunction').default
const { DefaultView, ViewCombiner, mergeViewOptions } = require('monocycle-dom')
const { WithSymbols } = require('monocycle-abstract/symbols')
const { WithIsolated } = require('monocycle/components/Isolated')



const WithCounter = pipe(
  ensurePlainObj,
  over(lensProp('Component'), pipe(
    unless(isFunction, () => pipe(
      WithSymbols({
        mergeOptions: mergeViewOptions
      }),
    )(makeComponent({
      Default: DefaultView,
      Combiners: options => ({
        DOM: ViewCombiner(options)
      })
    })))
  )),
  tap(({ Component }) => {

    Component.set('View', WithView)
    Component.set('Isolated', WithIsolated)
    Component.set('After', WithAfter)
    Component.set('Reducer', WithReducer)
    Component.set('Listener', WithListener)

    Component.set('Button', 'View', {
      sel: 'button.Button'
    })

    Component.set('MinusButton', 'Button', {
      children: '-',
    })

    Component.set('PlusButton', 'Button', {
      children: '+',
    })

    Component.set('ClickListener', 'Listener', {
      from: (sinks, sources) => sources.DOM.events('click'),
    })

    Component.set('AddListener', 'ClickListener', {
      to: 'add$'
    })
    Component.set('RemoveListener', 'ClickListener', {
      to: 'remove$'
    })
  }),
  ({ Component }) => {

    return component => Component([
      component,
      Component.get('View').make([
        Component.get('View').make({
          from: (sinks, sources) => sources.state.stream
            .map(toString)
            // .map(x => x/*?*/ + '')
            .map(concat('Counter: ')),
        }),
        Component.get('View').make([
          Component.get('MinusButton').make()
            .map(Component.get('RemoveListener', {}))
            .map(Component.get('Isolated', {
              DOM: 'removeButton',
              '*': null
            })),
          Component.get('PlusButton').make()
            .map(Component.get('AddListener', {}))
            .map(Component.get('Isolated', {
              DOM: 'addButton',
              '*': null
            }))
        ])
      ])
        .map(pipe(
          Component.get('Reducer', always(0)),
          Component.get('Reducer', {
            from: sinks => $.merge(sinks.add$.mapTo(1), sinks.remove$.mapTo(-1)),
            reducer: add
          })
        ))
    ])
  }
)

module.exports = {
  default: WithCounter,
  WithCounter
}