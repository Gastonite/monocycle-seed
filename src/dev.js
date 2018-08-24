const { setup, run } = require('@cycle/run')
const { rerunner, restartable } = require('cycle-restart')
const { default: $ } = require('xstream')
const insertRoot = require('./utilities/root')

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


const requireApp = (classes) => {

  return withCounters(require('./components/App').default({ classes }))
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
});





let _classes = requireStyle()

const startApp = ({
  classes = { ..._classes },
  rootClass = 'root'
} = {}) => {
  // console.log('')
  // console.log('===============================================================')
  // console.log('')
  console.clear()

  insertRoot()

  const { sources, sinks, dispose } = Rerun({ root: `.${rootClass}` })(
    requireApp(classes)
  )
}

startApp()

if (module.hot) {
  module.hot.accept([
    './components/App',
    './drivers',
  ], () => {
    console.log('hot1')

    startApp()
  });


  module.hot.accept('./style', () => {
    console.log('hot2')
    _classes = requireStyle()
    startApp()

  });

}