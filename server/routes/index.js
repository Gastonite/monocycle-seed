const DefaultRoute = require('./default')

module.exports = ({
  exceptions = [],
  declareMethod
} = {}) => ([
  DefaultRoute({ exceptions, declareMethod })
])