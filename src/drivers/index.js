const Time = require('./Time')
const History = require('./History')
const StateDriver = require('./State')
const DOMDriver = require('./DOM')


module.exports = ({ root } = {}) => ({
  DOM: DOMDriver({ root }),
  History,
  Time,
  onion: StateDriver(),
})