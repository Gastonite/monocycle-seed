'use strict'

const Path = require('path')
const Hapi = require('hapi')
const Inert = require('inert')
const Pino = require('hapi-pino')
const Routes = require('./routes')

const { NODE_ENV, PORT = 3000, HOST = 'localhost' } = process.env

const isProduction = NODE_ENV === 'production'

const server = Hapi.server({
  port: PORT,
  host: HOST,
  routes: {
    files: {
      relativeTo: Path.resolve(__dirname, '../public')
    }
  }
})

const startServer = async ({
  exceptions
} = {}) => {

  await server.register(Inert)

server.route(Routes({
  declareMethod: server.method.bind(server),
  exceptions
}))

await server.register({
  plugin: Pino,
  options: {
    prettyPrint: !isProduction,
    mergeHapiLogData: true,
    logEvents: [
      // 'response',
      // 'request-error'
    ]
  }
})


await server.start()
server.log(['server'], `Running at: ${server.info.uri}`)
}

process.on('unhandledRejection', (err) => {

  console.log(err)
  process.exit(1)
})


startServer({
  exceptions: [
    'bundle.js',
    'logo.png',
    'favicon.ico',
  ]
})