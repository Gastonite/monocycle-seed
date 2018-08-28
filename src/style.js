const { style, cssRule, reinit } = require('typestyle/lib')
const isNonEmptyString = require('assertions/isNonEmptyString')
const isPlainObject = require('assertions/isPlainObject')
const castArray = require('lodash.castarray')
const when = require('ramda/src/when')
const assoc = require('ramda/src/assoc')
const AppStyle = require('components/App/style')
const LayoutStyle = require('components/Layout/style')
const FlexibleStyle = require('components/Flexible/style')
const BarStyle = require('components/Bar/style')
const DebugStyle = require('components/Debug/style')
const LinkStyle = require('components/Link/style')
const ListStyle = require('components/List/style')
const LinkListStyle = require('components/LinkList/style')
const ListItemStyle = require('components/ListItem/style')
const NavigationStyle = require('components/Navigation/style')
const { normalize, setupPage, margin } = require('csstips')


const defineStyle = ({ rootClass, definitions, debug } = {}) => {

  reinit()

  normalize()

  const classes = definitions.reduce((classes, { name, Styles, needs = [] }) => {

    const styles = Styles(
      castArray(needs)
        .filter(isNonEmptyString)
        .reduce((options, need) => ({
          ...options,
          [need]: classes[need]
        }), {})
    )

    return {
      ...classes,
      [name]: style(...(debug ? styles : styles.map(
        when(isPlainObject, assoc('$debugName', void 0)),
        // when(isPlainObject, ({ $debugName, ...style }) => ({
        //   ...style,
        //   $debugName: process.env.NODE_ENV === 'production'
        //     ? 
        // }))
      )))
    }
  }, {})

  setupPage(`.${rootClass}`)

  cssRule('*, h1, h2, h3, h4, h5, h6', margin(0))

  if (process.env.NODE_ENV !== 'production')
    cssRule('.Debug', ...DebugStyle())

  return classes
}

const definitions = [
  { name: 'App', Styles: AppStyle },
  { name: 'Layout', Styles: LayoutStyle },
  { name: 'Flexible', Styles: FlexibleStyle },
  { name: 'Bar', Styles: BarStyle, needs: ['Layout'] },
  { name: 'Navigation', Styles: NavigationStyle/* , needs: ['LinkList'] */ },
  { name: 'Link', Styles: LinkStyle },
  { name: 'ListItem', Styles: ListItemStyle },
  { name: 'List', Styles: ListStyle, needs: ['ListItem'] },
  { name: 'LinkList', Styles: LinkListStyle },
]

module.exports = ({
  rootClass = 'root',
  debug = true
} = {}) => {

  if (typeof window !== 'undefined' && window.app && window.app.classes)
    return window.app.classes

  return defineStyle({
    rootClass,
    definitions,
    debug
  })
}