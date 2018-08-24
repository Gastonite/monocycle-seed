const { default: $ } = require('xstream')
const { default: makeComponent } = require('monocycle/component')
const { default: beforeOperator } = require('monocycle/operators/before')
const { default: afterOperator } = require('monocycle/operators/after')
const apply = require('ramda/src/apply')
const merge = require('snabbdom-merge/merge-all')
const { div } = require('@cycle/dom')
const listenerOperator = require('./operators/listener')
const isolatedOperator = require('./operators/isolated')
const reducerOperator = require('./operators/reducer')


const mergeViews = apply(merge)

const Component = makeComponent({
  hasKey: 'has',
  // log: console.log.bind(console, '[Monocycle]'),
  // Empty: () => ({ DOM: $.of(void 0) }),
  operators: ({
    before: beforeOperator,
    after: afterOperator,
    isolated: isolatedOperator,
    reducer: reducerOperator,
    listener: listenerOperator
  }),
  Combiners: ({ kind, View = mergeViews, has }) => {
    // console.log('Combiners()', { kind, View, isMerge: View === mergeViews, has })

    return ({
      DOM: streams =>

        $.combine(...streams)
          // .debug('render')
          .map(View)
    })
  }
})

// const Empty = () => ({ DOM: $.of(void 0) })

// Component.Empty = Component(Empty)

module.exports = Component
