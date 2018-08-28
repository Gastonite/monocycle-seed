const pipe = require('ramda/src/pipe')
const { default: { createTagFunction } } = require('@cycle/dom/lib/cjs/hyperscript-helpers')
const Cycle = require('component')

const BarView = pipe(
  createTagFunction(`div`),
  vnode => {

    const { text } = vnode
    const { size, end, props = {}, ...others } = vnode.data

    // Cycle.log('BarView()', { end, size, data: vnode.data, others })

    return {
      ...vnode,
      // text: void 0,
      data: {
        ...vnode.data,
        class: {
          ...vnode.data.class,

          big: size === 'big',
          small: size === 'small',
        },
      }
    }
  }
)

module.exports = BarView