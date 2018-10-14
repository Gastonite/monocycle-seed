const { Stream: $ } = require('xstream')
const {div, button} = require('@cycle/dom');


function Counter (sources) {

  const add$ = sources.DOM
    .select('.add')
    .events('click')
    .mapTo(+1);

  const subtract$ = sources.DOM
    .select('.subtract')
    .events('click')
    .mapTo(-1);

  const change$ = $.merge(add$, subtract$);

  const count$ = change$.fold((total, change) => total + change, 0);

  return {
    DOM: count$.map(count =>
      div('.counter', [
        div('.count', count.toString()),
        button('.add', 'Add'),
        button('.subtract', 'Subtract')
      ])
    )
  }
}

module.exports = Counter