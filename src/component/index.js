const { default: $ } = require('xstream')
const { makeComponent, defaultOperators } = require('monocycle/component')
const apply = require('ramda/src/apply')
const merge = require('snabbdom-merge/merge-all')
const listenerOperator = require('./operators/listener')
const { Log } = require('utilities/log')
const isolatedOperator = require('./operators/isolated')
const reducerOperator = require('./operators/reducer')
const mergeViews = apply(merge)

const isProduction = process.env.NODE_ENV === "production"

const operators = {
  ...defaultOperators,
  isolated: isolatedOperator,
  reducer: reducerOperator,
  listener: listenerOperator
}

const log = Log('[Monocycle]')

const Component = makeComponent({
  hasKey: 'has',
  strict: !isProduction,
  log: isProduction ? void 0 : log,
  operators,
  Combiners: ({ kind, View = mergeViews, has }) => ({
    DOM: streams =>
      $.combine(...streams)
        .map(View)
  })
})

module.exports = Component
