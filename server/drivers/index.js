const { Stream: $ } = require('xstream')
const Time = require('drivers/Time')
const StateDriver = require('drivers/State')
const { makeHTMLDriver } = require('@cycle/html')
const { makeServerHistoryDriver } = require('@cycle/history/lib/cjs/drivers')
const withIsolatedHistory = require('drivers/IsolatedHistory')

module.exports = ({ path, render } = {}) => ({
  Time,
  DOM: makeHTMLDriver(render),
  onion: StateDriver(),
  HTTP: () => ({
    select: $.empty
  }),
  History: withIsolatedHistory(makeServerHistoryDriver({
    initialEntries: [`/${path}`],
    initialIndex: 0
  }))
})