const { html, head, style, title, body, div, script } = require('@cycle/dom')
const { default: $ } = require('xstream')

const makeWebPage = ({ classes, css, Content }) => {

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
                title('Isomorphic example'),
                css && style(css)
              ]),
              body([
                div(`.${classes.App}`, contentView),
                script(`window.app = ${JSON.stringify({
                  classes
                })}`),
                script({ attrs: { src: 'bundle.js' } }),
              ])
            ])
          )
        })
        // .last()
        .compose(sources.Time.debounce(200))
        // .last()
    }
  }

  return WebPage
}

module.exports = {
  makeWebPage
}