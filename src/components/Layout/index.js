const Cycle = require('component')
const { WithView } = require('components/View')
const pipe = require('ramda/src/pipe')
const when = require('ramda/src/when')
const unless = require('ramda/src/unless')
const identical = require('ramda/src/identical')
const defaultTo = require('ramda/src/defaultTo')
const always = require('ramda/src/always')
const over = require('ramda/src/over')
const lensProp = require('ramda/src/lensProp')
const concat = require('ramda/src/concat')
const Factory = require('utilities/factory')
const { rem } = require('csx/lib/units')
const isBoolean = require('lodash/isBoolean')
const isString = require('lodash/isString')

const WithLayout = (options = {}) => {

  const {
    sel = '',
    direction,
    fill,
    spaced,
    gutter,
    adapt,
    has,
    ...viewOptions
  } = options = parseOptions(options)

  const classes = { Layout: 'Layout', ...options.classes }

  Cycle.log('WithLayout()', { sel, spaced, adapt })

  return WithView({
    sel: concat(sel, `.${classes.Layout}`),
    ...viewOptions,
    class: {
      ...(viewOptions.class || {}),
      col: ['col', 'column', 'vertical'].includes(direction),
      fill,
      spaced,
      noAdapt: adapt === false,
    },
    style: {
      ...(viewOptions.style || {}),
      padding: rem(+gutter)
    },
    has 
  })
}

const parseOptions = pipe(
  Cycle.coerce,
  over(lensProp('gutter'), pipe(
    defaultTo(true),
    when(isBoolean, when(Boolean, always(2)))
  )),
  over(lensProp('direction'), pipe(
    defaultTo('row'),
    unless(identical('row'), always('column'))
  )),
  over(lensProp('spaced'), pipe(
    defaultTo(false),
    Boolean
  )),
  // over(lensProp('adapt'), pipe(
  //   defaultTo(false),
  //   Boolean
  // )),
  over(lensProp('fill'), pipe(
    defaultTo(false),
    Boolean
  )),
  over(lensProp('sel'), pipe(
    unless(isString, always(''))
  )),
)


const makeLayout = Factory(WithLayout)

module.exports = {
  default: makeLayout,
  makeLayout,
  WithLayout
}