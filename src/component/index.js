const { default: $ } = require('xstream')
const { makeComponent, defaultOperators } = require('monocycle/component')
const merge = require('snabbdom-merge/merge-all')
const listenerOperator = require('./operators/listener')
const { Log } = require('utilities/log')
const isolatedOperator = require('./operators/isolated')
const reducerOperator = require('./operators/reducer')


const mergeViews = (views) => merge(...views.filter(Boolean))

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
  enforceName: !isProduction,
  fromString: string => {

    const Text = sources => ({ DOM: $.of(string) })

    return Text
  },
  log: isProduction ? void 0 : log,
  operators,
  Combiners: ({ kind, View = mergeViews, has }) => ({
    DOM: streams =>
      $.combine(...streams)
        .map(View)
  })
})

module.exports = Component
