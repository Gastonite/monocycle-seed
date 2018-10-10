const { default: $ } = require('xstream')
const { makeComponent, defaultOperators } = require('monocycle/component')
const merge = require('snabbdom-merge/merge-all')
const { WithListener } = require('./operators/listener')
const { Log } = require('utilities/log')
const isolatedOperator = require('./operators/isolated')
const { WithTransition } = require('./operators/transition')


const mergeViews = (views) => merge(...views.filter(Boolean))

const isProduction = process.env.NODE_ENV === "production"

const operators = {
  ...defaultOperators,
  isolated: isolatedOperator,
  transition: WithTransition,
  listener: WithListener
}

const Component = makeComponent({
  hasKey: 'has',
  enforceName: !isProduction,
  fromString: string => {

    const Text = () => ({ DOM: $.of(string) })

    return Text
  },
  log: isProduction ? void 0 : Log('(Cycle)'),
  operators,
  Combiners: ({ View = mergeViews }) => ({
    DOM: streams =>
      $.combine(...streams)
        .map(View)
  })
})

module.exports = Component
