const { Stream: $ } = require('xstream')
const complement = require('ramda/src/complement')
const Component = require('component')
const prop = require("ramda/src/prop")
const dropRepeats = require('xstream/extra/dropRepeats').default
const { div, textarea } = require('@cycle/dom')
const { FromEvent } = require("utilities/fromEvent")
const log = require("utilities/log").Log('Codemirror')
const Codemirror = require("utilities/codemirror")
const Factory = require('utilities/factory')
const { WithTextarea } = require('components/Textarea')

const fromEvent = FromEvent({
  on: 'on',
  off: 'off'
})

const DefaultTextarea = sources => ({
  DOM: $.of(textarea()),
})

const DefaultCodemirrorView = (...args) => div(`.codemirror`, ...args)

const WithCodemirror = ({
  View = DefaultCodemirrorView,
  Textarea = DefaultTextarea,
  // Toolbar = DefaultToolbar,
  ...codemirrorOptions
} = {}) => {

  if (typeof navigator === 'undefined')
    return WithTextarea()

  return component => Component(component)
    .concat(Textarea, { View })
    .before(sources => {

      const codemirror$ = sources.DOM.select('textarea').element()
        .compose(dropRepeats((x, y) => x === y))
        .filter(complement(prop('editor')))
        .map(log.partial('textarea'))
        .map(textarea => textarea.editor = Codemirror.fromTextArea(textarea, {
          mode: 'gfm',
          lineNumbers: true,
          ...codemirrorOptions
        }))
        .compose(sources.Time.debounce(0))
        .map(instance => instance.refresh() || instance)
        .replaceError(err => console.error('Cannot create editor because:', err.stack) || $.of())
        .compose(dropRepeats())
        .remember()

      codemirror$.addListener(x => x)

      return ({
        ...sources,
        codemirror$,
      })
    })
}

const makeCodemirror = Factory(WithCodemirror)

module.exports = {
  default: makeCodemirror,
  makeCodemirror,
  WithCodemirror,
  fromEvent
}
