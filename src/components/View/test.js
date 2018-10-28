require('module-alias/register')
const { mockDOMSource } = require('@cycle/dom')
const { select } = require('snabbdom-selector')
const { mockTimeSource } = require('@cycle/time')
const { makeView } = require('./')
const { ok } = require('assert')
const isFunction = require('lodash/isFunction')
const stringify = require('utilities/stringify')
const SnabbdomToHTML = require('snabbdom-to-html')

suite('View', () => {
  const Time = mockTimeSource()

  const make = (...args) => {

    const View = makeView(...args)

    ok(isFunction(View))

    return View
  }

  test('render a div element when no params passed', done => {

    const view = make()({
      DOM: mockDOMSource({
        // '.add': {
        //   click: addClick$
        // },
      })
    })

    Time.assertEqual(
      view.DOM.map(SnabbdomToHTML).debug('pwet'),
      Time.diagram(`(A|)`, {
        A: '<div></div>'
      })
    )

    Time.run(done)
  })

  test('render a div element with snabbdom options', done => {

    const view = make({
      style: {
        background: 'blue'
      }
    })({
      DOM: mockDOMSource({
        // '.add': {
        //   click: addClick$
        // },
      })
    })

    Time.assertEqual(
      view.DOM.map(SnabbdomToHTML).debug('pwet'),
      Time.diagram(`(A|)`, {
        A: '<div style="background: blue"></div>'
      })
    )

    Time.run(done)
  })

  test('render a div element with specific classes', done => {

    const view = make({
      sel: '.ga.bu'
    })({
      DOM: mockDOMSource({
        // '.add': {
        //   click: addClick$
        // },
      })
    })

    Time.assertEqual(
      view.DOM.map(SnabbdomToHTML).debug('pwet'),
      Time.diagram(`(A|)`, {
        A: '<div class="ga bu"></div>'
      })
    )

    Time.run(done)
  })

  test('render a specific element with specific classes', done => {

    const view = make({
      sel: 'super-element.cool-class.another-class'
    })({
      DOM: mockDOMSource({
        // '.add': {
        //   click: addClick$
        // },
      })
    })

    Time.assertEqual(
      view.DOM.map(SnabbdomToHTML).debug('pwet'),
      Time.diagram(`(A|)`, {
        A: '<super-element class="cool-class another-class"></super-element>'
      })
    )

    Time.run(done)
  })

  test('render a div element with children', done => {

    const view = make({
      sel: '.ga.bu'
    })({
      DOM: mockDOMSource({})
    })

    Time.assertEqual(
      view.DOM.map(SnabbdomToHTML).debug('pwet'),
      Time.diagram(`(A|)`, {
        A: '<div class="ga bu"></div>'
      })
    )

    Time.run(done)
  })


  suite('ReactiveView', () => {
    
    test('does not render anything when "from" does not return a functor', done => {

      const view = make({
        from: () => 42
      })({
        DOM: mockDOMSource({})
      })

      Time.assertEqual(
        view.DOM.map(SnabbdomToHTML),
        Time.diagram('|'),
      )

      Time.run(done)
    })

    test('does not render anything when "from" does not return a functor', done => {

      const view = make({
        from: () => [42]
      })({
        DOM: mockDOMSource({})
      })

      Time.assertEqual(
        view.DOM.map(SnabbdomToHTML),
        Time.diagram('|'),
      )

      Time.run(done)
    })

    test('does render an element in reaction to an event', done => {

      const view = make({
        from: () => Time.diagram('---1---2----------34--5-|')
      })({
        DOM: mockDOMSource({})
      })

      Time.assertEqual(
        view.DOM.map(SnabbdomToHTML),
        Time.diagram('---a---b----------cd--e-|', {
          a: '<div>1</div>',
          b: '<div>2</div>',
          c: '<div>3</div>',
          d: '<div>4</div>',
          e: '<div>5</div>',
        }),
      )

      Time.run(done)
    })

    test('does override view options', done => {

      const view = make({
        style: {
          background: 'blue'
        },
        from: () => Time.diagram('--a---b------c|', {
          a: { style: { background: 'green' }, has: 'ga' },
          b: { class: { yeah: true }, has: 'bu' },
          c: ['zo'],
          c: 'meu',
        })
      })({
        DOM: mockDOMSource({})
      })

      Time.assertEqual(
        view.DOM.map(SnabbdomToHTML),
        Time.diagram('--a---b------c|', {
          a: '<div style="background: green">ga</div>',
          b: `<div class="yeah" style="background: blue">bu</div>`,
          c: `<div style="background: blue">zo</div>`,
          c: `<div style="background: blue">meu</div>`,
        }),
      )

      Time.run(done)
    })
  })

})