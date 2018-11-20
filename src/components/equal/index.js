const { Stream: $ } = require('xstream');
const { div, h2, span, button } = require('@cycle/dom');
const always = require('ramda/src/always');
const prop = require('ramda/src/prop');


const Counter = sources => {

  const initReducer$ = $.of(always(0));

  const add$ = sources.DOM.select('.add').events('click')

  const subtract$ = sources.DOM.select('.subtract').events('click')

  const sumReducer$ = $.merge(add$.mapTo(1), subtract$.mapTo(-1))
    .map(y => x => x + y)

  return {
    DOM: sources.state.stream
      .map(count =>
        div([
          h2(`Counter`),
          span(`value: ${count}`),
          button('.remove', '-'),
          button('.add', '+'),
        ])
      ),
    state: $.merge(
      initReducer$,
      sumReducer$
    )
  };
}



module.exports = {
  default: Counter,
  Counter
}