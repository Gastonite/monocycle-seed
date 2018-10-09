const { Stream: $ } = require('xstream')
const sampleCombine = require('xstream/extra/sampleCombine')
const reverse = require('ramda/src/reverse')
const pipe = require('ramda/src/pipe')
const complement = require('ramda/src/complement')
const Component = require('component')
import prop from "ramda/src/prop"
const Codemirror = require('codemirror')
import "codemirror/addon/edit/continuelist.js"
import "codemirror/addon/display/fullscreen.js"
import "codemirror/mode/markdown/markdown.js"
import "codemirror/addon/mode/overlay.js"
import "codemirror/addon/display/placeholder.js"
import "codemirror/addon/selection/mark-selection.js"
import "codemirror/mode/gfm/gfm.js"
import "codemirror/mode/xml/xml.js"
const debug = require('utilities/debug')
const Logger = require('utilities/logger')
const dropRepeats = require('xstream/extra/dropRepeats').default
const { div, textarea } = require('@cycle/dom')
const { makeCollection } = require('components/Collection')
const { makeField, WithField } = require('components/Field')
const { WithClickable } = require('components/Clickable')
const { makeFieldView } = require('components/Field/view')
const { makeDynamicComponent } = require('components/DynamicComponent')
const { makeDynamicCollection, WithDynamicCollection } = require('components/DynamicCollection')
const Button, { makeDynamicButton } = require('components/Button')
const { WithTextareaField, makeTextareaField } = require('components/TextareaField')
import mapSources from "@sunny-g/cycle-utils/es2015/mapSources"
const EditorView = require('./view')
const DefaultToolbar = require('./Toolbar')


const CSS = require('./style')
const { WithButtonCollection, makeButtonCollection } = require('components/ButtonCollection')
import { FromEvent } from "utilities/fromEvent"
// const buttons = require('./buttons_bak')

export const fromEvent = FromEvent({
  on: 'on',
  off: 'off'
})

// export const DefaultToolbar = makeButtonCollection({
//   // allowedButtons: buttons
// }).transition((state) => [
//   // {
//   //   content: 'yeahhhhhhhhhhhhhhhhhhh'
//   // },
//   'ToggleBoldButton',
//   'ToggleItalicButton',
//   'ToggleStrikethroughButton',
//   'ToggleHeadingButton',
//   'ToggleUnorderedListButton',
//   'ToggleOrderedListButton',
//   'ToggleQuoteButton',
//   'DrawLinkButton',
//   'DrawImageButton',
//   'DrawHorizontalLineButton'
// ])

// const Textarea = () => ({ DOM: $.of(textarea()) })

// export const WithEditorOld = ({
//   kind = 'Editor',
//   codemirrorInstance = Codemirror,
//   Toolbar = DefaultToolbar,
//   defaultToolbar = [
//     // {
//     //   content: 'yeahhhhhhhhhhhhhhhhhhh'
//     // },
//     'ToggleBoldButton',
//     'ToggleItalicButton',
//     'ToggleStrikethroughButton',
//     'ToggleHeadingButton',
//     'ToggleUnorderedListButton',
//     'ToggleOrderedListButton',
//     'ToggleQuoteButton',
//     'DrawLinkButton',
//     'DrawImageButton',
//     'DrawHorizontalLineButton'
//   ],
//   View = EditorView,
//   // Toolbar = pipe(
//   //   WithReducer(() => [
//   //     'ToggleBoldButton',
//   //     'ToggleItalicButton',
//   //     'ToggleStrikethroughButton',
//   //     'ToggleHeadingButton',
//   //     'ToggleUnorderedListButton',
//   //     'ToggleOrderedListButton',
//   //     'ToggleQuoteButton',
//   //     'DrawLinkButton',
//   //     'DrawImageButton',
//   //     'DrawHorizontalLineButton'
//   //   ]),
//   // )(ButtonList),
//   codemirrorOptions = {
//     mode: 'gfm',
//   },
// } = {}) => {

//   const log = Logger(kind)

//   return f => Component(f)

//     // .before(s => console.log('Editor()', s) || s)

//     .map(WithButtonCollection({
//       allowedButtons: buttons,
//     })).transition((state = {}) => state || [
//       // {
//       //   content: 'yeahhhhhhhhhhhhhhhhhhh'
//       // },
//       'ToggleBoldButton',
//       'ToggleItalicButton',
//       'ToggleStrikethroughButton',
//       'ToggleHeadingButton',
//       'ToggleUnorderedListButton',
//       'ToggleOrderedListButton',
//       'ToggleQuoteButton',
//       'DrawLinkButton',
//       'DrawImageButton',
//       'DrawHorizontalLineButton'
//     ])
//     .isolated({
//       onion: 'toolbar',
//       '*': null
//     })
//     // .map(WithButtonCollection({
//     //   allowedButtons: buttons
//     // }))


//     .after((sinks, sources) => {

//       return ({
//         ...sinks,
//         codemirror$: sources.codemirror$,
//         // DOM: sources.onion.state$
//         //   .map(prop('isFocused'))
//         //   .debug('LA.isFocused')
//         //   .map(() => sinks.DOM.take(1))
//         //   .flatten()

//       })
//     })
//     // .concat(Textarea)
//     .concat(Textarea, {
//       DOM: (toolbarView$, fieldView$) =>
//         $.combine(toolbarView$, fieldView$)

//           // .map(([toolbarView, fieldView]) => //toolbarView)
//           .map(([toolbarView, fieldView]) => //fieldView)
//             div([
//               toolbarView,
//               fieldView
//             ])
//             // ({
//             //   ...fieldView,
//             //   children: [
//             //     toolbarView,
//             //     ...fieldView.children
//             //   ]
//             // }))
//           )
//     })


//     .before((sources) => {

//       // const textarea$ = sources.DOM.select('textarea').element()
//       //   .compose(dropRepeats((x, y) => x === y))
//       //   .debug('textarea')
//       //   .remember()

//       // const codemirror$ = sources.DOM.select('textarea').element()
//       //   .compose(dropRepeats((x, y) => x === y))
//       //   .debug('textarea')
//       //   .map(textarea => codemirrorInstance.fromTextArea(textarea, codemirrorOptions))
//       //   .compose(sources.Time.debounce(0))
//       //   .map(instance => instance.refresh() || instance)
//       //   .compose(dropRepeats())
//       //   .map(log(1, 'instance:'))
//       //   .remember()

//       // const change$ = codemirror$
//       //   .map(editor => fromEvent('change', editor))
//       //   .flatten()
//       //   .debug('change')
//       //   .addListener(x => x)

//       // const cursorActivity$ = codemirror$
//       //   .map(editor => fromEvent('cursorActivity', editor))
//       //   .flatten()
//       //   .debug('cursorActivity')

//       // const update$ = codemirror$
//       //   .map(editor => fromEvent('update', editor))
//       //   .flatten()
//       //   .debug('update')
//       //   .addListener(x => x)

//       // const scroll$ = codemirror$
//       //   .map(editor => fromEvent('scroll', editor))
//       //   .flatten()
//       //   .debug('scroll')
//       //   .addListener(x => x)

//       // const toolbar = Toolbar({
//       //   ...sources,
//       //   codemirror$
//       // })

//       return {
//         ...sources,
//         codemirror$: sources.DOM.select('textarea').element()
//           // .take(1)
//           .compose(dropRepeats((x, y) =>
//             x === y
//           ))
//           .filter(complement(prop('editor')))
//           .map(textarea => console.log('biip.textarea', { editor: textarea.editor }) || textarea)
//           .map(textarea => textarea.editor = codemirrorInstance.fromTextArea(textarea, codemirrorOptions))
//           .compose(sources.Time.debounce(0))

//           .map(editor => editor.setOption("theme", 'darcula') || editor)
//           .map(instance => instance.refresh() || instance)
//           .compose(dropRepeats())
//           .debug('instance')
//           // .map(log(1, 'instance:'))
//           .remember()
//       }
//     })

//     .transition((state = {}) => ({
//       toolbar: defaultToolbar,
//       kind,
//       ...state,
//       // toolbar: [
//       //   // {
//       //   //   content: 'yeahhhhhhhhhhhhhhhhhhh'
//       //   // },
//       //   'ToggleBoldButton',
//       //   'ToggleItalicButton',
//       //   // 'ToggleStrikethroughButton',
//       //   // 'ToggleHeadingButton',
//       //   // 'ToggleUnorderedListButton',
//       //   // 'ToggleOrderedListButton',
//       //   // 'ToggleQuoteButton',
//       //   // 'DrawLinkButton',
//       //   // 'DrawImageButton',
//       //   // 'DrawHorizontalLineButton'
//       // ],
//       isEditor: true
//     }))
//   // .isolated({
//   //   DOM: 'editor',
//   //   '*': null
//   // })

//   // .after((sinks, sources) => {

//   //   console.log('LA', sinks)

//   //   return {
//   //     ...sinks,
//   //     DOM: sinks.DOM
//   //       .compose(sampleCombine(sinks.fieldState$))
//   //       .map(([{ children: [toolbar, field] }, { isFocused } = {}]) => {

//   //         console.error('EditorView()', { toolbar, field })

//   //         return div([

//   //           {
//   //             ...toolbar,
//   //             data: {
//   //               ...toolbar.data,
//   //               class: {
//   //                 ...toolbar.data.class,
//   //                 [CSS.toolbar]: true,
//   //                 [CSS.toolbarFocused]: isFocused
//   //               }
//   //             }
//   //           },
//   //           field
//   //           // debug(fieldState)!isFocused ? void 0 : toolbar
//   //         ])
//   //       })
//   //   }
//   // })

//   // .concat(() => ({ DOM: $.of(View()) }))

// }



const DefaultTextarea = sources => ({
  DOM: $.of(textarea()),
})
export const WithEditor = ({
  Textarea = DefaultTextarea,
  Toolbar = DefaultToolbar,
  codemirrorOptions = {
    mode: 'gfm',
  },
} = {}) => {



  return component => Component(component)
    .concat(Toolbar
      .isolated('toolbar')
      .concat(Textarea, { View: div })
      .after(({ /* buttonState$, click$, isTypeActive$,  */...sinks }, sources) => ({
        ...sinks,
        editor$: sources.codemirror$
      }))
      .before(sources => ({
        ...sources,
        codemirror$: sources.DOM.select('textarea').element()
          .compose(dropRepeats((x, y) => x === y))
          .filter(complement(prop('editor')))
          .map(textarea => console.log('biip.textarea', { editor: textarea.editor }) || textarea)
          .map(textarea => textarea.editor = Codemirror.fromTextArea(textarea, codemirrorOptions))
          .replaceError(err => console.error('errorrrrrr', err))
          .compose(sources.Time.debounce(0))
          .map(editor => editor.setOption("theme", 'darcula') || editor)
          .map(instance => instance.refresh() || instance)
          .compose(dropRepeats())
          .remember()
      })))
}

export const makeEditor = options => WithEditor(options)()

export default makeEditor()
  // .before(s => console.log('s:', s) || s)


  // .concat(Textarea, { View: pipe(reverse, div) })


// export default Component()
//   .concat(
//     makeButtonCollection({
//       allowedKinds: buttons,
//     })
//       .transition((state = []) => [
//         // {
//         //   content: 'yeahhhhhhhhhhhhhhhhhhh'
//         // },
//         'ToggleBoldButton',
//         'ToggleItalicButton',
//         // // 'ToggleStrikethroughButton',
//         // 'ToggleHeadingButton',
//         // // 'ToggleUnorderedListButton',
//         // 'ToggleOrderedListButton',
//         // // 'ToggleQuoteButton',
//         // 'DrawLinkButton',
//         // 'DrawImageButton',
//         // 'DrawHorizontalLineButton'
//       ])
//       .isolated({
//         onion: 'toolbar', '*': null
//       })
//   )
//   .transition((state = []) => ({
//     ...state
//   }))
