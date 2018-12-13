// Placeholder test file - DOES NOT PASS

const test = require('ava')
const jsc = require('jsverify')
const { withTime, diagramArbitrary: diagramArb } = require('cyclejs-test-helpers')
const toHtml = require('snabbdom-to-html') //snabbdom-to-html's typings are broken
const { Stream: $ } = require('xstream')
const { mockDOMSource } = require('@cycle/dom')
const { withState } = require('@cycle/state')
const { WithCounter } = require('./Counter')

const minify = x => x.replace(/\n/g, '').replace(/\s{2,}/g, '').replace(/>\s{1}</g, '')

test('Counter: updates the value when clicking addButton or removeButton', () => withTime(Time => {

  const property = jsc.forall(diagramArb, diagramArb, (a, b) => {

    const add$ = Time.diagram(a)
    const remove$ = Time.diagram(b)

    const DOM = mockDOMSource({
      '.___addButton': { click: add$ },
      '.___removeButton': { click: remove$ }
    })

    const Counter = WithCounter()()

    const sinks = withState(Counter)({ DOM, Time })

    const html$ = sinks.DOM.map(toHtml)

    const expected$ = $.merge(add$.mapTo(+1), remove$.mapTo(-1))
      .fold((acc, curr) => acc + curr, 0)
      .map((count) => `
        <div>
          <div>Counter: ${count}</div>
          <div>
            <button class="Button ___removeButton">-</button>
            <button class="Button ___addButton">+</button>
          </div>
        </div>
      `)

    Time.assertEqual(
      html$,
      expected$.map(minify),
    )

    return true
  })

  jsc.assert(property, {
    tests: 100,
  })

})())
