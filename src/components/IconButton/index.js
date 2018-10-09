const Cycle = require('component')
const pipe = require("ramda/src/pipe")
const prop = require('ramda/src/prop')
const always = require("ramda/src/always")
const { WithButton } = require("components/Button")
const { makeButtonView } = require("components/Button/view")
const { style } = require("typestyle")
const isString = require("lodash/isString")
const SvgIconView = require('components/SvgIcon/view').default
const { padding } = require('csstips/lib')

export const WithIconButton = (options = {}) => {

  const {
    icon
  } = isString(options)
      ? { icon: options }
      : options

  const renderContent = icon
    ? always(SvgIconView(icon))
    : pipe(prop('content'), SvgIconView)

  return f => Cycle(f, 'IconButton')
    .map(WithButton({
      style: {
        Button: style(padding(0))
      },
      View: makeButtonView({
        renderContent
      })
    }))
}

export const makeIconButton = options => WithIconButton(options)()

export default makeIconButton()