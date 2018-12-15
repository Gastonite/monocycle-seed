const { div } = require('@cycle/dom')
// const { default: isolate } = require('@cycle/isolate')
const { makeComponent } = require('monocycle/component')
const { WithView } = require('monocycle-dom/View')
const { ViewCombiner, DefaultView, mergeViewOptions } = require('monocycle-dom')
const { WithLayout } = require('monocycle-dom/Layout')
const { WithAfter } = require('monocycle/components/After')
const { WithDynamic } = require('monocycle/components/Dynamic')
const { stringify } = require('monocycle/utilities/stringify')
const { WithButton } = require('monocycle-dom/Button')
const { WithReducer } = require('monocycle-state/Reducer')
const { WithClickable } = require('monocycle-dom/Clickable')
const { WithSymbols } = require('monocycle-abstract/symbols')
const { WithSwitch, Case } = require('monocycle/components/Switch')
const { WithIsolated } = require('monocycle/components/Isolated')
const { WithListener } = require('monocycle/components/Listener')
const { pipe } = require('monocycle/utilities/pipe')
const { assign } = require('monocycle/utilities/assign')
const isNonEmptyString = require('ramda-adjunct/lib/isNonEmptyString').default
const isFunction = require('ramda-adjunct/lib/isFunction').default
const objOf = require('ramda/src/objOf')
const applyTo = require('ramda/src/applyTo')
const always = require('ramda/src/always')
const { WithCounter } = require('../Counter')
const log = require('monocycle/utilities/log').Log('App')
// const { extractSinks } = require('cyclejs-utils')
const dropRepeats = require('xstream/extra/dropRepeats').default

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

const Cycle = pipe(
  WithSymbols({
    mergeOptions: mergeViewOptions
  }),
  // WithOperator('isolate', WithIsolated),
)(makeComponent({
  Default: DefaultView,
  Combiners: options => ({
    DOM: ViewCombiner(options)
  })
}))

module.exports = {
  // default: ({ classes }) => {

  //   Cycle.set('View', WithView)
  //   Cycle.set('Dynamic', WithDynamic)
  //   Cycle.set('Switch', WithSwitch)


  //   // const WithSwitch = ({ from, resolve }) => {

  //   //   return (component = () => ({})) => {


  //   //     return sources => {

  //   //       const sinks = component(sources)
  //   //       const sinks$ = from(sinks, sources)
  //   //         .compose(sources.Time.debounce(0))
  //   //         .map(value => {
  //   //           console.log('from', value)

  //   //           return Cycle.get('View').make(resolve
  //   //             .map(applyTo(value))
  //   //             .filter(Boolean))
  //   //         })
  //   //         .map(applyTo(sources))
  //   //         .remember()


  //   //       // return sinks$.map(sinks => {



  //   //       // })

  //   //       return ['DOM', 'state']
  //   //         .reduce((before, key, i) => ({
  //   //           ...before,
  //   //           [key]: sinks$
  //   //             .map(sinks => {

  //   //               console.log('extractSinks.sinks(' + i + ')=', {
  //   //                 sinks
  //   //               })

  //   //               return sinks[key]
  //   //             })
  //   //             .filter(b => !!b)
  //   //             // .map(b => b.remember())
  //   //             .flatten()
  //   //             .debug('gna')
  //   //         }), {})
  //   //       return extractSinks(
  //   //         component$.map(applyTo(sources)),

  //   //       )
  //   //     }
  //   //   }


  //   //   const withSwitch = Cycle.get('Dynamic', {
  //   //     SinksKeys: () => ['DOM', 'ga', 'bu'],
  //   //     from: (component, sources) => {

  //   //       const sinks = component(sources)
  //   //       const component$ = from(sinks, sources)
  //   //         .map(value => {
  //   //           console.log('from', value)

  //   //           return Cycle.get('View').make(cases
  //   //             .map(applyTo(value))
  //   //             .filter(Boolean))
  //   //         })

  //   //       return sources => extractSinks(
  //   //         component$.map(applyTo(sources)),
  //   //         ['DOM', 'ga', 'bu']
  //   //       )
  //   //     }
  //   //   })


  //   //   return withSwitch
  //   // }

  //   return Cycle.get('Switch').make({
  //     // merge: Cycle.get('View').make,
  //     from: (sinks, sources) => {
  //       console.log('from()')
  //       return $.of(42).compose(sources.Time.debounce(0))
  //     },
  //     resolve: [
  //       Case({
  //         resolve: x => {

  //           console.log('resolveA', x)
  //           return x > 41
  //         },
  //         value: Cycle(() => ({ DOM: $.of(div('caseA')) }))
  //       }),
  //       Case({
  //         resolve: x => {

  //           console.log('resolveB', x)

  //           return true
  //         },
  //         value: Cycle(() => ({ DOM: $.of(div('caseB')) }))
  //       }),
  //     ]
  //   })
  // },
  default: ({ classes }) => {

    Cycle.set('Counter', WithCounter)


    // const WithSwitch = ({ from, resolve }) => {

    //   return (component = () => ({})) => {


    //     return sources => {

    //       const sinks = component(sources)
    //       const sinks$ = from(sinks, sources)
    //         .compose(sources.Time.debounce(0))
    //         .map(value => {
    //           console.log('from', value)

    //           return Cycle.get('View').make(resolve
    //             .map(applyTo(value))
    //             .filter(Boolean))
    //         })
    //         .map(applyTo(sources))
    //         .remember()


    //       // return sinks$.map(sinks => {



    //       // })

    //       return ['DOM', 'state']
    //         .reduce((before, key, i) => ({
    //           ...before,
    //           [key]: sinks$
    //             .map(sinks => {

    //               console.log('extractSinks.sinks(' + i + ')=', {
    //                 sinks
    //               })

    //               return sinks[key]
    //             })
    //             .filter(b => !!b)
    //             // .map(b => b.remember())
    //             .flatten()
    //             .debug('gna')
    //         }), {})
    //       return extractSinks(
    //         component$.map(applyTo(sources)),

    //       )
    //     }
    //   }


    //   const withSwitch = Cycle.get('Dynamic', {
    //     SinksKeys: () => ['DOM', 'ga', 'bu'],
    //     from: (component, sources) => {

    //       const sinks = component(sources)
    //       const component$ = from(sinks, sources)
    //         .map(value => {
    //           console.log('from', value)

    //           return Cycle.get('View').make(cases
    //             .map(applyTo(value))
    //             .filter(Boolean))
    //         })

    //       return sources => extractSinks(
    //         component$.map(applyTo(sources)),
    //         ['DOM', 'ga', 'bu']
    //       )
    //     }
    //   })


    //   return withSwitch
    // }

    return Cycle.get('Counter').make()
  },
}