const { cssRaw, cssRule, stylesheet } = require('typestyle')
const codemirrorStyle = require('codemirror/lib/codemirror.css')

cssRaw(codemirrorStyle)

// cssRule('.CodeMirror', {
//   // border: '1px solid #eee',
//   height: 'initial'
// })

// cssRule('.CodeMirror-scroll', {
//   height: 'auto',
//   overflowY: 'hidden',
//   overflowX: 'auto',
// })