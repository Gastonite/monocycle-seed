const { Stream: $ } = require('xstream')
const quicktask = require('quicktask').default
const concat = require('xstream/extra/concat').default;
const { StateSource } = require('cycle-onionify/lib/StateSource')



const StateDriver = (name = 'State') => sink => {

  const schedule = quicktask()

  const reducer$ = $.create()

  const stream$ = concat(
    $.fromObservable(sink),
    $.never(),
  )

  stream$.subscribe({
    next: i => schedule(() => reducer$._n(i)),
    error: err => schedule(() => reducer$._e(err)),
    complete: () => schedule(() => reducer$._c()),
  })

  const state$ = reducer$
    .fold((state, reducer) => reducer(state), void 0)
    .drop(1)

  return new StateSource(state$, name)
}


module.exports = StateDriver