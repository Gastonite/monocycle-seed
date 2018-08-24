// const {captureClicks, makeHistoryDriver} = require('@cycle/history');

// module.exports = captureClicks(makeHistoryDriver())

const identity = require('ramda/src/identity')
const prop = require('ramda/src/prop')
const isString = require('lodash/isString')
const pipe = require('ramda/src/pipe')
const startsWith = require('lodash/fp/startsWith')
const { makeServerHistoryDriver, makeHistoryDriver, captureClicks } = require('@cycle/history')
// const { createBrowserHistory } = require('history')


// const { log, warn, Logger, add } = require('utilities/logger')

const { default: $ } = require('xstream')

const LinkViewSource = (source, prefix = '') => {

  if (!isString(prefix))
    return source
  console.log('HistoryLinkViewSource', { prefix })

  const isolateSource = source.isolateSource || identity
  return Object.assign(source, {
    isolateSource: (source, scope = '') => {
      source = isolateSource(source, scope)
      return LinkViewSource(source, prefix + scope)
    },
  })
}


const withLinkView = driver => {
  console.log('withHistoryLinkView')

  return (sink, prefix) => {

    const source = driver(sink)
    console.log('HistoryLinkView', { sink, prefix })

    return /* !prefix ? source : */ LinkViewSource(source, prefix)
  }
}


// const historyDriver = makeHistoryDriver()
// const historyDriver = withLinkView(captureClicks(makeHistoryDriver()))
// const historyDriver = captureClicks(makeHistoryDriver(createBrowserHistory()))



const IsolatedHistorySource = (sink, prefix = '') => {

  console.warn(`HistorySource(${prefix})`)

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

            // console.log('history.sink:', input, { prefix, scope })
            let { pathname } = input

            pathname = scope + pathname
            // pathname = pathname.startsWith(scope)
            //   ? pathname
            //   : scope + pathname

            if (pathname.endsWith('/'))
              pathname = pathname.slice(0, -1)

            // Object.assign(input, { pathname })

            // console.warn(`historySource(${prefix}).event(${scope}):`, {
            //   before: input.pathname,
            //   after: pathname,
            // })

            return {
              ...input,
              pathname
            }
          })
          .map(x => console.warn(`historySource(${prefix}).sink2(${scope})`, x) || x)

      )
    },
    isolateSource: (source, scope) => {

      if (!isString(scope))
      throw 'erkkk'
      // console.warn(`historySource(${prefix}).isolateSource(${scope})`, { source })

      if (scope && !scope.startsWith('/'))
        scope = '/' + scope

      return IsolatedHistorySource(
        source

          .filter(pipe(prop('pathname'), startsWith(scope)))
          .map(({ pathname, ...location }) => {

            // console.warn(`historySource(${prefix}).source1(${scope}):`, {
            //   before: pathname,
            //   after: pathname.slice(scope.length) || '/'
            // })

            return ({
              ...location,
              pathname: pathname.slice(scope.length) || '/'
            })
          })
          .map(x => console.warn(`historySource(${prefix}).source2(${scope})`, x) || x)
          .remember(),
        scope
      )
    }
  })


  return source
}

const withHistoryIsolation = driver => sink$ => IsolatedHistorySource(driver(sink$))
const HistoryDriver = (serverDriverOptions) => withHistoryIsolation(
  serverDriverOptions
    ? makeServerHistoryDriver(serverDriverOptions)
    : captureClicks(makeHistoryDriver())
)
 
module.exports = HistoryDriver
