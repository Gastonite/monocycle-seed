const { Stream: $ } = require('xstream');
const { div, h2, span, button } = require('@cycle/dom');



function Counter1(sources) {

  console.log('Counter()')
  const initReducer$ = $.of(prev => prev || { count: 0 });

  const addReducer$ = sources.DOM.select('.add').events('click')
    .mapTo(state => ({ ...state, count: state.count + 1 }));

  const subtractReducer$ = sources.DOM.select('.subtract').events('click')
    .mapTo(state => ({ ...state, count: Math.max(state.count - 1, 0) }));

  // console.log('sources.state.stream:', sources.state.stream)
  return {
    DOM: sources.state.stream
      .debug(state => {
        console.log('state:', state)

        return state
      })
      .map(s => s.count)
      .map(count =>

        div([
          h2(`Counter`),
          span(`value: ${count}`),
          button('.add'),
          button('.remove'),
        ])
      ),
    onion: $.merge(
      initReducer$,
      addReducer$,
      subtractReducer$
    )
  };
}



const Counter = sources => {

  const state$ = sources.state.stream;
  const vdom$ = state$.map(count =>

    div([
      h2(`Counter`),
      span(`value: ${count}`),
      button('.add', '+'),
      button('.remove', '-'),
    ])
  );


  const initialReducer$ = $.of(function initialReducer() { return 0; });


  const addReducer$ = sources.DOM.select('.add').events('click')
    .mapTo(state =>  state + 1);

  const removeReducer$ = sources.DOM.select('.remove').events('click')
    .mapTo(state =>  state - 1);


  const reducer$ = $.merge(initialReducer$, addReducer$, removeReducer$);

  return {
    DOM: vdom$,
    state: reducer$.debug('state'),
  };
}




module.exports = {
  default: Counter,
  Counter
}