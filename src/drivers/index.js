const Time = require('drivers/Time')
const History = require('./History')
const StateDriver = require('drivers/State')
const DOMDriver = require('./DOM')

module.exports = ({ root } = {}) => ({
  DOM: DOMDriver({ root }),
  History,
  Time,
  onion: StateDriver(),
})