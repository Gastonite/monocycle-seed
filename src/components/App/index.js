const { WithView } = require('monocycle-dom/View')
const { withViewCombiner } = require('monocycle-dom/utilities/withViewCombiner')
const { withDefaultView } = require('monocycle-dom/utilities/withDefaultView')
const { pipe } = require('monocycle/utilities/pipe')
const { makeComponent: _makeComponent } = require('monocycle/component');
const { withSymbols, BehaviorFactory } = require('monocycle-abstract/symbols')
const { Stream: $ } = require('xstream')

const makeComponent = pipe(
  withDefaultView,
  // withSymbols,
  withViewCombiner,
)(_makeComponent)

const Component = makeComponent({

  // mergeOptions: (defaultOptions, options) => ({
  //   ...merge(deNNfaultOptions, options),
  //   sel: mergeSelectors(defaultOptions.sel, options.sel)
  // })
})



module.exports = {
  default: ({ classes }) => {

    // Component.set('Listener', WithListener)
    // Component.set('Clickable', WithClickable)
    // Component.set('View', WithView, { Component })
    // Component.set('Button', WithButton)
    // Component.set('DumbButton', 'View', {
    //   sel: 'button.' + classes.Button,
    //   Component
    // })

    // return Component.get('DumbButton').make({
    //   sel: '.ga',
    //   has: 'meu'
    // })


    const View = WithView({
      Component,
      class: {
        ga: 0,
        zo: 1
      },
      from: (component, sources) => ({
        class: {
          bu: 1,
          ga: 1,
        },
        has: [
          'Hello ',
          component,
          ' !'
        ]
      })
    })(sources => ({ DOM: $.of('world') }))


    return sources => {

      const sinks = View({ DOM: 1 })
      console.log('sinks', sinks)
      return sinks
    }



    return WithCounter(Component)()

    return Component.get('View', {
      sel: 'div#zo.bu',
      has: [
        // Component.get('Button', {
        //   sel: '.ga',
        //   has: 'meu'
        // })(),
        // Component.get('Button').make({
        //   sel: '.ga',
        //   has: 'meu'
        // }),
        Component.get('Button').make('you')
      ]
    })()

  }
}