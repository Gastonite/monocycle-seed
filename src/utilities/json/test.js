require('module-alias/register')
const { ok } = require('assert')
const isFunction = require('lodash/isFunction')
const { FromJson } = require('./index.js')
const { mockDOMSource } = require('@cycle/dom')
const { select } = require('snabbdom-selector')
const { mockTimeSource } = require('@cycle/time')
const { makeView } = require('./')
const { makeButton } = require('components/Button')
const stringify = require('utilities/stringify')
const SnabbdomToHTML = require('snabbdom-to-html')
suite('json', () => {

  const Time = mockTimeSource()

  const make = (...args) => {

    const View = makeView(...args)

    ok(isFunction(View))

    return View
  }

  test('should be a function', () => {

    ok(isFunction(FromJson))
  });

  setup(() => {
    // ...
  });

  suite('fromJson()', () => {

    let fromJson

    test('render a div element when no params passed', done => {

      fromJson = FromJson({
        functions: {
          makeView
        },
        globalOptions: {
          test: 42
        }
      })

      ok(isFunction(fromJson))

      const View = fromJson({
        kind: 'makeView',
        
      })

      console.log({
        View
      })

      ok(isFunction(View))

      const view = View({
        DOM: mockDOMSource({
          // '.add': {
          //   click: addClick$
          // },
        })
      })
  
      Time.assertEqual(
        view.DOM.map(SnabbdomToHTML).debug('pwet'),
        Time.diagram(`(A|)`, {
          A: '<div class="ga"><div>pwet</div></div>'
        })
      )
  
      Time.run(done)
    })

  })
})
