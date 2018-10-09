const Component = require('component')
const { makeBar } = require('components/Bar')
const { ToggleBoldButton } = require('./ToggleBoldButton')
const { ToggleItalicButton } = require('./ToggleItalicButton')
const { ToggleStrikethroughButton } = require('./ToggleStrikethroughButton')
const { ToggleHeadingButton } = require('./ToggleHeadingButton')
const { ToggleUnorderedListButton } = require('./ToggleUnorderedListButton')
const { ToggleOrderedListButton } = require('./ToggleOrderedListButton')
const { ToggleQuoteButton } = require('./ToggleQuoteButton')
const { DrawLinkButton } = require('./DrawLinkButton')
const { DrawImageButton } = require('./DrawImageButton')
const { DrawHorizontalLineButton } = require('./DrawHorizontalLineButton')


const WithEditorToolbar = ({
  View,
  components = [
    ToggleBoldButton.isolated('toggleBoldButton'),
    ToggleItalicButton.isolated('toggleItalicButton'),
    ToggleStrikethroughButton.isolated('toggleStrikethroughButton'),
    ToggleHeadingButton.isolated('toggleHeadingButton'),
    ToggleUnorderedListButton.isolated('toggleUnorderedListButton'),
    ToggleOrderedListButton.isolated('toggleOrderedListButton'),
    ToggleQuoteButton.isolated('toggleQuoteButton'),
    DrawLinkButton.isolated('drawLinkButton'),
    DrawImageButton.isolated('drawImageButton'),
    DrawHorizontalLineButton.isolated('drawHorizontalLineButton')
  ]
} = {}) => {

  return component => Component([
    component,
    makeBar({
      View,
      components
    })
  ])
}

const makeEditorToolbar = options => WithEditorToolbar(options)()

module.exports = {
  default: makeEditorToolbar(),
  makeEditorToolbar,
  WithEditorToolbar
}