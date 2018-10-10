const Cycle = require('component')
const prop = require('ramda/src/prop')
const always = require("ramda/src/always")
const { WithButton } = require("components/Button")
const { makeButtonView } = require("components/DumbButton/view")
const { style } = require("typestyle")
const isString = require("lodash/isString")
const pipe = require("ramda/src/pipe")
const when = require("ramda/src/when")
const objOf = require("ramda/src/objOf")
const SvgIconView = require('components/SvgIcon/view').default
const { makeSvgIcon } = require('components/SvgIcon')
const { makeButton } = require('components/Button')
const Factory = require('utilities/factory')


const parseOptions = pipe(
  when(isString, objOf('icon')),
  Cycle.coerce
)
const WithIconButton = (options = {}) => {

  const {
    icon,
    classes,
    [Cycle.hasKey]: has,
    ...buttonOptions
  } = parseOptions(options)

  return f => Cycle(f)
    .map(WithButton({
      classes,
      has: makeSvgIcon({
        ...buttonOptions,
        classes,
        [Cycle.hasKey]: has
      })
    }))
}

const makeIconButton = Factory(WithIconButton)

module.exports = {
  default: makeIconButton,
  makeIconButton,
  WithIconButton
}