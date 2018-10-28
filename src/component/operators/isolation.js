const { default: isolate } = require('@cycle/isolate')

const WithIsolation = scope => component => {


  const Isolation = sources => isolate(component, scope)(sources)


  return Isolation
}

module.exports = WithIsolation