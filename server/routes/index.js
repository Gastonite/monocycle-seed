const DefaultRoute = require('./default')

module.exports = ({
  exceptions = []
} = {}) => [
    DefaultRoute({ exceptions })
  ]