const { Stream: $ } = require('xstream')
const { div } = require('@cycle/dom')
const { makeComponent: makeComponent } = require('monocycle');
const { WithButton } = require('monocycle-dom/Button');
// const { WithBar } = require('monocycle-dom/Bar');
const { WithClickable } = require('monocycle-dom/Clickable');
const { WithLayout } = require('monocycle-dom/Layout');
const { WithFlexible } = require('monocycle-dom/Flexible');
const { WithView } = require('monocycle-dom/View');
const { WithCodemirror } = require('monocycle-dom/Codemirror');
// const { WithDebugState } = require('monocycle-dom/Debug');
const { WithRepl } = require('monocycle-repl');
const { WithListener } = require('monocycle/components/Listener')
const log = require('monocycle/utilities/log').Log('App')
const pipe = require('ramda/src/pipe')
const objOf = require('ramda/src/objOf')
const isEmpty = require('ramda/src/isEmpty')
const always = require('ramda/src/always')
const { withDefaultView, withViewCombiner } = require('monocycle-dom/utilities/withView')
const { ensurePlainObj } = require('monocycle/utilities/ensurePlainObj')
const { Store } = require('monocycle-abstract/store')
const isFunction = require('ramda-adjunct/lib/isFunction').default
const over = require('ramda/src/over')
const lensProp = require('ramda/src/lensProp')
const unless = require('ramda/src/unless')

// // const { WithEditor } = require('../Editor');
// const isNonEmptyString = both(isString, Boolean)
// // const { makeViewBehavior } = require('monocycle-dom/View')

// /home/gaston/lab/monocycle/abstract/symbols.js
// // const Test = Cycle.parse({
// //   "kind": "View",
// //   "has": [
// //     "coucou",
// //     {
// //       "kind": "View",
// //       "has": [
// //         {
// //           "kind": "Button",
// //           "has": "-",
// //           "with": [
// //             ["Listener", {
// //               "from": "return sinks.click$.filter(Boolean).mapTo(-1)",
// //               "to": "remove$"
// //             }]
// //           ],
// //           "scope": "removeButton"
// //         },
// //         {
// //           "kind": "Button",
// //           "has": "+",
// //           "with": [
// //             ["Listener", {
// //               "from": "return sinks.click$.filter(Boolean).mapTo(+1)",
// //               "to": "add$"
// //             }]
// //           ],
// //           "scope": "addButton"
// //         }
// //       ]
// //     },
// //   ],
// //   "with": [
// //     ["Transition", [
// //       "return 0",
// //       {
// //         "from": "return $.merge(sinks.remove$, sinks.add$)",
// //         "name": "update",
// //         "reducer": "return state => state + value"
// //       },
// //     ]]
// //   ]
// // })
const render = log.partial('render')


// const Component = makeComponent({
//   Default: pipe(
//     $.of,
//     objOf('DOM'),
//     always
//   )
// })

const withMake = makeBehavior => {

  makeBehavior.make = options => makeBehavior(options)()

  return makeBehavior //isEmpty(otherArgs) ? behaviorFactory : behaviorFactory(...otherArgs)
}


const Component = pipe(
  withDefaultView,
  withViewCombiner,
  // WithStore({
  //   guard: (key, value, store) => {

  //     log('guard', key)
  //     if (isFunction(value) && !store.get(key))
  //       return withMake(value, Component)
  //   }
  // })
  makeComponent => {

    const guard = (key, value, store, ...rest) => {

      const found = store.get(key)

      log('guard', {
        key,
        found
      })

      if (isFunction(value) && !found)
        // return value
        return withMake(value)
    }

    return pipe(
      makeComponent,
      Component => {

        return Object.assign(
          Component,
          Store({
            guard
          })
        )
      }
    )
  }
)(makeComponent)()

module.exports = {

  //   // default: makeApp,

  //   default: ({ classes }) => Cycle.get('Button')
  //     .make({
  //       from: (sinks, sources) => sources.onion.state$.debug('state'),
  //       has: 'yo'
  //     })
  //     // .listener(`return sinks.click$.debug('CLICK')`)
  //     .transition([
  //       'return 0',
  //       // {
  //       //         "from": "return $.merge(sinks.remove$, sinks.add$)",
  //       //         "name": "update",
  //       //         "reducer": "return state => state + value"
  //       //       },
  //     ])
  //     .concat(Cycle.get('DebugState').make()),
  //   // .listener((sinks) => sinks.click$.debug('CLICK')),

  default: ({ classes }) => {

    Component.set('View', WithView)

    // return Cycle({
    //   View: div,
    //   has: [
    //     'yo',
    //     'bu'
    //   ]
    // })


    // return WithView({
    //   Component,
    //   has: +new Date
    // })()

    // return WithListener([
    //   {
    //     from: () => $.of(div('42')).map(render),
    //     to: 'DOM'
    //   },
    //   {
    //     from: () => $.of(div('43')).map(render),
    //     combine: $.merge,
    //     to: 'DOM'
    //   },
    // ])()

    // return Component.get('View', {
    //   Component,
    //   sel: '.ouetuuuu',
    //   has: 'yooo'
    // })()

    return Component.get('View').make({
      Component,
      View: div,
      has: Component.get('View').make({
        Component,
        sel: '.ouetuuuu',
        has: 'yo'
      })
    })
  },

  default1: ({ classes }) => {

    console.log('allClasses', classes)

    // // // Cycle.set('DebugState', WithDebugState)

    Component.set('Flexible', WithFlexible, {
      sel: '.' + classes.Flexible
    })
    // // // Cycle.set('Transition', WithTransition)
    Component.set('View', WithView)


    Component.set('Layout', WithLayout, {
      sel: '.' + classes.Layout
    })
    // // // Cycle.set('Layout', WithLayout, { classes })

    Component.set('Clickable', WithClickable)
    // // // Cycle.set('Bar', WithView, {
    // // //   sel: '.' + classes.Layout + '.' + classes.Bar,
    // // //   has: 'pouet'
    // // // })

    Component.set('DumbButton', 'View', {
      sel: 'button.' + classes.Button
    })
    const ClassesHelper = () => {

      return (options, Cycle) => {


        return component => {


          return Cycle(component)
            .after((sinks, sources) => {

              console.log('ClassesHelper after()')

              return sinks
            })
        }
      }
    }
    Component.set('Bar', ['Layout'], {
      sel: '.' + classes.Bar,
      has: 'Bar',
    })

    Component.set('DumbTextarea', 'View', {
      sel: 'textarea',
      has: 'DumbTextarea'
    })

    Component.set('Button', WithButton)

    // // Cycle.set('Dynamic', WithDynamic)

    // //   Cycle.set('DebugState', WithDebugState)
    Component.set('Codemirror', WithCodemirror, {
      dumb: typeof navigator === 'undefined'
    })
    Component.set('Repl', WithRepl)

    // // Cycle.set('Repl', () => component => sources => {

    // //   return ({
    // //     DOM: $.of('COUCOU')
    // //   })
    // // })



    return Component.get('Button').make({
      // viewOptions: {
      //   style: {
      //     background: '#bada55',
      //     position: 'relative'
      //   }
      // },
      // theme: 'darcula',
      // mode: 'application/json',
      // from: (sinks, sources) => sources.onion.state$
      //   .compose(dropRepeats(eqProps('value')))
      //   .map(({ value, cursor }) => ({
      //     value: JSON.stringify(value, null, 2),
      //     cursor
      //   }))
    })

    return Component.get('Repl').make({
      // value: {
      //   "kind": "View",
      //   "has": [
      //     "Counter:",
      //     {
      //       "kind": "View",
      //       "has": {
      //         "kind": "Layout",
      //         "has": [
      //           {
      //             "kind": "Button",
      //             "has": "-",
      //             "with": [
      //               ["Flexible", {}],
      //               [
      //                 "Listener",
      //                 {
      //                   "from": "return sinks.click$.filter(Boolean).mapTo(-1)",
      //                   "to": "remove$"
      //                 }
      //               ]
      //             ],
      //             "scope": "removeButton"
      //           },
      //           {
      //             "kind": "Button",
      //             "has": "+",
      //             "with": [
      //               [
      //                 "Listener",
      //                 {
      //                   "from": "return sinks.click$.filter(Boolean).mapTo(+1)",
      //                   "to": "add$"
      //                 }
      //               ]
      //             ],
      //             "scope": "addButton"
      //           },
      //           {
      //             "kind": "DebugState"
      //           }
      //         ]
      //       }
      //     }
      //   ],
      //   "with": [
      //     [
      //       "Transition",
      //       [
      //         "return 42",
      //         {
      //           "from": "return $.merge(sinks.remove$, sinks.add$)",
      //           "name": "update",
      //           "reducer": "return state + value"
      //         }
      //       ]
      //     ]
      //   ]
      // },
      value: {
        "kind": "View",
        "has": "+",
      }
    })

    return Component.get('Dynamic').make({
      has: 'yo',
      from: (sinks, sources) => $.merge(
        $.of(''),
        // $.periodic(10000)
      ).map(i => Component.get('Button').make('button' + i)).debug('gna')
    })
  },

}

