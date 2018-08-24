const { makeDOMDriver } = require('@cycle/dom')

module.exports = ({ root } = {}) => {
  
  return makeDOMDriver(root)
}