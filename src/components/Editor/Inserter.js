const { Stream: $ } = require('xstream')
const { WithClickable } = require('components/Clickable')
const Component = require('component')

export const WithInserter = ({
  type,
  delimiter,
  pattern
} = {}) => {

  return f => Component(f)
    .map(WithClickable())
    .listener({
      kind: 'EditorInserter',
      from: (sinks, { codemirror$ = $.of({}) }) =>
        sinks.click$
          .mapTo(codemirror$)
          .flatten()
          .map(editor => {

            editor.replaceSelection(delimiter, 'end')
            editor.focus()
          })
          .replaceError(err => console.error(err) || Stream.never())
    })
}

export const makeInserter = options => WithInserter(options)()

export default makeInserter
