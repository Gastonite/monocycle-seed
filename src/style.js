const { style, cssRule, reinit } = require('typestyle/lib')
const { hsla } = require('csx/lib')
const isNonEmptyString = require('predicates/isNonEmptyString')
const isPlainObject = require('lodash/isPlainObject')
const castArray = require('lodash/castArray')
const when = require('ramda/src/when')
const reduce = require('ramda/src/reduce')
const assoc = require('ramda/src/assoc')
const AppStyle = require('components/App/style')
const LayoutStyle = require('monocycle-dom/Layout/style')
const FlexibleStyle = require('monocycle-dom/Flexible/style')
const BarStyle = require('monocycle-dom/Bar/style')
const DebugStyle = require('monocycle-dom/Debug/style')
const LinkStyle = require('monocycle-dom/Link/style')
const ListStyle = require('monocycle-dom/List/style')
const FieldStyle = require('monocycle-dom/Form/Field/style')
const FieldInputStyle = require('monocycle-dom/Form/Field/Input/style')
const FieldLabelStyle = require('monocycle-dom/Form/Field/Label/style')
const FieldMessageStyle = require('monocycle-dom/Form/Field/Message/style')
const LinkListStyle = require('monocycle-dom/LinkList/style')
const ListItemStyle = require('monocycle-dom/ListItem/style')
const ButtonStyle = require('monocycle-dom/Button/style').default
const CardStyle = require('monocycle-dom/Card/style')
const ImageStyle = require('monocycle-dom/Image/style')
const SvgIconStyle = require('monocycle-dom/SvgIcon/style').default
const NavigationStyle = require('monocycle-dom/Navigation/style')
const TextareaFieldStyle = require('monocycle-dom/TextareaField/style').default
const CodemirrorStyle = require('monocycle-dom/Codemirror/style').default
const EditorStyle = require('monocycle-dom/Editor/style')
const { normalize, fillParent, attachToBottom, margin } = require('csstips')
const { rem } = require('csx/lib')

const defaultColors = {
  light: '#fff',
  dark: '#000',
}

const noop = () => { }

const defineStyle = ({
  rootClass,
  definitions,
  debug,
  defineGlobalStyles = noop,
  colors: globalColors = defaultColors,
  ...globalOptions
} = {}) => {

  reinit()

  defineGlobalStyles({
    colors: globalColors
  })

  const classes = definitions.reduce((classes, {
    name,
    Styles,
    needs = [],
    colors = {},
    options = {}
  }) => {

    const styles = castArray(Styles({
      ...globalOptions,
      ...options,
      ...castArray(needs)
        .filter(isNonEmptyString)
        .reduce((needs, need) => ({
          ...needs,
          [need]: classes[need]
        }), {}),
      colors: {
        ...globalColors,
        ...reduce((before, key) => ({
          ...before,
          [key]: globalColors[colors[key]] || colors[key]
        }), {}, Object.keys(colors))
      }
    }))

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

  // setupPage(`.${rootClass}`)

  cssRule('html', {
    '-moz-box-sizing': 'border-box',
    '-webkit-box-sizing': 'border-box',
    boxSizing: 'border-box'
  })

  cssRule('*,*:before,*:after', {
    boxSizing: 'inherit'
  })

  cssRule(`html, body, .${rootClass}`, fillParent)

  console.error('defineStyle()')

  return classes
}

const definitions = [
  {
    name: 'App',
    Styles: AppStyle,
    colors: {
      background: 'lightTransparent'
    }
  },
  {
    name: 'Layout',
    Styles: LayoutStyle,

  },
  {
    name: 'Flexible',
    Styles: FlexibleStyle
  },
  {
    name: 'Bar',
    Styles: BarStyle,
    needs: ['Layout'],
    colors: {
      background: 'dark',
    },
    options: {

    }
  },
  {
    name: 'Navigation',
    Styles: NavigationStyle,
    colors: {
      background: 'dark',
    },
  },
  {
    name: 'Link',
    Styles: LinkStyle,
    colors: {
      default: 'light'
    },
    options: {
      textDecoration: 'none'
    }
  },

  { name: 'ListItem', Styles: ListItemStyle },
  { name: 'List', Styles: ListStyle, needs: ['ListItem'] },
  { name: 'LinkList', Styles: LinkListStyle },
  { name: 'Field', Styles: FieldStyle },
  { name: 'FieldLabel', Styles: FieldLabelStyle },
  { name: 'FieldInput', Styles: FieldInputStyle },
  { name: 'FieldMessage', Styles: FieldMessageStyle },
  { name: 'TextareaField', Styles: TextareaFieldStyle },
  { name: 'SvgIcon', Styles: SvgIconStyle },

  { name: 'Image', Styles: ImageStyle },
  { name: 'Button', Styles: ButtonStyle },
  { name: 'Codemirror', Styles: CodemirrorStyle },
  { name: 'Editor', Styles: EditorStyle },
  {
    name: 'Card',
    Styles: CardStyle,
    colors: {
      background: 'lighter'
    },
    needs: ['Layout']
  },
]

module.exports = ({
  rootClass = 'root',
  debug = true
} = {}) => {

  if (typeof window !== 'undefined' && window.app && window.app.classes)
    return window.app.classes

  return defineStyle({
    rootClass,
    defineGlobalStyles: ({ colors }) => {

      normalize()

      cssRule('*, h1, h2, h3, h4, h5, h6', margin(0))

      cssRule('html', {
        fontSize: '62.5%',
        height: 'initial'
      })

      cssRule('h1', {
        textAlign: 'center',
        margin: '2.68rem 0',

        // margin: 
      })

      cssRule('h1, h2', {
        color: '#ff9e4d;'
      })

      cssRule('body', {
        color: colors.light,
        fontSize: rem(2),
      })

      cssRule('address', {
        fontStyle: 'normal',
      })

      cssRule('.container', {
        color: colors.dark,
      })

      cssRule('.important', {
        '&': {
          position: 'relative',
          '&::after': {
            content: '""',
            ...attachToBottom,
            display: 'block',
            height: '3px',
            backgroundColor: '#ff9e4d',
          }
        },
        // '&> ::after': {
        //   content: '',
        //   position: 'absolute',
        //   left: 0,
        //   right: 0,
        //   bottom: 0,
        //   height: '2px',
        //   backgroundColor: '#ff9e4d'
        // }
      })

      cssRule('strong', {
        // display: 'block',
        // borderBottom: '2px solid #ff9e4d'
      })

      if (process.env.NODE_ENV !== 'production')
        cssRule('.Debug', ...DebugStyle())
    },
    definitions,
    debug,
    colors: {
      default: '#b8b8b8',
      primary: '#009688',
      invalid: '#e93f3b',
      valid: '#1bc876',
      light: hsla(0, 0, .86, 1).toHexString(),
      lightTransparent: hsla(0, 0, .86, .9).toString(),
      lighter: hsla(0, 0, .94, 1).toHexString(),
      dark: hsla(0, 0, .14, 1).toHexString(),
    }
  })
}
