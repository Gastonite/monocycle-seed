const { div } = require('@cycle/dom')
const { default: isolate } = require('@cycle/isolate')
const { makeComponent } = require('monocycle/component')
const { WithView } = require('monocycle-dom/View')
const { ViewCombiner, DefaultView, mergeOptions } = require('monocycle-dom')
const { WithLayout } = require('monocycle-dom/Layout')
const { WithButton } = require('monocycle-dom/Button')
const { WithReducer } = require('monocycle-state/WithReducer')
const { WithClickable } = require('monocycle-dom/Clickable')
const { WithSymbols } = require('monocycle-abstract/symbols')
const { WithIsolated } = require('monocycle/components/Isolated')
const { WithListener } = require('monocycle/components/Listener')
const { pipe } = require('monocycle/utilities/pipe')
const { assign } = require('monocycle/utilities/assign')
const isNonEmptyString = require('ramda-adjunct/lib/isNonEmptyString').default
const isFunction = require('ramda-adjunct/lib/isFunction').default
const objOf = require('ramda/src/objOf')
const always = require('ramda/src/always')
const { WithCounter } = require('../Counter')
const log = require('monocycle/utilities/log').Log('App')

const WithOperator = (name, makeBehavior) => {
  if (!isNonEmptyString(name))
    throw new Error(`WithOperatorError: 'name' must be a string`)

  if (!isFunction(makeBehavior))
    throw new Error(`WithOperatorError: 'makeBehavior' must be a functon`)

  return Component => assign({
    operators: {
      ...Component.operators,
      [name]: makeBehavior
    },
  })(Component)
}

const Component = pipe(
  WithSymbols({
    mergeOptions
  }),
  WithOperator('isolate', WithIsolated),
)(makeComponent({
  Default: DefaultView,
  Combiners: options => ({
    DOM: ViewCombiner(options)
  })
}))


module.exports = {
  default: ({ classes }) => {

    // Component.set('Listener', WithListener)
    // // Component.set('Clickable', WithClickable)
    // Component.set('Reducer', WithReducer)
    Component.set('View', WithView)
    // Component.set('DumbLayout', 'View', {
    //   sel: '.' + classes.Layout
    // })
    // Component.set('Layout', WithLayout)
    // Component.set('DumbButton', 'View', {
    //   sel: 'button.' + classes.Button
    // })
    // Component.set('Button', WithButton)
    // Component.set('Counter', WithCounter)


    // return WithView({
    //   // ...options,
    //   has: 'meu',
    //   from: (sinks, sources) => {

    //     console.log('pwet')
    //     return $.of(false)
    //       .map(click => {
    //         console.log('gna')

    //         return ({
    //           class: {
    //             click
    //           },
    //           has: 'gna'
    //         })
    //       })
    //   },
    // })()


    // return pipe(

    //   WithView({
    //     from: (c, s) => s.state.stream.map(stringify)
    //   }),
    //   Component.get('Listener', {
    //     from: () => $.of(always(0)),
    //     to: 'state'
    //   }),
    //   component => {

    //     // console.log('ici', component)

    //     return sources => {

    //       return {
    //         ...component(sources),
    //         state: $.of(always(0))
    //       }
    //     }
    //   }
    // )()

    return Component.get('View').make('gna')
    return Component.get('Counter').make()

    const c = Component.get('Layout').make({
      gutter: false,
      direction: 'column',
      has: [
        Component.get('Layout').make({
          // direction: 'column',
          has: [
            Component.get('Button')
              .make('-')
              .isolate('removeButton'),
            Component.get('Button')
              .make('+')
              .isolate('addButton'),
          ]
        }),
        Component.get('View').make({
          from: (component, sources) => sources.state.stream.map(state => ({
            has: '' + state
          }))
          // .map(objOf('has'))
        })
      ]
    })
      .concat(Component.get('Transition').make(always(0)))


    console.log('c:', Object.keys(c))

    return c
    //   {
    //     DOM: 'Button'
    //   }
    // )

    // return WithCounter(Component)(sources => ({ DOM: $.of(div('world')) }))

    return Component.get('View', {
      sel: 'div#zo.bu',
      has: [
        // Component.get('Button', {
        //   sel: '.ga',
        //   has: 'meu'
        // })(),
        // Component.get('Button').make({
        //   sel: '.ga',
        //   has: 'meu'
        // }),
        Component.get('Button').make('you')
      ]
    })()

  }
}