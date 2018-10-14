const Cycle = require('component')
const pipe = require('ramda/src/pipe')
const when = require('ramda/src/when')
const unless = require('ramda/src/unless')
const objOf = require('ramda/src/objOf')
const always = require('ramda/src/always')
const over = require('ramda/src/over')
const concat = require('ramda/src/concat')
const lensProp = require('ramda/src/lensProp')
const isUndefined = require('lodash/isUndefined')
const isPlainObject = require('lodash/isPlainObject')
const { makeView } = require('components/View')
const Factory = require('utilities/factory')
const log = require('utilities/log').Log('SvgIcon')

const parseOptions = pipe(
  Cycle.coerce,
  unless(isPlainObject, objOf(Cycle.hasKey)),
  over(lensProp(Cycle.hasKey), when(isUndefined, always(`I'm an empty SvgIcon`)))
)

const WithSvgIcon = (options = {}) => {

  const {
    kind = '',
    [Cycle.hasKey]: has,
  } = options = parseOptions(options)

  const classes = { SvgIcon: 'SvgIcon', ...options.classes }

  Cycle.log('WithSvgIcon()', { has })
  
  const SvgIcon = Cycle([
    makeView({
      kind: concat('i.', classes.SvgIcon, kind),
      props: {
        innerHTML: has
      }
    })
  ], 'SvgIcon')

  return f => Cycle([f, SvgIcon])
}

const makeSvgIcon = Factory(WithSvgIcon)

module.exports = {
  default: makeSvgIcon,
  makeSvgIcon,
  WithSvgIcon
}