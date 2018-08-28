
const Classes = require('style')
const { getStyles } = require('typestyle')
const { makeWebPage } = require('../components/WebPage')
const { makeApp } = require('components/App')
const Ms = require('ms')
const Drivers = require('../drivers')
const { run } = require('@cycle/run')

module.exports = ({
  exceptions = [],
  declareMethod
} = {}) => {

  const classes = Classes({
    debug: process.env.NODE_ENV !== 'production'
  })

  const WebPage = makeWebPage({
    Content: makeApp({
      classes
    }),
    css: getStyles(),
    classes
  })

  const renderWebPage = path => {

    return new Promise((resolve, reject) => {
      const dispose = run(
        WebPage,
        Drivers({
          path,
          render: html => {
            dispose()
            // console.error('RENDER', { path, html })
            resolve(`<!doctype html>${html}`)
          }
        })
      )
    })
  }

  declareMethod('renderWebPage', renderWebPage, {
    cache: {
      expiresIn: Ms('1 year'),
      generateTimeout: 2000
    }
  })

  return ({
    method: 'GET',
    path: '/{path*}',
    options: {
      cache: {
        privacy: 'private',
        expiresIn: 60000
      }
    },
    handler: async ({ server, params: { path } }, h) => {

      if (exceptions.includes(path))
        return h.file(path)

      return await server.methods.renderWebPage(path)
    }
  })
}