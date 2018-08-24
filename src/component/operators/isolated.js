const { default: isolate } = require('@cycle/isolate')

const WithIsolated = scope => component => {


  const Isolated = sources => isolate(component, scope)(sources)


  return Isolated
}

module.exports = WithIsolated