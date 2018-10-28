const Cycle = require('component')
const { WithButton } = require("components/Button")
const isString = require("lodash/isString")
const pipe = require("ramda/src/pipe")
const when = require("ramda/src/when")
const objOf = require("ramda/src/objOf")
const { makeSvgIcon } = require('components/SvgIcon')
const Factory = require('utilities/factory')
const log = require('utilities/log').Log('IconButton')


const parseOptions = pipe(
  // when(isString, objOf('icon')),
  log.partial(1),

  Cycle.coerce
)
const WithIconButton = (options = {}) => {

  const {
    classes,
    has,
    ...buttonOptions
  } = parseOptions(options)

  Cycle.log('WithIconButton()', { has })

  return f => Cycle(f)
    .map(WithButton({
      ...buttonOptions,
      classes,
      has: makeSvgIcon({
        classes,
        has 
      })
    }))
}

const makeIconButton = Factory(WithIconButton)

module.exports = {
  default: makeIconButton,
  makeIconButton,
  WithIconButton
}