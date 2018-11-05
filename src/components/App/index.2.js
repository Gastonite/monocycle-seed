const { Stream: $ } = require('xstream')
const { mergeSinks } = require('cyclejs-utils')
const { div } = require('@cycle/dom')
const isString = require('lodash/isString')
const when = require('ramda/src/when')
const identical = require('ramda/src/identical')
const prop = require('ramda/src/prop')
const filter = require('ramda/src/filter')
const unless = require('ramda/src/unless')
const apply = require('ramda/src/apply')
const both = require('ramda/src/both')
const pipe = require('ramda/src/pipe')
const lensProp = require('ramda/src/lensProp')
const over = require('ramda/src/over')
const always = require('ramda/src/always')
const ifElse = require('ramda/src/ifElse')
const lt = require('ramda/src/lt')
const isEmpty = require('ramda/src/isEmpty')
const ensureArray = require('ramda-adjunct/lib/ensureArray').default
const isPlainObj = require('ramda-adjunct/lib/isPlainObj').default
const objOf = require('ramda/src/objOf')
const applyTo = require('ramda/src/applyTo')
const map = require('ramda/src/map')
const isFunction = require('lodash/isFunction')
const complement = require('ramda/src/complement')
const { Empty } = require('monocycle/empty')
const log = require('monocycle/utilities/log').Log('app').partial
const mergeVnodes = require('snabbdom-merge/merge-all')

const mergeViews = pipe(
  ensureArray,
  filter(Boolean),
  apply(mergeVnodes),
)

const fromString = string => {

  const Text = () => ({ DOM: $.of(string) })

  return Text
}

const Combiners = pipe(
  prop('View'),
  unless(isFunction, always(mergeViews)),
  map,
  render => pipe(
    ensureArray,
    apply($.combine),
    render
  ),
  objOf('DOM')
)

const coerce = pipe(
  unless(isPlainObj, objOf('has')),
  over(lensProp('has'), pipe(ensureArray, filter(Boolean))),
)

const makeComposite = pipe(
  log('makeComposite'),
  Combiners,
  log('makeComposite1'),
  combiners => {

    return components => {

      const composite = sources => mergeSinks(
        components.map(applyTo(sources)),
        combiners
      )

      return composite
    }
  },
)

const makeComponent = Composite => pipe(
  log('makeComponent'),

  coerce,
  prop('has'),
  ensureArray,
  map(when(isString, fromString)),
  filter(both(isFunction, complement(identical(EmptyComponent)))),
  map(_component => {

    const map = f => Component(f(component))
    console.log('Component()', component.name)

    const component = sources => {
      console.log('proxy')
      return _component(sources)
    }

    return Object.assign(component, {
      isComponent: true,
      map
    })
  }),
  ifElse(
    isEmpty,
    always(EmptyComponent),
    ifElse(
      pipe(prop('length'), lt(1)),
      Composite,
      prop(0)
    )
  )
)

const Component = (options) => {

  const Composite = makeComposite(options)

  console.log('yo', Composite)
  const component = makeComponent(Composite)

  return component
}

// const Empty = () => ({})

const EmptyComponent = Component(Empty)


module.exports = {
  default: ({ classes }) => {

    const Show42 = sources => {
      console.log('Show42()')
      return {
        DOM: $.of(div('.test42', ['42']))
      }
    }

    const Show43 = sources => {
      console.log('Show43()')
      return {
        DOM: $.of(div('.test43', ['43']))
      }
    }

    const withAddOne = component => {

      return sources => {

        const sinks = component(sources)

        return {
          ...sinks,
          DOM: sinks.DOM.debug('tttt').map(view => ({
            ...view,
            children: [
              { text: +view.children[0].text + 1 + '' }
            ]
          }))
        }
      }
    }

    // return Component(Show42)
    return Component({
      // View: div,
      has: [
        Show42,
        // 'yo', 
        Show43
      ]
    })
  }
}

