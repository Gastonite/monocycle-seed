const { default: $ } = require('xstream')
const Component = require('component')
const KindReducer = require('utilities/kind')
const { WithSwitch } = require('components/Switch')
const prop = require('ramda/src/prop')
const match = require('ramda/src/match')
const pipe = require('ramda/src/pipe')
const isArray = require('assertions/isArray')
const isRegExp = require('assertions/isRegExp')
const { div } = require('@cycle/dom')
const { default: dropRepeats } = require('xstream/extra/dropRepeats')


const preventEventDefault = event => {
  console.log('preventEventDefault()', event)

  return event.preventDefault() || event
}

const stopEventPropagation = event => {
  return event.stopPropagation() || event
}

const Pathname = ({ tagName, pathname, search, hash }) => {
  return tagName === 'A'
    ? pathname + search + (hash === void 0 ? '' : hash)
    : '/'
}


const WithRouter = ({
  kind = 'Router',
  first = true,
  isStateful = false,
  resolve,
  View,
  basePath,
  historySinkName = 'History',
  Default = () => ({ DOM: $.of(div('No route found')) })
} = {}) => {

  // console.log('WithRouter()')


  if (isArray(resolve)) {

    resolve = resolve.map((resolver, i) => {

      // console.log('Router.resolve', {
      //   i,
      //   resolver,
      //   isRegExp: isRegExp(resolver.resolve)
      // })

      return {
        ...resolver,
        resolve: isRegExp(resolver.resolve)
          ? pipe(
            match(resolver.resolve),
            x => {
              console.log(`${kind}.resolve.match`, {
                i,
                x,
                resolver,
                isRegExp: isRegExp(resolver.resolve),
                returned: x.length > 0 ? x : false
              })

              return x.length > 0 ? x : false
            }
          )
          : resolver.resolve
      }
    })
  }

  const RouterSinks = (sinks, sources) => ({
    ...sinks,
    path$: sources[historySinkName]
      .map(prop('pathname'))
      .compose(dropRepeats())
      .debug(`${kind}.path`)
  })


  const StatefulRouterSinks = (sinks, sources) => {

    const routerState$ = sources.onion.state$
      .filter(prop('isRouter'))
      .compose(dropRepeats((x, y) => x.route === y.route))
      .remember()

    const route$ = routerState$.map(prop('route'))

    return {
      ...RouterSinks(sinks, sources),
      routerState$,
      route$
    }
  }

  const withRouter = f => Component(f)
    .after(isStateful ? StatefulRouterSinks : RouterSinks)
    .map(WithSwitch({
      first,
      View,
      from: isStateful ? 'route$' : 'path$',
      resolve,
      Default
    }))

  return !isStateful
    ? withRouter
    : f => withRouter(f)

      .reducer({
        name: 'selectRoute',
        from: 'path$',
        reducer: route => (state = {}) => ({
          ...state,
          route
        })
      })

      .reducer({
        name: 'initRouter',
        reducer: (state = {}) => state.isRouter ? state : {
          ...state,
          // ...KindReducer('Router')(state),
          isRouter: true
        }
      })


      // .listener({
      //   from: (sinks, sources) => sources.DOM.select(':root a').events('click', {
      //     preventDefault: true,
      //     useCapture: true
      //   })
      //     // .map(e => e.preventEventDefault() || e)
      //     // .map(stopEventPropagation)
      //     .map(prop('target'))
      //     .debug('target')
      //     // .mapTo('/pwet'),
      //     .map(Pathname),
      //     // .compose(sources.Time.debounce(0)),
      //   to: historySinkName,
      //   combiner: $.merge,
      // })


  // .reducer({
  //   name: 'navigate',
  //   from: 'path$',
  //   reducer: path => (state = {}) => state.isRouter ? state : {
  //     ...state,
  //     is: (state.is || []).concat(['Router']),
  //     isRouter: true
  //   }
  // })
}

const makeRouter = options => WithRouter(options)()

module.exports = {
  preventEventDefault,
  stopEventPropagation,
  Pathname,
  WithRouter,
  makeRouter,
  default: makeRouter
}