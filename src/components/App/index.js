

// var fs = require('fs');
// var boldIcon = fs.readFileSync(require.resolve('font-awesome-svg-png/black/svg/bold.svg'), 'utf8');

// const Footer = () => ({ DOM: $.of(footer()) })

// const makeApp = ({ classes } = {}) =>

//   makeLayout({
//     classes,
//     gutter: false,
//     direction: 'column',
//     sel: `.${classes.App}`,
//     has: [
//       makeHeader(
//         makeNavigation({
//           classes,
//           spaced: true,
//           size: 'big',
//           has: [
//             makeLink({
//               classes,
//               has: makeImage({
//                 classes,
//                 attrs: {
//                   src: 'logo.png'
//                 },
//               }),
//             }),
//             makeFlexible({ classes }),
//             {
//               spaced: true,
//               gutter: false,
//               style: {
//                 justifyContent: 'flex-end',
//                 alignItems: 'center',
//               },
//               has: [
//                 { href: '/', has: 'Home' },
//                 { href: '/layouts', has: 'Layouts' },
//                 { href: '/forms', has: 'Forms' },
//               ]
//             },
//           ]
//         })
//       ),

//       makeLayout({
//         sel: `.${classes.Layout}.container`,
//         direction: 'column',
//         gutter: false,
//         classes,
//         has: makeRouter({
//           isStateful: true,
//           historySinkName: 'History',
//           Default: makeLayout({ classes, has: 'This is default page' }).isolation('home'),
//           resolve: [
//             {
//               resolve: PathToRegexp('/layouts/:path?'),
//               value: makeLayout({
//                 classes,
//                 direction: 'column',
//                 // from: () => $.of({ has: 'This is "Page A"' }),
//                 has: makeLayoutPage({
//                   classes,
//                 })
//               }).isolation('pageA')
//             },
//             {
//               resolve: PathToRegexp('/forms/:path?'),
//               value: makeLayout({
//                 classes,
//                 has: makeFormsPage({
//                   classes,
//                 })
//               }).isolation('formsPage')
//             },
//           ]
//         })
//       }).map(WithFlexible({ classes })),


//       makeNavigation({
//         classes,
//         gutter: false,
//         style: {
//           backgroundColor: 'hsla(0,0%,20%,1)',
//           marginTop: 'auto',
//           justifyContent: 'center',
//         },
//         has: {
//           spaced: true,
//           style: {
//             justifyContent: 'cennter',
//             alignItems: 'center',
//             fontSize: '2rem',
//             color: 'orange'
//           },
//           has: [
//             { href: '/sdfghj', has: 'Link 1' },
//             { href: '/oiuyt', has: 'Link 2' },
//             { href: 'dchjkijhkghhj', has: 'Link 3' },
//           ]
//         }
//       }),

//       makeBar({
//         classes,
//         style: {
//           marginTop: 'auto',
//           justifyContent: 'center',
//           fontSize: '12px',
//           fontFamily: 'initial',
//         },
//         has: 'Tous droits réservés - n00sphere labs',
//       }).concat(Footer)
//     ]
//   }).transition()

const { Stream: $ } = require('xstream')

const pipe = require('ramda/src/pipe')
const when = require('ramda/src/when')
const over = require('ramda/src/over')
const both = require('ramda/src/both')
const path = require('ramda/src/path')
const applyTo = require('ramda/src/applyTo')
const map = require('ramda/src/map')
const complement = require('ramda/src/complement')
const defaultTo = require('ramda/src/defaultTo')
const lensIndex = require('ramda/src/lensIndex')
const either = require('ramda/src/either')
const objOf = require('ramda/src/objOf')
const always = require('ramda/src/always')
const filter = require('ramda/src/filter')
const apply = require('ramda/src/apply')
const ifElse = require('ramda/src/ifElse')
const unless = require('ramda/src/unless')
const mapObjIndexed = require('ramda/src/mapObjIndexed')
const lensProp = require('ramda/src/lensProp')
const isEmpty = require('ramda/src/isEmpty')
const identity = require('ramda/src/identity')
const prop = require('ramda/src/prop')
const castArray = require('lodash/castArray')
const isUndefined = require('lodash/isUndefined')
const isFunction = require('lodash/isFunction')
const isString = require('lodash/isString')
const isPlainObject = require('lodash/isPlainObject')
// const schema = require('./schema.json')
const Cycle = require('component')
const { div } = require('@cycle/dom')
const log = require('utilities/log').Log('lab')
// const { default: $ } = require('xstream')
// const { footer } = require('@cycle/dom')
// const { makeNavigation } = require('components/Navigation')
// const { makeBar } = require('components/Bar')
// const { makeLayout } = require('components/Layout')
// const { makeFlexible } = require('components/Flexible')
// const { makeImage } = require('components/Image')
// const PathToRegexp = require('path-to-regexp')
// const { makeHeader } = require('components/Header')
// const { makeRouter } = require('components/Router')
const { DebugState } = require('components/Debug')
// const { makeLink } = require('components/Link')
// const { WithFlexible } = require('components/Flexible')
// const Counter = require('components/Counter')
// const { makeLayoutPage } = require('./LayoutPage')
// const { makeFormsPage } = require('./FormsPage')
// const { makeBoldButton } = require('components/Editor/Toolbar/BoldButton')
// const { makeEditorToolbar } = require('components/Editor/Toolbar')
// const { makeEditor } = require('components/Editor')
// const { makeCodemirror } = require('components/Codemirror')
// const { makeDumbButton } = require('components/DumbButton')
// const { makeButton } = require('components/Button')
// const { makeIconButton } = require('components/IconButton')
// const { makeSvgIcon, WithSvgIcon } = require('components/SvgIcon')
const { WithListener } = require('monocycle/operators/listener');
const { WithButton, makeButton } = require('monocycle-dom/Button');
const { WithDumbButton } = require('monocycle-dom/DumbButton');
const { WithClickable } = require('monocycle-dom/Clickable');
const { WithView } = require('monocycle-dom/View');
const { WithTransition } = require('monocycle-state/Transition');
const isNonEmptyString = both(isString, Boolean)

// Cycle.define('Counter', () => sources => ({ DOM: sources.onion.state$ }))
Cycle.define('Transition', WithTransition)
Cycle.define('View', WithView)
Cycle.define('Listener', WithListener)
Cycle.define('Clickable', WithClickable)
Cycle.define('DumbButton', WithDumbButton)
Cycle.define('Button', WithButton)
// const schema = require('./schema.json')

const isFalsy = complement(Boolean)







// const parse = pipe(
//   Cycle.coerce,
//   ({ kind }) => Cycle.get('View').make()
// )



const Test = Cycle.parse({
  "kind": "View",
  "has": [
    "coucou",
    {
      "kind": "View",
      "has": [
        {
          "kind": "Button",
          "has": "-",
          "with": [
            ["Listener", {
              "from": "return sinks.click$.filter(Boolean).mapTo(-1)",
              "to": "remove$"
            }]
          ],
          "scope": "removeButton"
        },
        {
          "kind": "Button",
          "has": "+",
          "with": [
            ["Listener", {
              "from": "return sinks.click$.filter(Boolean).mapTo(+1)",
              "to": "add$"
            }]
          ],
          "scope": "addButton"
        }
      ]
    },
  ],
  "with": [
    ["Transition", [
      "return 0",
      {
        "from": "return $.merge(sinks.remove$, sinks.add$)",
        "name": "update",
        "reducer": "return state => state + value"
      },
    ]]
  ]
})

  // .map(WithTransition({

  //   from: sinks => $.merge(sinks.remove$, sinks.add$),
  //   name: 'update',
  //   reducer: value => state => state + value

  // }, Cycle))

// .listener({
//   from: 'click$',
//   to: 'Log'
// })
// // .map(WithTransition('return 0', Cycle))
// .concat(DebugState, { View: div })

console.log('Test:', Test)

module.exports = {
  // default: ({ classes }) =>  makeBoldButton({ classes }).isolation({
  //   DOM: 'boldButton',
  //   '*': null
  // }),
  // default: makeEditor,
  // default: makeApp,

  default: ({ classes }) => Cycle.get('Button')
    .make('yo')
    .listener((sinks) => sinks.click$.debug('CLICK')),


  default: ({ classes }) => Test
    .concat(DebugState, { View: div }),

  // makeApp
}

