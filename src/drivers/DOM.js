const { makeDOMDriver } = require('@cycle/dom/lib/cjs/makeDOMDriver')

module.exports = ({ root } = {}) => makeDOMDriver(root)