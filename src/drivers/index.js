const Time = require('drivers/Time')
const History = require('./History')
const StateDriver = require('drivers/State')
const DOMDriver = require('./DOM')
const HTTP = require('./HTTP')

module.exports = ({ root } = {}) => ({
  DOM: DOMDriver({ root }),
  History,
  Time,
  HTTP,
  Log: log$ => { log$.debug('LOG').addListener(x => x) },
  onion: StateDriver(),
})
