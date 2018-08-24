const { default: $ } = require('xstream')
const Component = require('component')

const defaultOptions = {
  log: console.log.bind(console)
}

const makeWebsite = (options = {}) => {

  const {
    log
  } = {
    ...defaultOptions,
    ...options
  }

  log('make()')

  const Website = sources => ({
    DOM: $.of('yop')
  })

  return Component(Website)
}

module.exports = {
  defaultOptions,
  makeWebsite
}