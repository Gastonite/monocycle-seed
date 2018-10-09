
const Budo = require('budo')
const Url = require('url')


Budo('./src/dev.js', {
  pushstate: true,
  stream: process.stdout,
  live: '*.{html,css}',
  dir: ['src', 'public'],
  port: 8988,
  browserify: {
    plugin: 'browserify-hmr'
  },
  middleware: function (req, res, next) {
    
    console.log('middleware1', req.method)

    if (req.method !== 'POST')
      return next()

    const url = Url.parse(req.url)

    if (url.pathname !== '/contact')
      return next()

    // res.statusCode = 400
    // res.end(JSON.stringify({
    //   statusCode: 400,
    //   message: 'invalid from'
    // }))

    res.statusCode = 200
    res.end(`{"message": "message sent"}`)

  }
}).on('connect', function (ev) {

  console.log('connected')
})
