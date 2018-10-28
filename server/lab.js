const assert = require('browser-assert')
const pipe = require('ramda/src/pipe')
const when = require('ramda/src/when')
const over = require('ramda/src/over')
const complement = require('ramda/src/complement')
const both = require('ramda/src/both')
const path = require('ramda/src/path')
const applyTo = require('ramda/src/applyTo')
const map = require('ramda/src/map')
const lensIndex = require('ramda/src/lensIndex')
const either = require('ramda/src/either')
const mapObjIndexed = require('ramda/src/mapObjIndexed')
const objOf = require('ramda/src/objOf')
const unless = require('ramda/src/unless')
const lensProp = require('ramda/src/lensProp')
const contains = require('ramda/src/contains')
const prop = require('ramda/src/prop')
const castArray = require('lodash/castArray')
const isFunction = require('lodash/isFunction')
const isUndefined = require('lodash/isUndefined')
const isString = require('lodash/isString')
const capitalize = require('lodash/capitalize')
const schema = require('./schema.json')
const Cycle = require('../src/component')
const log = require('../src/utilities/log').Log('lab')

const { WithButton } = require('monocycle-dom/Button');
const { WithView } = require('monocycle-dom/View');
const { WithTransition } = require('monocycle-state/Transition');

const isNonEmptyString = both(isString, Boolean)

const Empty = () => ({})
const _components = {}


const define = (name, _behavior) => {

  assert(isNonEmptyString(name),
    `'name' must be a non empty string`)

  assert(complement(contains(name, Object.keys(_components))),
    `'${name}' component name already exists`)

  assert(isFunction(_behavior),
    `'behavior' must be a function`)

  // const _behavior = Behavior(Cycle)

  // assert(isFunction(_behavior),
  // `returned 'behavior' must be a function`)

  const behavior = options => _behavior(options, Cycle)

  name = capitalize(name)

  _components[name] = {
    With: behavior,
    make: options => behavior(options)()
  }
}

const get = name => {

  console.log(`get(${name})`)

  return _components[name]
}

const exists = name => Boolean(get(name))

define('Counter', () => () => sources => ({ DOM: sources.onion.state$ }))
define('Transition', WithTransition)
define('View', WithView)
define('Button', WithButton)


const component = pipe(
  path(['has', 0, 'has', 0]),
  when(isString, objOf('kind')),
  over(lensProp('kind'), either(pipe(get, prop('make')), kind => {
    throw new Error(`'${kind}' component is not defined`)
  })),
  over(lensProp('with'), unless(isUndefined, pipe(
    castArray,
    map(pipe(
      castArray,
      over(lensIndex(0), either(pipe(get, prop('With')), kind => {
        throw new Error(`'${kind}' component is not defined`)
      })),
      ([behavior, options]) => {
        return behavior(options)
      }
    )),
    // mapObjIndexed((value, key) => pipe(
    //   get,
    //   prop('With'),
    //   applyTo(value)
    // )(key))
    // either(pipe(get, prop('with')), kind => {
    //   throw new Error(`'${kind}' component is not defined`)
    // })
  )))
)(schema)


const a = component.kind()

const b = map(applyTo(a))(component.with)

console.log('component=', component)