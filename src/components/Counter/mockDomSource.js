"use strict";



const { Stream: $ } = require("xstream")
const { adapt } = require("@cycle/run/lib/adapt")
const keys = require("ramda/src/keys")
const SCOPE_PREFIX = '___'


const MockedDOMSource = config => {

  const _elements = config.elements || adapt($.empty())

  const elements = () => {

    const out = _elements

    out._isCycleSource = 'MockedDOM'

    return out;
  }



  const element = () => {

    const output$ = elements()
      .filter(arr => arr.length > 0)
      .map(arr => arr[0])
      .remember()

    const out = adapt(output$)

    out._isCycleSource = 'MockedDOM'

    return out;
  }

  const events = (eventType, options, bubbles) => {

    eventType
    const streamForEventType = config[eventType]

    const out = adapt(streamForEventType || $.empty())

    out._isCycleSource = 'MockedDOM'

    return out;
  }

  const select = (selector) => {
    selector
    const mockConfigForSelector = config[selector] || {}
    keys(mockConfigForSelector)//?

    selector
    return MockedDOMSource(mockConfigForSelector)
  }

  const isolateSource = (source, scope) => {
    scope
    return source.select('.' + SCOPE_PREFIX + scope)
  }

  const isolateSink = (sink, scope) => {

    return adapt(
      $.fromObservable(sink)
        .map(vnode => {



          vnode.sel//?
          vnode.sel.indexOf(SCOPE_PREFIX + scope)//?

          if (vnode.sel.indexOf(SCOPE_PREFIX + scope) === -1)
            vnode.sel += "." + SCOPE_PREFIX + scope
          console.log('isolateSink.sink', { vnode })

          return vnode
        })
    )
  }

  const mockedDOMSource = {
    elements,
    element,
    events,
    select,
    isolateSource,
    isolateSink
  }

  return mockedDOMSource
}

module.exports = {
  default: MockedDOMSource,
  MockedDOMSource,
  mockDOMSource: MockedDOMSource
}