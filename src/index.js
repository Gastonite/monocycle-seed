const { run } = require('@cycle/run')
const Drivers = require('./drivers')
const Classes = require('style')
const { default: CycleOnionify } = require('cycle-onionify')
const { makeApp } = require('components/App')
const { makeWebsite } = require('components/Website')
const insertRoot = require('./utilities/root')
const { default: $ } = require('xstream')


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

const classes = Classes()

run(
  withCounters(makeApp({
    classes
  })),
  Drivers({
    root: insertRoot()
  })
)