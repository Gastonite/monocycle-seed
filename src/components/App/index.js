const Cycle = require('component')
const { Stream: $ } = require('xstream')
const { mergeSinks } = require('cyclejs-utils')
const { div } = require('@cycle/dom')
const isString = require('lodash/isString')
const when = require('ramda/src/when')
const identical = require('ramda/src/identical')
const either = require('ramda/src/either')
const prop = require('ramda/src/prop')
const filter = require('ramda/src/filter')
const unless = require('ramda/src/unless')
const apply = require('ramda/src/apply')
const both = require('ramda/src/both')
const pipe = require('ramda/src/pipe')
const concat = require('ramda/src/concat')
const lensProp = require('ramda/src/lensProp')
const over = require('ramda/src/over')
const compose = require('ramda/src/compose')
const always = require('ramda/src/always')
const ifElse = require('ramda/src/ifElse')
const lt = require('ramda/src/lt')
const merge = require('ramda/src/merge')
const isEmpty = require('ramda/src/isEmpty')
const ensureArray = require('ramda-adjunct/lib/ensureArray').default
const isPlainObj = require('ramda-adjunct/lib/isPlainObj').default
const objOf = require('ramda/src/objOf')
const applyTo = require('ramda/src/applyTo')
const map = require('ramda/src/map')
const isFunction = require('lodash/isFunction')
const complement = require('ramda/src/complement')
const { Empty: EmptyObject } = require('monocycle/empty')
const log = require('monocycle/utilities/log').Log('app').partial
const mergeViews = require('snabbdom-merge/merge-all')




module.exports = {
  default: ({ classes }) => {

    const Show42 = sources => {
      console.log('Show42()')
      return {
        DOM: $.of(div('.test42', ['42']))
      }
    }

    const Show43 = sources => {
      console.log('Show43()')
      return {
        DOM: $.of(div('.test43', ['43']))
      }
    }

    const withAddOne = component => {

      return sources => {

        const sinks = component(sources)

        return {
          ...sinks,
          DOM: sinks.DOM.debug('tttt').map(view => ({
            ...view,
            children: [
              { text: +view.children[0].text + 1 + '' }
            ]
          }))
        }
      }
    }

    // return Cycle(Show42)
    //   .concat(Show43, {
    //     // View: div
    //   })

    return Cycle({
      View: div,
      has: [
        Show42,
        // 'yo', 
        Show43
      ]
    })
  }
}

