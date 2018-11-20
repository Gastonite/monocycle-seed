const { default: $ } = require('xstream')
const { makeComponent: _makeComponent, defaultOperators } = require('monocycle/component')
const { Log } = require('monocycle/utilities/log')
const when = require('ramda/src/when')
const over = require('ramda/src/over')
const applyTo = require('ramda/src/applyTo')
const map = require('ramda/src/map')
const objOf = require('ramda/src/objOf')
const filter = require('ramda/src/filter')
const apply = require('ramda/src/apply')
const ifElse = require('ramda/src/ifElse')
const unless = require('ramda/src/unless')
const { WithStore } = require('monocycle/store');
const lensProp = require('ramda/src/lensProp')
const isFunction = require('ramda-adjunct/lib/isFunction').default
const prop = require('ramda/src/prop')
const both = require('ramda/src/both')
const pipe = require('ramda/src/pipe')
const identical = require('ramda/src/identical')
const concat = require('ramda/src/concat')
const compose = require('ramda/src/compose')
const always = require('ramda/src/always')
const lt = require('ramda/src/lt')
const merge = require('ramda/src/merge')
const isEmpty = require('ramda/src/isEmpty')
const ensureArray = require('ramda-adjunct/lib/ensureArray').default
const isPlainObj = require('ramda-adjunct/lib/isPlainObj').default
const complement = require('ramda/src/complement')
const { Empty: EmptyObject } = require('monocycle/utilities/empty')
const log = require('monocycle/utilities/log').Log('app').partial
const mergeViews = require('snabbdom-merge/merge-all')

const different = compose(complement, identical)

// const WithParse = (options) => Cycle => {

//   const {
//     functions
//   } = pipe(
//     defaultTo({}),
//     over(lensProp('functions'), pipe(
//       mapObjIndexed(either(isFunction, (v, key) => {

//         throw new Error(`${key} is not a function`)
//       }))
//     ))
//   )(options)


//   const parse = pipe(
//     // x => {
//     //   console.log('parse 0.5', x)
//     //   return x
//     // },
//     Cycle.log.partial('parse 0'),
//     // unless(isString, always('{}')),
//     // when(isString, JSON.parse),

//     Cycle.coerce,
//     Cycle.log.partial('parse 1'),
//     over(lensProp('kind'), unless(isFunction,
//       pipe(Cycle.get, prop('make')),
//     )),
//     Cycle.log.partial('parse 2'),

//     over(lensProp('with'), pipe(
//       castArray,
//       filter(Boolean),
//       Cycle.log.partial('parse 22'),
//       map(([behaviorId, options]) => {
//         return Cycle.get(behaviorId, options)
//       }),
//       // map(pipe(
//       //   castArray,
//       //   // filter(isArray),

//       //   // over(lensIndex(0), Cycle.get),
//       //   Cycle.log.partial('parse 222'),

//       //   ([behaviorId, options]) => {
//       //     return Cycle.get(behaviorId, options)
//       //   }
//       // )),
//       Cycle.log.partial('parse 23'),

//       ifElse(isEmpty, always(identity), apply(pipe))


//       // mapObjIndexed((value, key) => pipe(
//       //   get,
//       //   prop('With'),
//       //   applyTo(value)
//       // )(key))
//       // either(pipe(get, prop('with')), kind => {
//       //   throw new Error(`'${kind}' component is not defined`)
//       // })
//     )),
//     Cycle.log.partial('parse 3'),

//     over(lensProp('has'), pipe(
//       castArray,
//       map(
//         when(isPlainObject, (x) => {

//           Cycle.log('DEEPER_BEFORE', { x })
//           const parsed = parse(x)
//           Cycle.log('DEEPER_AFTER', { parsed })
//           return parsed
//         })
//       )
//     )),

//     ({ kind, scope, with: behavior, ...options }) => {

//       // console.log('YYYY', {
//       //   behavior,
//       //   kind,
//       //   options
//       //   // ret: kind(options)
//       // })
//       // // let component = kind(options)
//       // // component = pipe(...behaviors)(component)
//       // const ga = behavior(kind(options))
//       // console.log('là', ga)

//       const component = behavior(kind(options))

//       return !scope ? component : component.isolation(scope)
//     }
//   )

//   return Object.assign(Cycle, {
//     parse
//   });
// }

// const mergeViews = (views) => mergeAll(...views.filter(Boolean))

// const isProduction = process.env.NODE_ENV === "production"

// const Cycle = makeComponent({
//   enforceName: !isProduction,
//   // redefinable: true,
//   fromString: string => {

//     const Text = () => ({ DOM: $.of(string) })

//     return Text
//   },
//   log: isProduction ? void 0 : Log('(Cycle)'),
//   operators: {
//     ...defaultOperators,
//     transition: WithTransition,
//   },
//   mergeOptions: (defaultOptions, options) => {

//     console.log('mergeOptions()')

//     return ({
//       ...merge(defaultOptions, options),
//       ...mergeViewOptions(defaultOptions, options),
//       // sel: mergeSelectors(defaultOptions.sel, options.sel)
//     })
//   },
//   // mergeOptions: (...args) => ap(
//   //   merge,
//   //   mergeViewOptions
//   // )(args),
//   Combiners: ({ View = mergeViews }) => ({
//     DOM: (streams = []) =>
//       $.combine(...streams)
//         .map(View)
//   })
// })

// Cycle.define('Listener', WithListener)
// module.exports = pipe(
//   WithParse({
//     functions: {

//     }
//   })
// )(Cycle)

const makeComponent = pipe(
  // withComponentAsArgument,
  withComponentStore,
)(_makeComponent)


module.exports = makeComponent({
  Combiners: pipe(
    prop('View'),
    unless(isFunction, always(pipe(
      ensureArray,
      filter(Boolean),
      apply(mergeViews),
    ))),
    map,
    render => pipe(
      ensureArray,
      apply($.combine),
      render
    ),
    objOf('DOM')
  ),
  fromString: string => {

    const Text = () => ({ DOM: $.of(string) })

    return Text
  },
})