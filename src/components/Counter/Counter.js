const { Stream: $ } = require('xstream');
const { div, h2, span, button } = require('@cycle/dom');
const always = require('ramda/src/always');
const prop = require('ramda/src/prop');
const objOf = require('ramda/src/objOf');
const { WithListener } = require('monocycle/components/Listener')
const { WithView } = require('monocycle-dom/View')
const { pipe } = require('monocycle/utilities/pipe')

const Counter1 = sources => {

  const initReducer$ = $.of(always(0));

  const add$ = sources.DOM.select('.add').events('click')

  const subtract$ = sources.DOM.select('.remove').events('click')

  const sumReducer$ = $.merge(add$.mapTo(+1), subtract$.mapTo(-1))
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
  }
}

const WithCounter = Component => {

  return pipe(
    WithListener([
      {
        from: (sinks, sources) => sources.DOM.select('.add').events('click'),
        to: 'add$'
      },
      {
        from: (sinks, sources) => sources.DOM.select('.remove').events('click'),
        to: 'remove$'
      },
      {
        from: (sinks, sources) => {

          return $.merge(
            sinks.add$.mapTo(1),
            sinks.remove$.mapTo(-1)
          ).map(value => state => state + value)
            .startWith(always(0))
        },
        to: 'state'
      },
      // {
      //   from: (sinks, sources) => {

      //     return $.of(() => 0)
      //   },
      //   to: 'state'
      // }
    ]),
    // WithView({
    //   Component,
    //   from: (sinks, sources) => {

    //     return sources.state.stream.map(objOf('children'))

    //     return $.of({
    //       children: '42'
    //     }).debug('ici')

    //     return sources.state.stream.map(count => {

    //       return {
    //         children: count + ''
    //       }
    //     })
    //   },
    // }),
    // WithView({
    //   Component,
    //   has: 'yo'
    // }),
    WithView({
      Component,
      has: 'yo'
    }),
    WithView({
      Component,
      from: always($.of({ children: 'bu' }))
    }),
  )
}

const Counter = WithCounter()()
module.exports = {
  default: Counter,
  Counter,
  WithCounter
}