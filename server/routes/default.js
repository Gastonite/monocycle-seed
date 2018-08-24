const { default: $ } = require('xstream')
const { run } = require('@cycle/run')
const { makeWebPage } = require('components/WebPage')
const { makeApp } = require('components/App')
// const { makeServerHistoryDriver } = require('@cycle/history')
const Classes = require('style')
const { getStyles } = require('typestyle')
const Drivers = require('../drivers')




module.exports = ({
  exceptions = []
} = {}) => {

  const classes = Classes()
  const css = getStyles()
  const App = makeApp({
    classes
  })

  return ({
    method: 'GET',
    path: '/{path*}',
    handler: ({ url, params: { path } }, h) => {

      if (exceptions.includes(path))
        return h.file(path)

      return new Promise((resolve, reject) => {

        const dispose = run(
          makeWebPage({
            Content: App,
            css,
            classes
          }),
          Drivers({
            path,
            render: html => {
              dispose()
              // console.error('RENDER', { path, html })
              resolve(
                h.response(`<!doctype html>${html}`).header('Content-Type', 'text/html')
              )
            }
          }),
          // {
          //   DOM: makeHTMLDriver(html => {
          //     dispose()
          //     // console.error('RENDER', { path, html })
          //     resolve(
          //       h.response(`<!doctype html>${html}`).header('Content-Type', 'text/html')
          //     )
          //   }),
          //   // History: makeServerHistoryDriver({
          //   //   initialEntries: [`/${path}`],
          //   //   initialIndex: 0
          //   // }),
          //   History: HistoryDriver({
          //     initialEntries: [`/${path}`],
          //     initialIndex: 0
          //   }),
          //   // History: () => $.of({ pathname: `/${path}` }),
          //   Time: timeDriver,
          //   onion: StateDriver(),
          // }
        )
      })
    }
  })
}