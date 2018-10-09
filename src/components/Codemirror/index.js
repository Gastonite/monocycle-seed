const { Stream: $ } = require('xstream')
const complement = require('ramda/src/complement')
const Component = require('component')
const prop = require("ramda/src/prop")
const Codemirror = require('codemirror')
require("codemirror/addon/edit/continuelist.js")
require("codemirror/addon/display/fullscreen.js")
require("codemirror/mode/markdown/markdown.js")
require("codemirror/addon/mode/overlay.js")
require("codemirror/addon/display/placeholder.js")
require("codemirror/addon/selection/mark-selection.js")
require("codemirror/mode/gfm/gfm.js")
require("codemirror/mode/xml/xml.js")
const dropRepeats = require('xstream/extra/dropRepeats').default
const { div, textarea } = require('@cycle/dom')
const { FromEvent } = require("utilities/fromEvent")

export const fromEvent = FromEvent({
  on: 'on',
  off: 'off'
})

const DefaultTextarea = sources => ({
  DOM: $.of(textarea()),
})
const DefaultCodemirrorView = (...args) => div(`.codemirror`, ...args)

export const WithCodemirror = ({
  View = DefaultCodemirrorView,
  Textarea = DefaultTextarea,
  // Toolbar = DefaultToolbar,
  ...codemirrorOptions,
} = {}) => {

  return component => Component(component)
    .concat(Textarea, { View })
    .before(sources => {

      const codemirror$ = sources.DOM.select('textarea').element()
        .compose(dropRepeats((x, y) => x === y))
        .filter(complement(prop('editor')))
        .map(textarea => console.log('biip.textarea', { editor: textarea.editor }) || textarea)
        .map(textarea => textarea.editor = Codemirror.fromTextArea(textarea, {
          mode: 'gfm',
          lineNumbers: true,
          theme: 'darcula',
          ...codemirrorOptions
        }))
        .replaceError(err => console.error('Cannot instanciate Codemirror editor', err))
        .compose(sources.Time.debounce(0))
        .map(instance => instance.refresh() || instance)
        .compose(dropRepeats())
        .remember()

      codemirror$.addListener(x => x)

      return ({
        ...sources,
        codemirror$,
      })
    })
}

export const makeCodemirror = options => WithCodemirror(options)()

export default makeCodemirror
