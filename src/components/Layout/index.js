const Cycle = require('component')
const LayoutView = require('./view')

const WithLayout = (options = {}) => {

  const {
    View = LayoutView,
    direction = 'row',
    end = false,
    fill = false,
    spaced = false,
    [Cycle.hasKey]: has = Cycle.Empty,
  } = options = Cycle.coerce(options)

  const classes = { Layout: 'Layout', ...options.classes }

  // Cycle.log('WithLayout()', { has  })

  return component => Cycle([
    component,
    Cycle({
      View: View.bind(void 0, `.${classes.Layout}`, {
        ...options,
        fill,
        spaced,
        direction,
        end,
      }),
      [Cycle.hasKey]: has
    }, 'Layout')
  ])
}

const makeLayout = options => WithLayout(options)()

module.exports = {
  default: makeLayout,
  makeLayout,
  WithLayout
}