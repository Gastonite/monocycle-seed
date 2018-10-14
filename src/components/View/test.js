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

  const MockedView = (...args) => {

    const View = makeView(...args)

    ok(isFunction(View))

    return View
  }
  test('render a div element when no params passed', done => {

    const view = MockedView()({
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

  test('render a div element with specific classes', done => {

    const view = MockedView({
      kind: '.ga.bu'
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

    const view = MockedView({
      kind: 'super-element.cool-class.another-class'
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

    const view = MockedView({
      kind: '.ga.bu'
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

      const view = MockedView({
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

      const view = MockedView({
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

      const view = MockedView({
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

      const view = MockedView({
        style: {
          background: 'blue'
        },
        from: () => Time.diagram('--a---b|', {
          a: { style: { background: 'green' }, has: 'ga' },
          b: { style: { background: 'red' }, has: 'bu' },
        })
      })({
        DOM: mockDOMSource({})
      })

      Time.assertEqual(
        view.DOM.map(SnabbdomToHTML),
        Time.diagram('--a---b|', {
          a: '<div style="background: green">ga</div>',
          b: `<div style="background: red">bu</div>`,
        }),
      )

      Time.run(done)
    })
  })

})