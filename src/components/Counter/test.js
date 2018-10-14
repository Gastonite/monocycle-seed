const {mockDOMSource} = require('@cycle/dom');
const {select} = require('snabbdom-selector')
const {mockTimeSource} = require('@cycle/time')
const Counter = require('./');

suite('Counter', () => {
  
  test('increments and decrements in response to clicks', (done) => {
    const Time = mockTimeSource();


    const addClick$      = Time.diagram(`---x--x-------x--x--|`);
    const subtractClick$ = Time.diagram(`---------x----------|`);
    const expectedCount$ = Time.diagram(`0--1--2--1----2--3--|`);

    const DOM = mockDOMSource({
      '.add': {
        click: addClick$
      },

      '.subtract': {
        click: subtractClick$
      },
    });

    const counter = Counter({DOM});

    const count$ = counter.DOM.map(vtree => select('.count', vtree)[0].text);

    Time.assertEqual(count$, expectedCount$)

    Time.run(done);
  });
});