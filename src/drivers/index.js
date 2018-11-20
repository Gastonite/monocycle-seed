const History = require('./History')
const DOMDriver = require('./DOM')
const HTTP = require('./HTTP')
const { timeDriver } = require('@cycle/time')

module.exports = ({ root } = {}) => ({
  DOM: DOMDriver({ root }),
  History,
  Time: timeDriver,
  HTTP,
  Log: log$ => { log$.debug('LOG').addListener(x => x) }
})
