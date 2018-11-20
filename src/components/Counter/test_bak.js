// Placeholder test file - DOES NOT PASS

const { forall, assert, nat, Options } = require('jsverify');
const { diagramArbitrary, withTime } = require('cyclejs-test-helpers');
const htmlLooksLike = require('html-looks-like');
const { Counter } = require('./index');
const toHtml = require('snabbdom-to-html'); //snabbdom-to-html's typings are broken
const prettifyXml = require('prettify-xml'); //snabbdom-to-html's typings are broken


const { Stream: $ } = require('xstream');
const { mockDOMSource, VNode } = require('@cycle/dom');
const { mockTimeSource } = require('@cycle/time');
const { withState } = require('@cycle/state');

const testOptions = {
  tests: 100,
  size: 200
};


suite('Counter', () => {


  test('should interact correctly', () => {

    const property = forall(diagramArbitrary, diagramArbitrary, (addDiagram, subtractDiagram) => withTime(Time => {
      const add$ = Time.diagram(addDiagram);
      const subtract$ = Time.diagram(subtractDiagram);

      const DOM = mockDOMSource({
        '.add': { click: add$ },
        '.remove': { click: subtract$ }
      });

P
      const app = withState(Counter)({ DOM });
      const html$ = app.DOM
        .map(toHtml)
        // .map(prettifyXml)


      const expected$ = $.merge(add$.mapTo(+1), subtract$.mapTo(-1))
        .fold((acc, curr) => acc + curr, 0)
        .map(count => `
          <div>
              <h2>Counter</h2>
              <span>vlue: ${count}</span>
              <button class="add">+</button>
              <button class="remove">-</button>
          </div>
        `)
      Time.assertEqual(html$, expected$, htmlLooksLike);
    }));

    return assert(property, testOptions);
  });
});
