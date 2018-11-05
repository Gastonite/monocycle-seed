const { setup, run } = require('@cycle/run')
const { rerunner, restartable } = require('cycle-restart')
const { default: $ } = require('xstream')
const insertRoot = require('./utilities/root')
const pipe = require('ramda/src/pipe')



const _req = require
global.require = (...args) => {

  const ret = _req(...args)

  if (ret && ret.__esModule)
    throw new Error('YOO', args)

  return ret
}
const requireStyle = () => require('./style')()
const requireDrivers = ({ root } = {}) => require('./drivers')({
  root
})


const withCounters = component => {

  return sources => {
    const counters = {

    }

    $.of(null)
      .compose(sources.Time.delay(5000))
      .map(x => {


        console.log('COUNTERS:', counters)
      })
      .addListener(x => x)

    const sinks = component(sources)

    return Object.keys(sinks).reduce((before, key) => ({
      ...before,
      [key]: sinks[key].map(x => (
        counters[key] = counters[key] || 0,
        counters[key]++ ,
        x
      ))
    }), {})
  }
}

const WithViewLogger = (...args) => component => {

  return sources => {

    const sinks = component(sources)

    const view$ = sinks.DOM || $.empty()


    return {
      ...sinks, 
      DOM: view$.map(view => {
        console.warn(...args, view)
        return view
      }) 
    }
  }
}


const requireApp = (classes) => {

  return pipe(
    withCounters,
    WithViewLogger('render')
    withState
  )(require('./components/App').default({ classes }))
}


const Rerun = ({ root } = {}) => rerunner(setup, () => {

  const drivers = requireDrivers({
    root
  })

  return {
    ...drivers,
    DOM: restartable(drivers.DOM, {
      pauseSinksWhileReplaying: false
    })
  }
})


let _classes = requireStyle()
let _dispose

const startApp = ({
  classes = { ..._classes },
  rootClass = 'root'
} = {}) => {
  // Cycle.log('')
  // Cycle.log('===============================================================')
  // Cycle.log('')
  // 
  if (_dispose) {

    _dispose()
    _dispose = void 0
  }

  insertRoot()

  const { sources, sinks, dispose } = Rerun({ root: `.${rootClass}` })(
    requireApp(classes)
  )

  _dispose = dispose
}

startApp()

if (module.hot) {
  module.hot.accept([
    './components/App',
    './drivers',
  ], () => {
    console.clear()
    startApp()
  })


  module.hot.accept('./style', () => {
    _classes = requireStyle()
    console.clear()
    startApp()
  })

}
