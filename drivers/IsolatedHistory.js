const prop = require('ramda/src/prop')
const isString = require('ramda-adjunct/lib/isString').default
const pipe = require('ramda/src/pipe')
const startsWith = require('lodash/fp/startsWith')
const { default: $ } = require('xstream')


const IsolatedHistorySource = (sink, prefix = '') => {

  // console.warn(`HistorySource(${prefix})`)

  if (!isString(prefix))
    return Object.assign(sink, {
      isHistorySource: true,
    })

  if (prefix && !prefix.startsWith('/'))
    prefix = '/' + prefix

  const source = Object.assign(sink, {
    isHistorySource: true,
    prefix,
    isolateSink: (sink$, scope) => {

      return $.merge(
        sink$
          // .map(x => console.warn(`historySource(${prefix}).sink1(${scope})`, x) || x)
          .map(input => {

            if (typeof input === 'string')
              input = { type: 'push', pathname: input }

            let { pathname } = input

            pathname = scope + pathname

            if (pathname.endsWith('/'))
              pathname = pathname.slice(0, -1)

            return {
              ...input,
              pathname
            }
          })
        // .map(x => console.warn(`historySource(${prefix}).sink2(${scope})`, x) || x)
      )
    },
    isolateSource: (source, scope) => {

      if (scope && !scope.startsWith('/'))
        scope = '/' + scope

      return IsolatedHistorySource(
        source
          .filter(pipe(prop('pathname'), startsWith(scope)))
          // .map(x => console.warn(`historySource(${prefix}).source1(${scope})`, x) || x)
          .map(({ pathname, ...location }) => ({
            ...location,
            pathname: pathname.slice(scope.length) || '/'
          }))
          // .map(x => console.warn(`historySource(${prefix}).source2(${scope})`, x) || x)
          .remember(),
        scope
      )
    }
  })

  return source
}

const withIsolatedHistory = driver => sink$ => IsolatedHistorySource(driver(sink$))

module.exports = withIsolatedHistory
