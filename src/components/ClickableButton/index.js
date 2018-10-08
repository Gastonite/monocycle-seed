const {Stream: $ } = require('xstream')
const Cycle = require('component')
const { makeClickable } = require('components/Clickable')
const { WithButton } = require('components/Button')
const Factory = require('utilities/factory')
const __ = require('ramda/src/__')
const merge = require('ramda/src/merge')
// const merge = require('snabbdom-merge')

const WithClickableButton = (options = {}) => {

  const {
    [Cycle.hasKey]: has,
  } = options = Cycle.coerce(options)

  // const classes = { ClickableButton: '',  }

  const ClickableButton = makeClickable({

  })
    .map(WithButton({
      ...options,
      [Cycle.hasKey]: has,
    }))
    // .after(merge(__, {
    //   gna$: $.periodic(1042).debug('gna')
    // }))
    // .listener([
    //   {
    //     from: ({ gna$ }) => gna$,
    //     // from: 'gna$'
    //   }
    // ])

  return component => Cycle([
    component,
    ClickableButton
  ], 'ClickableButton')
}

const makeClickableButton = Factory(WithClickableButton)

module.exports = {
  default: makeClickableButton,
  makeClickableButton,
  WithClickableButton
}