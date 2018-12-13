const { run } = require('@cycle/run')
const Drivers = require('./drivers')
const { makeApp } = require('./components/App')
const insertRoot = require('./utilities/root')

run(
  makeApp(window.app),
  Drivers({
    root: insertRoot()
  })
)