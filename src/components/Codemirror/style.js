const { cssRaw, cssRule, stylesheet } = require('typestyle')

var fs = require('fs');
var codemirrorStyle = fs.readFileSync(require.resolve('codemirror/lib/codemirror.css'), 'utf8');


// cssRule('.CodeMirror', {
//   // border: '1px solid #eee',
//   height: 'initial'
// })

// cssRule('.CodeMirror-scroll', {
//   height: 'auto',
//   overflowY: 'hidden',
//   overflowX: 'auto',
// })


const CodemirrorStyle = () => {

  cssRaw(codemirrorStyle)
}

module.exports = {
  default: CodemirrorStyle
}