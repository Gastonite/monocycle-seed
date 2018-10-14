const Cycle = require('component')
const { makeBar } = require('components/Bar')
const { makeBoldButton } = require('./BoldButton')
const { makeItalicButton } = require('./ItalicButton')
const { makeStrikethroughButton } = require('./StrikethroughButton')
const { makeHeadingButton } = require('./HeadingButton')
const { makeUnorderedListButton } = require('./UnorderedListButton')
const { makeOrderedListButton } = require('./OrderedListButton')
const { makeQuoteButton } = require('./QuoteButton')
const { makeDrawLinkButton } = require('./DrawLinkButton')
const { DebugState } = require('components/Debug')
const { makeDrawImageButton } = require('./DrawImageButton')
const { makeDrawHorizontalLineButton } = require('./DrawHorizontalLineButton')
const { WithBar } = require('components/Bar')

const WithEditorToolbar = ({
  classes = {}
} = {} = {}) => {

  return WithBar({
    classes,
    noAdapt: true,
    has: [
      // DebugState,
      makeBoldButton({ classes }).isolated('boldButton'),
      makeItalicButton({ classes }).isolated('italicButton'),
      makeStrikethroughButton({ classes }).isolated('strikethroughButton'),
      makeHeadingButton({ classes }).isolated('headingButton'),
      makeUnorderedListButton({ classes }).isolated('unorderedListButton'),
      makeOrderedListButton({ classes }).isolated('orderedListButton'),
      makeQuoteButton({ classes }).isolated('quoteButton'),
      makeDrawLinkButton({ classes }).isolated('drawLinkButton'),
      makeDrawImageButton({ classes }).isolated('drawImageButton'),
      makeDrawHorizontalLineButton({ classes }).isolated('drawHorizontalLineButton')
    ]
  })
}

const makeEditorToolbar = options => WithEditorToolbar(options)()

module.exports = {
  default: makeEditorToolbar,
  makeEditorToolbar,
  WithEditorToolbar
}