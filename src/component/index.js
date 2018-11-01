const { default: $ } = require('xstream')
const { makeComponent, defaultOperators } = require('monocycle/component')
const merge = require('snabbdom-merge/merge-all')
const { Log } = require('monocycle/utilities/log')
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
const isArray = require('lodash/isArray')
const isString = require('lodash/isString')
const isPlainObject = require('lodash/isPlainObject')

const { WithIsolation } = require('monocycle/operators/isolation')
const { WithTransition } = require('monocycle-state/Transition')

const WithParse = (options) => Cycle => {

  const {
    functions
  } = pipe(
    defaultTo({}),
    over(lensProp('functions'), pipe(
      mapObjIndexed(either(isFunction, (v, key) => {

        throw new Error(`${key} is not a function`)
      }))
    ))
  )(options)


  const parse = pipe(
    // x => {
    //   console.log('parse 0.5', x)
    //   return x
    // },
    Cycle.log.partial('parse 0'),
    // unless(isString, always('{}')),
    // when(isString, JSON.parse),

    Cycle.coerce,
    Cycle.log.partial('parse 1'),
    over(lensProp('kind'), unless(isFunction,
      pipe(Cycle.get, prop('make')),
    )),
    Cycle.log.partial('parse 2'),

    over(lensProp('with'), pipe(
      castArray,
      filter(Boolean),
      Cycle.log.partial('parse 22'),
      map(([behaviorId, options]) => {
        return Cycle.get(behaviorId, options)
      }),
      // map(pipe(
      //   castArray,
      //   // filter(isArray),

      //   // over(lensIndex(0), Cycle.get),
      //   Cycle.log.partial('parse 222'),

      //   ([behaviorId, options]) => {
      //     return Cycle.get(behaviorId, options)
      //   }
      // )),
      Cycle.log.partial('parse 23'),

      ifElse(isEmpty, always(identity), apply(pipe))


      // mapObjIndexed((value, key) => pipe(
      //   get,
      //   prop('With'),
      //   applyTo(value)
      // )(key))
      // either(pipe(get, prop('with')), kind => {
      //   throw new Error(`'${kind}' component is not defined`)
      // })
    )),
    Cycle.log.partial('parse 3'),

    over(lensProp('has'), pipe(
      castArray,
      map(
        when(isPlainObject, (x) => {

          Cycle.log('DEEPER_BEFORE', { x })
          const parsed = parse(x)
          Cycle.log('DEEPER_AFTER', { parsed })
          return parsed
        })
      )
    )),

    ({ kind, scope, with: behavior, ...options }) => {

      // console.log('YYYY', {
      //   behavior,
      //   kind,
      //   options
      //   // ret: kind(options)
      // })
      // // let component = kind(options)
      // // component = pipe(...behaviors)(component)
      // const ga = behavior(kind(options))
      // console.log('là', ga)

      const component = behavior(kind(options))

      return !scope ? component : component.isolation(scope)
    }
  )

  return Object.assign(Cycle, {
    parse
  });
}

const mergeViews = (views) => merge(...views.filter(Boolean))

const isProduction = process.env.NODE_ENV === "production"

const operators = {
  ...defaultOperators,
  transition: WithTransition,
}

const Component = makeComponent({
  enforceName: !isProduction,
  fromString: string => {

    const Text = () => ({ DOM: $.of(string) })

    return Text
  },
  log: isProduction ? void 0 : Log('(Cycle)'),
  operators,
  Combiners: ({ View = mergeViews }) => ({
    DOM: (streams = []) =>
      $.combine(...streams)
        .map(View)
  })
})

module.exports = pipe(
  WithParse({
    functions: {

    }
  })
)(Component)
