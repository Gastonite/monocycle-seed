const { base, html, head, style, title: TitleView, body, div, script } = require('@cycle/dom')
const { default: $ } = require('xstream')

const makeWebPage = ({
  title = 'Example',
  classes,
  css,
  Content
} = {}) => {

  const WebPage = sources => {

    const contentView$ = Content(sources).DOM
    const contentReducer$ = Content(sources).onion

    // const css = getStyles()const { getStyles } = require('typestyle')

    return {
      onion: contentReducer$.take(5),
      DOM: $.combine(contentView$)
        .map(([contentView, context]) => {

          return (
            html([
              head([
                TitleView(title),
                base({ attrs: { href: '/' } }),
                css && style(css)
              ]),
              body([
                div(`.root`, contentView),
                script(`window.app = ${JSON.stringify({
                  classes
                })}`),
                script({ attrs: { src: 'bundle.js' } }),
              ])
            ])
          )
        })
        .compose(sources.Time.debounce(200))
    }
  }

  return WebPage
}

module.exports = {
  makeWebPage
}