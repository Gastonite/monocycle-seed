

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
const { default: dropRepeats } = require('xstream/extra/dropRepeats')

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
const invoker = require('ramda/src/invoker')
const either = require('ramda/src/either')
const objOf = require('ramda/src/objOf')
const tryCatch = require('ramda/src/tryCatch')
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
const stringify = require('monocycle/utilities/stringify')
const { DebugState } = require('monocycle-dom/Debug')
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
const { WithLayout } = require('monocycle-dom/Layout');
const { WithFlexible } = require('monocycle-dom/Flexible');
const { WithView } = require('monocycle-dom/View');
const { WithTransition } = require('monocycle-state/Transition');
const { WithCodemirror } = require('monocycle-dom/Codemirror');
const { WithDebugState } = require('monocycle-dom/Debug');
// const { WithEditor } = require('../Editor');
const isNonEmptyString = both(isString, Boolean)

// Cycle.define('Counter', () => sources => ({ DOM: sources.onion.state$ }))
Cycle.define('DebugState', WithDebugState)
Cycle.define('Layout', WithLayout)
Cycle.define('Flexible', WithFlexible)
Cycle.define('Transition', WithTransition)
Cycle.define('View', WithView)
Cycle.define('Listener', WithListener)
Cycle.define('Clickable', WithClickable)
Cycle.define('DumbButton', WithDumbButton)
Cycle.define('Button', WithButton)
Cycle.define('Codemirror', WithCodemirror)
// Cycle.define('Editor', WithEditor)
// const schema = require('./schema.json')







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
// 

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


  default: ({ classes }) => Cycle.get('Layout').make({
    classes,
    has: [
      Cycle.get('Codemirror').make({
        classes,
        theme: 'darcula',
        mode: 'application/json',
        from: (sinks, sources) => sources.onion.state$
        .map(prop('value'))
        .compose(dropRepeats())
        .map(x => JSON.stringify(x, null, 2))
        .remember()
        // has: ''
      }).map(Cycle.get('Flexible').With({
        classes
      })),
      Cycle.get('DebugState').make(),
      Cycle.get('Flexible').make({
        sel: 'pre',
        classes,
        style: {
          backgroundColor: '#eee',
          color: '#444'
        },
        from: (sinks, sources) => sources.onion.state$
          .map(prop('value'))
          .debug('oulala')
          .compose(dropRepeats())
          .map(x =>
            $.of(x)
            .map(Cycle.parse)
            .replaceError(err => console.error('ParseError:', err.message) || $.empty())

          )
          .flatten()
          .remember()
        // .mapTo({
        //   has: 'yo'
        // })
        // .map(stringify)

        // from: (sinks, sources) => $.of('STATE'),
        // has: 'pouic'
      }),
      // Cycle.get('View').make({
      //   classes,
      //   style: {
      //     backgroundColor: '#eee'
      //   },
      //   from: (sinks, sources) => sources.onion.state$.debug('STATE')
      // }).isolation('preview')


    ]
  }).transition([
    () => ({ value: {"kind": "Button", "has": "teshht"} }),
    {
      from: (sinks, sources) => sinks.cursorActivity$
        .compose(sources.Time.debounce(800))
        .map(invoker(0, 'getValue'))
        .map(x => $.of(x)
          .map(JSON.parse)
          // .map(x => JSON.stringify(x, null, 2))
          // .map(JSON.parse)
          .replaceError(err => console.error('ERR', err.message) || $.empty())
        )
        .flatten()
      // .map(tryCatch(JSON.parse, ))

      ,
      // .map(apply()),
      name: 'update',
      reducer: value => state => ({
        value
      })
    }, 
    // {
    //   from: 'prettify$',
    //   name: 'prettify',
    //   reducer: () => 
    // }
  ]),


  // default: ({ classes }) => Cycle.parse({ kind: 'Button', has: 'coucou'})
  // makeApp
}

