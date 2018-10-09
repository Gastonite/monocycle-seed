const { cssRaw, cssRule, stylesheet, style } = require('typestyle')
const codemirrorStyle = require('codemirror/lib/codemirror.css')
const { newLayer, layerParent } = require('csstips')
const { important, px } = require('csx/lib')

// cssRaw(codemirrorStyle)

// cssRule('.CodeMirror', {

// })

// cssRule('.CodeMirror-cursor', {
//   width: important(px(1))
// })
// cssRule('.CodeMirror-scroll', {
//   height: 'auto',
//   overflowY: 'hidden',
//   overflowX: 'auto',
// })

// cssRaw(`
// .cm-s-darcula span.cm-meta { color: #BBB529; }
// .cm-s-darcula span.cm-number { color: #6897BB; }
// .cm-s-darcula span.cm-keyword { line-height: 1em; font-weight: bold; color: #CC7832; }
// .cm-s-darcula span.cm-def { color: #FFC66D; }
// .cm-s-darcula span.cm-variable { color: #A9B7C6; }
// .cm-s-darcula span.cm-variable-2 { color: #A9B7C6; }
// .cm-s-darcula span.cm-variable-3, .cm-s-darcula span.cm-type { color: #A9B7C6; }
// .cm-s-darcula span.cm-property { color: #A9B7C6; }
// .cm-s-darcula span.cm-operator { color: #A9B7C6; }
// .cm-s-darcula span.cm-string { color: #6A8759; }
// .cm-s-darcula span.cm-string-2 { color: #6A8759; }
// .cm-s-darcula span.cm-comment { color: #808080; }
// .cm-s-darcula span.cm-link { color: #287BDE; }
// .cm-s-darcula span.cm-atom { font-weight: bold; color: #CC7832; }
// .cm-s-darcula span.cm-error { color: #BC3F3C; }
// .cm-s-darcula span.cm-tag { color: #CC7832; }
// .cm-s-darcula span.cm-attribute { color: #6A8759; }
// .cm-s-darcula span.cm-qualifier { color: #6A8759; }
// .cm-s-darcula span.cm-bracket { color: #A9B7C6; }
// .cm-s-darcula.CodeMirror { background: #2B2B2B; color: #A9B7C6; }


// .cm-s-darcula .CodeMirror-cursor { border-left: 1px solid #dddddd; }
// .cm-s-darcula .CodeMirror-activeline-background { background: #3A3A3A; }
// .cm-s-darcula div.CodeMirror-selected { background: #085a9c; }
// .cm-s-darcula .CodeMirror-gutters { background: rgb(72, 72, 72); border-right: 1px solid grey; color: #606366 }

// .cm-s-darcula span.cm-builtin { color: #A9B7C6; }
// .cm-s-darcula  { font-family: Consolas, Menlo, Monaco, Lucida Console, Liberation Mono, DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace, serif;}
// .cm-s-darcula .CodeMirror-matchingbracket { outline:1px solid #A9B7C6; color: yellow !important; }

// .CodeMirror-hints.darcula {
//   font-family: Menlo, Monaco, Consolas, 'Courier New', monospace;
//   color: #9c9e9e;
//   background-color: #3b3e3f !important;
// }

// .CodeMirror-hints.darcula .CodeMirror-hint-active {
//   background-color: #494d4e !important;
//   color: #9c9e9e !important;
// }
// `)


// export default stylesheet({
//   toolbar: {
//     height: 0,
//     overflow: 'hidden',
//     transition: '.2s height'
//   },
//   toolbarFocused: {
//     height: '64px'

//   }
// })

export default {
  Editor: style(
    layerParent,
    {
      $debugName: 'Editor',
      '& > .CodeMirror': {
        '& > .CodeMirror-scroll': {
          height: 'auto',
          overflowY: 'hidden',
          overflowX: 'auto',
        },
        height: '100%',
        border: 'none',
        background: 'transparent',
        height: 'initial'
      }
      // height: 0,
      // overflow: 'hidden',
      // transition: '.2s height'
    }
  )
}