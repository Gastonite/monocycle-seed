const { Stream: $ } = require('xstream')
// const { default: dropRepeats } = require('xstream/extra/dropRepeats')

// const stringify = require('monocycle/utilities/stringify')
// const pipe = require('ramda/src/pipe')
// const when = require('ramda/src/when')
// const over = require('ramda/src/over')
// const both = require('ramda/src/both')
// const path = require('ramda/src/path')
// const applyTo = require('ramda/src/applyTo')
// const map = require('ramda/src/map')
// const complement = require('ramda/src/complement')
// const eqProps = require('ramda/src/eqProps')
// const defaultTo = require('ramda/src/defaultTo')
// const lensIndex = require('ramda/src/lensIndex')
// const invoker = require('ramda/src/invoker')
// const either = require('ramda/src/either')
// const objOf = require('ramda/src/objOf')
// const tryCatch = require('ramda/src/tryCatch')
// const always = require('ramda/src/always')
// const filter = require('ramda/src/filter')
// const apply = require('ramda/src/apply')
// const ifElse = require('ramda/src/ifElse')
// const unless = require('ramda/src/unless')
// const mapObjIndexed = require('ramda/src/mapObjIndexed')
// const lensProp = require('ramda/src/lensProp')
// const isEmpty = require('ramda/src/isEmpty')
// const identity = require('ramda/src/identity')
// const prop = require('ramda/src/prop')
// const castArray = require('lodash/castArray')
// const isUndefined = require('lodash/isUndefined')
// const isFunction = require('lodash/isFunction')
// const isString = require('lodash/isString')
// const isPlainObject = require('lodash/isPlainObject')
// const Cycle = require('component')
// const { div } = require('@cycle/dom')
// const { WithButton } = require('monocycle-dom/Button');
// const { WithBar } = require('monocycle-dom/Bar');
// const { WithClickable } = require('monocycle-dom/Clickable');
// const { WithLayout } = require('monocycle-dom/Layout');
// const { WithFlexible } = require('monocycle-dom/Flexible');
// const { WithView } = require('monocycle-dom/View');
// const { WithTransition } = require('monocycle-state/Transition');
// const { WithCodemirror } = require('monocycle-dom/Codemirror');
// const { WithDebugState } = require('monocycle-dom/Debug');
// const { WithRepl } = require('monocycle-repl');
// // const { WithEditor } = require('../Editor');
// const isNonEmptyString = both(isString, Boolean)
// // const { makeViewBehavior } = require('monocycle-dom/View')


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



//   default: ({ classes }) => {

//     console.log('allClasses', classes)

//     // // // Cycle.define('DebugState', WithDebugState)

//     Cycle.define('Flexible', WithFlexible, {
//       sel: '.' + classes.Flexible
//     })
//     // // // Cycle.define('Transition', WithTransition)
//     Cycle.define('View', WithView)


//     Cycle.define('Layout', WithLayout, {
//       sel: '.' + classes.Layout
//     })
//     // // // Cycle.define('Layout', WithLayout, { classes })

//     Cycle.define('Clickable', WithClickable)
//     // // // Cycle.define('Bar', WithView, {
//     // // //   sel: '.' + classes.Layout + '.' + classes.Bar,
//     // // //   has: 'pouet'
//     // // // })

//     Cycle.define('DumbButton', 'View', {
//       sel: 'button.' + classes.Button
//     })
//     const ClassesHelper = () => {

//       return (options, Cycle) => {


//         return component => {
      

//           return Cycle(component)
//             .after((sinks, sources) => {
  
//               console.log('ClassesHelper after()')
  
//               return sinks
//             })
//         }
//       }
//     }
//     Cycle.define('Bar', ['Layout'], {
//       sel: '.' + classes.Bar,
//       has: 'Bar',
//     })

//     Cycle.define('DumbTextarea', 'View', {
//       sel: 'textarea',
//       has: 'DumbTextarea'
//     })

//     Cycle.define('Button', WithButton)

//     // // Cycle.define('Dynamic', WithDynamic)

//     // //   Cycle.define('DebugState', WithDebugState)
//     Cycle.define('Codemirror', WithCodemirror, {
//       dumb: typeof navigator === 'undefined'
//     })
//     Cycle.define('Repl', WithRepl)

//     // // Cycle.define('Repl', () => component => sources => {

//     // //   return ({
//     // //     DOM: $.of('COUCOU')
//     // //   })
//     // // })



//     return Cycle.get('Button').make({
//       // viewOptions: {
//       //   style: {
//       //     background: '#bada55',
//       //     position: 'relative'
//       //   }
//       // },
//       // theme: 'darcula',
//       // mode: 'application/json',
//       // from: (sinks, sources) => sources.onion.state$
//       //   .compose(dropRepeats(eqProps('value')))
//       //   .map(({ value, cursor }) => ({
//       //     value: JSON.stringify(value, null, 2),
//       //     cursor
//       //   }))
//     })

//     return Cycle.get('Repl').make({
//       // value: {
//       //   "kind": "View",
//       //   "has": [
//       //     "Counter:",
//       //     {
//       //       "kind": "View",
//       //       "has": {
//       //         "kind": "Layout",
//       //         "has": [
//       //           {
//       //             "kind": "Button",
//       //             "has": "-",
//       //             "with": [
//       //               ["Flexible", {}],
//       //               [
//       //                 "Listener",
//       //                 {
//       //                   "from": "return sinks.click$.filter(Boolean).mapTo(-1)",
//       //                   "to": "remove$"
//       //                 }
//       //               ]
//       //             ],
//       //             "scope": "removeButton"
//       //           },
//       //           {
//       //             "kind": "Button",
//       //             "has": "+",
//       //             "with": [
//       //               [
//       //                 "Listener",
//       //                 {
//       //                   "from": "return sinks.click$.filter(Boolean).mapTo(+1)",
//       //                   "to": "add$"
//       //                 }
//       //               ]
//       //             ],
//       //             "scope": "addButton"
//       //           },
//       //           {
//       //             "kind": "DebugState"
//       //           }
//       //         ]
//       //       }
//       //     }
//       //   ],
//       //   "with": [
//       //     [
//       //       "Transition",
//       //       [
//       //         "return 42",
//       //         {
//       //           "from": "return $.merge(sinks.remove$, sinks.add$)",
//       //           "name": "update",
//       //           "reducer": "return state + value"
//       //         }
//       //       ]
//       //     ]
//       //   ]
//       // },
//       value: {
//         "kind": "View",
//         "has": "+",
//       }
//     })

//     return Cycle.get('Dynamic').make({
//       has: 'yo',
//       from: (sinks, sources) => $.merge(
//         $.of(''),
//         // $.periodic(10000)
//       ).map(i => Cycle.get('Button').make('button' + i)).debug('gna')
//     })
//   },
  default: ({ classes }) => {
    // Cycle.define('Clickable', WithClickable)

    // // Cycle.define('Button', WithButton)


    // return Cycle.get('Clickable').make()

    return c => ({
      DOM: $.of('42')
    })
  }
}

