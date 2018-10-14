const pipe = require('ramda/src/pipe')
const over = require('ramda/src/over')
const lensProp = require('ramda/src/lensProp')

const parseOptions = pipe(
  over(lensProp('allowedFunctions'), )
)
const FromJson = (options = {}) => {

  const { 
    allowedFunctions
  } = parseOptions(options)


  return () => ({

  })
}

module.exports = {
  default: FromJson,
  FromJson
}