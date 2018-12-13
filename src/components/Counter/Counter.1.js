const { Stream: $ } = require('xstream');
const { makeComponent } = require('monocycle');
const { div, h2, span, button } = require('@cycle/dom');
const always = require('ramda/src/always');
const prop = require('ramda/src/prop');
const objOf = require('ramda/src/objOf');
const concat = require('ramda/src/concat');
const { stringify } = require('monocycle/utilities/stringify')
const { ensurePlainObj } = require('monocycle/utilities/ensurePlainObj')
const { WithListener } = require('monocycle/components/Listener')
const { WithLayout } = require('monocycle-dom/Layout')
const { WithReducer } = require('monocycle-state/Reducer')
const { WithView } = require('monocycle-dom/View')
const { WithButton } = require('monocycle-dom/Button')
const { pipe } = require('monocycle/utilities/pipe')
const over = require('ramda/src/over')
const unless = require('ramda/src/unless')
const tap = require('ramda/src/tap')
const lensProp = require('ramda/src/lensProp')
const isFunction = require('ramda-adjunct/lib/isFunction').default
const { DefaultView, ViewCombiner, mergeViewOptions } = require('monocycle-dom')
const { WithSymbols } = require('monocycle-abstract/symbols')
const { WithIsolated } = require('monocycle/components/Isolated')

const Counter1 = sources => {

  const initReducer$ = $.of(always(0));

  const add$ = sources.DOM.select('.add').events('click')

  const subtract$ = sources.DOM.select('.remove').events('click')

  const sumReducer$ = $.merge(add$.mapTo(+1), subtract$.mapTo(-1))
    .map(y => x => x + y)

  return {
    DOM: sources.state.stream
      .map(count =>
        div([
          div(`Counter: ${count}`),
          div([
            button('.remove', '-'),
            button('.add', '+'),
          ])
        ])
      ),
    state: $.merge(
      initReducer$,
      sumReducer$
    )
  }
}

const Counter = WithView({
  has: [
    WithView({
      has: 'yo',
      from: (sinks, sources) => sources.state.stream
        .map(count => `Counter: ${count}`)
    })(),
    WithView({
      has: [
        WithButton({
          sel: '.remove',
          has: '-',
        })()
          .map(WithListener({
            from: sinks => sinks.click$.mapTo(-1).debug('addClick'),
            // combine: $.merge,
            to: 'add$'
          })),
        WithButton({
          sel: '.add',
          has: '+',
        })()
          .map(WithListener({
            from: sinks => sinks.click$.mapTo(1).debug('removeClick'),
            // combine: $.merge,
            to: 'remove$'
          }))
        // .map(WithListener([
        //   {
        //     from: (sinks, sources) => console.log('addButton sinks=', sinks) || $.of(42)
        //   }
        // ])),
      ]
    })(),
  ]
})()

  .map(WithReducer(always(0)))
  .map(WithReducer({
    from: 'add$',
    from: sinks => $.merge(sinks.add$, sinks.remove$).debug('addd'),

    reducer: value => state => state + value
  }))




const WithCounter = pipe(
  ensurePlainObj,
  over(lensProp('Component'), pipe(
    unless(isFunction, () => pipe(
      // x => x,
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
  tap(({ Component: Cycle }) => {
    Cycle.set('Isolated', WithIsolated)
    Cycle.set('Reducer', WithReducer)

    Cycle.set('View', WithView)
    Cycle.set('Layout', WithLayout)

    Cycle.set('Listener', WithListener)
    Cycle.set('AddListener', 'Listener', {
      from: sinks => sinks.click$.filter(Boolean).debug('add$'),
      to: 'add$'
    })
    Cycle.set('RemoveListener', 'Listener', {
      from: sinks => sinks.click$.filter(Boolean),
      to: 'remove$'
    })

    Cycle.set('Button', WithButton, {
      upEvent: { name: 'animationend' },
      // sel: '.' + classes.Button,
      sel: '.Button',
    })
    Cycle.set('MinusButton', 'Button', {
      children: '-',
    })
    Cycle.set('PlusButton', 'Button', {
      children: '+',
    })
  }),
  ({ Component: Cycle }) => {

    // Cycle.get//?

    const Counter2 = Cycle.get('View').make([
      Cycle.get('View').make({
        from: (sinks, sources) => sources.state.stream.map(stringify).debug('state').map(concat('Counter: ')),
        //     // from: (sinks, sources) => $.of('state')
      }),
      Cycle.get('View').make([
        Cycle.get('MinusButton').make()
          .map(Cycle.get('RemoveListener', {}))
          .map(Cycle.get('Isolated', {
            DOM: 'removeButton',
            '*': null
          })),
        Cycle.get('PlusButton').make()
          .map(Cycle.get('AddListener', {}))
          .map(Cycle.get('Isolated', {
            DOM: 'addButton',
            '*': null
          }))
      ])
    ])
      .map(pipe(
        Cycle.get('Reducer', always(0)),
        Cycle.get('Reducer', {
          from: 'add$',
          from: sinks => $.merge(sinks.add$.mapTo(1), sinks.remove$.mapTo(-1)).debug('change'),
          // from: sinks => sinks.add$.debug('change'),
          reducer: value => state => {

            const a = state + value

            console.log('a', a)

            return a
          }
        })
      ))



    return () => Counter2

    return component => Component([
      'yo',
      component,
      // WithButton()()
    ])
  }
)





module.exports = {
  default: WithCounter,
  WithCounter,
}