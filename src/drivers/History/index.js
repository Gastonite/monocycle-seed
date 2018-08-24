const pipe = require('ramda/src/pipe')
const { captureClicks, makeHistoryDriver } = require('@cycle/history')
const withIsolatedHistory = require('drivers/IsolatedHistory')

module.exports = pipe(
  captureClicks,
  withIsolatedHistory
)(makeHistoryDriver())
