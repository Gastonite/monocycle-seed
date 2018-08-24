const { style, cssRule, reinit } = require('typestyle/lib')
const AppStyle = require('components/App/style')
const BarStyle = require('components/Bar/style')
const DebugStyle = require('components/Debug/style')
const { inlineBlock, normalize, setupPage, margin } = require('csstips')


const defineStyle = ({ rootClass, definitions } = {}) => {
  console.log('Classes()')

  reinit()

  normalize()

  const classes = definitions.reduce((before, { name, styles }) => {

    return {
      ...before,
      [name]: style(...styles)
    }
  }, {})

  setupPage(`.${rootClass}`)

  cssRule('*, h1, h2, h3, h4, h5, h6', margin(0))
  cssRule('.Debug', ...DebugStyle())

  return classes
}

module.exports = ({
  rootClass = 'root',
} = {}) => {


  return typeof window !== 'undefined' && window.app && window.app.classes
    ? window.app.classes
    : defineStyle({
      rootClass,
      definitions: [
        {
          name: 'App',
          styles: AppStyle()
        },
        {
          name: 'Bar',
          styles: BarStyle()
        }
      ]
    })
}