

const isString = require('assertions/isString')
const Log = (options = {}) => {

  const {
    log = console.log.bind(console),
    scope = ''
  } = isString(options)
    ? { scope: options }
    : options
    
  if (!scope || !isString(scope))
    return log
    
  return (...args) => {

    let prefix = scope

    const isColored = isString(args[0]) && args[0].startsWith('%c')

    if (isColored) {
      prefix = '%c' + prefix + ' ' + args[0].slice(2)
      args.shift()
    }

    return log(
      prefix,
      ...args
    )
  }
}

module.exports = {
  default: Log,
  Log
}