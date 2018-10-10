const { Stream: $ } = require('xstream')
const Cycle = require('component')
const dropRepeats = require('xstream/extra/dropRepeats').default
const Factory = require('utilities/factory')


const WithFocusable = (options = {}) => {

  const {
    key = 'isFocused',
    getFocusEvent$ = (sinks, sources) => sources.DOM.events('focus'),
    getBlurEvent$ = (sinks, sources) => sources.DOM.events('blur')
  } = options

  return component => {

    return Cycle(component)

      .after((sinks, sources) => ({
        ...sinks,
        setFocused$: sinks.setFocused$ || $.merge(
          getFocusEvent$(sinks, sources).mapTo(true),
          getBlurEvent$(sinks, sources).mapTo(false),
        ).startWith(false)
          .compose(dropRepeats())
      }))

      .transition({
        name: 'setFocused',
        from: (sinks) => sinks.setFocused$
          .map(Boolean),
        reducer: isFocused => (state = {}) => ({
          ...state,
          [key]: isFocused,
          isFocusable: true
        })
      })
  }
}

const makeFocusable = Factory(WithFocusable)

module.exports = {
  default: makeFocusable,
  makeFocusable,
  WithFocusable
}