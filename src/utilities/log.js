

const curryN = require('ramda/src/curryN')
const isString = require('lodash/isString')
const Log = (options = {}) => {

  const {
    log: _log = console.log.bind(console),
    scope = ''
  } = isString(options)
      ? { scope: options }
      : options

  if (!scope || !isString(scope))
    return _log

  const log = (...args) => {
    let prefix = scope

    const isColored = isString(args[0]) && args[0].startsWith('%c')

    if (isColored) {
      prefix = '%c' + prefix + ' ' + args[0].slice(2)
      args.shift()
    }

    _log(
      prefix,
      ...args
    )
    return args[1]
  }
  log.partial = curryN(2, log)

  return log
}

module.exports = {
  default: Log,
  Log
}