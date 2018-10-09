const { Stream: $ } = require('xstream')
var fs = require('fs');
var headingIcon = fs.readFileSync(require.resolve('font-awesome-svg-png/black/svg/header.svg'), 'utf8');

const { WithClickable } = require('components/Clickable')
const range = require('ramda/src/range')
import { WithSetReducer } from "../SetReducer"
import { WithTypeWatcher, hasTokenType } from "../TypeWatcher"
const { makeIconButton } = require('components/IconButton')

const ToggleHeadingButton = makeIconButton(headingIcon)
  .map(WithClickable())
  .map(WithTypeWatcher({
    type: 'header',
    to: 'isTypeActive$'
  }))

  .map(WithSetReducer({ key: 'active', from: 'isTypeActive$' }))

  .listener({
    kind: 'EditorHeadingToggler',
    from: (sinks, { codemirror$ = $.empty() }) => codemirror$
      .map(editor => {

        return sinks.click$.debug('ToggleHeading.click').map(event => {

          const startPoint = editor.getCursor("start")
          const endPoint = editor.getCursor("end")

          range(startPoint.line, endPoint.line + 1).forEach(i => {

            let line = editor.getLine(i)
            const currHeadingLevel = line.search(/[^#]/)

            editor.replaceRange(
              currHeadingLevel >= 6
                ? line.substr(currHeadingLevel + 1)
                : `#${currHeadingLevel <= 0 ? ' ' : ''}` + line,
              { line: i, ch: 0 },
              { line: i, ch: line.length + 0 }
            )
          })

          editor.focus()
        })
      })
      .flatten()
  })


module.exports = {
  default: ToggleHeadingButton,
  ToggleHeadingButton,
}