const { Stream: $ } = require('xstream')
const Cycle = require('component')
const { WithCodemirror } = require('components/Codemirror')
const { div, textarea } = require('@cycle/dom')
const DefaultToolbar = require('./Toolbar').default
const { FromEvent } = require("utilities/fromEvent")
const style = require('style')
const isObject = require('lodash/isObject')
const isFunction = require('lodash/isFunction')



export const fromEvent = FromEvent({
  on: 'on',
  off: 'off'
})

const DefaultTextarea = sources => ({
  DOM: $.of(textarea()),
})


// const parseOptions = pipe(

// )

const DefaultEditorView = (...args) => div(`.${style.Editor}`, ...args)

export const WithEditor = ({
  // View = div.bind(void 0, `.editor`),
  components,
  View = DefaultEditorView,
  ...codemirrorOptions,

} = {}) => {

  components = {
    Toolbar: DefaultToolbar,
    ...(isObject(components) ? components : {})
  }

  if (!isFunction(components.Toolbar))
    throw new Error(`'components.Toolbar' must be a function`)

  return component => Cycle(component)
    .concat(components.Toolbar)
    .after((sinks, sources) => ({
      ...sinks,
      codemirror$: /* console.log('ggg mmm', { sinks, sources }) ||  */sources.codemirror$
    }))
    
    .map(WithCodemirror({
      lineNumbers: false,
      Textarea: components.Textarea,
      ...codemirrorOptions,
      View,
    }))

    // .isolated({
    //   DOM: 'Editor',
    //   '*': null
    // })
    // .transition((state = {}) => ({
    //   ...state,
    //   isEditor: true,
    // }))

  // .concat(Toolbar
  //   .isolated('toolbar')
  //   .concat(Textarea, { View })
  //   .after((sinks, sources) => ({
  //     ...sinks,
  //     editor$: sources.codemirror$
  //   }))
  //   // .before(sources => ({
  //   //   ...sources,
  //   //   codemirror$: sources.DOM.select('textarea').element()
  //   //     .compose(dropRepeats((x, y) => x === y))
  //   //     .filter(complement(prop('editor')))
  //   //     .map(textarea => console.log('biip.textarea', { editor: textarea.editor }) || textarea)
  //   //     .map(textarea => textarea.editor = Codemirror.fromTextArea(textarea, codemirrorOptions))
  //   //     .replaceError(err => console.error('Cannot instanciate Codemirror editor', err))
  //   //     .compose(sources.Time.debounce(0))
  //   //     .map(editor => editor.setOption("theme", 'darcula') || editor)
  //   //     .map(instance => instance.refresh() || instance)
  //   //     .compose(dropRepeats())
  //   //     .remember()
  //   // }))
  // )
}

export const makeEditor = options => WithEditor(options)()

export default {
  default: makeEditor,
  makeEditor,
  WithEditor
}
// export default makeCodemirror({
//   View: div.bind(void 0, `.editor`),
// })

