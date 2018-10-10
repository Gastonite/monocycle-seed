const { default: $ } = require('xstream')
const { footer } = require('@cycle/dom')
const { makeNavigation } = require('components/Navigation')
const { makeBar } = require('components/Bar')
const { makeLayout } = require('components/Layout')
const { makeFlexible } = require('components/Flexible')
const { makeImage } = require('components/Image')
const PathToRegexp = require('path-to-regexp')
const { makeHeader } = require('components/Header')
const { makeRouter } = require('components/Router')
const { DebugState } = require('components/Debug')
const { makeLink } = require('components/Link')
const { WithFlexible } = require('components/Flexible')
const { makeLayoutPage } = require('./LayoutPage')
const { makeFormsPage } = require('./FormsPage')
const { makeEditor } = require('components/Editor')
const { makeCodemirror } = require('components/Codemirror')
const { makeDumbButton } = require('components/DumbButton')
const { makeButton } = require('components/Button')
const { makeIconButton } = require('components/IconButton')
const { makeSvgIcon, WithSvgIcon } = require('components/SvgIcon')

var fs = require('fs');
var boldIcon = fs.readFileSync(require.resolve('font-awesome-svg-png/black/svg/bold.svg'), 'utf8');

const Footer = () => ({ DOM: $.of(footer()) })

const makeApp = ({ classes } = {}) =>

  makeLayout({
    classes,
    gutter: false,
    direction: 'column',
    kind: `.${classes.App}`,
    has: [
      makeHeader(
        makeNavigation({
          classes,
          spaced: true,
          size: 'big',
          has: [
            makeLink({
              classes,
              has: makeImage({
                classes,
                attrs: {
                  src: 'logo.png'
                },
              }),
            }),
            makeFlexible({ classes }),
            {
              spaced: true,
              gutter: false,
              style: {
                justifyContent: 'flex-end',
                alignItems: 'center',
              },
              has: [
                { href: '/', has: 'Home' },
                { href: '/layouts', has: 'Layouts' },
                { href: '/forms', has: 'Forms' },
              ]
            },
          ]
        })
      ),

      makeLayout({
        kind: `.${classes.Layout}.container`,
        direction: 'column',
        gutter: false,
        classes,
        has: makeRouter({
          isStateful: true,
          historySinkName: 'History',
          Default: makeLayout({ classes, has: 'This is default page' }).isolated('home'),
          resolve: [
            {
              resolve: PathToRegexp('/layouts/:path?'),
              value: makeLayout({
                classes,
                direction: 'column',
                // from: () => $.of({ has: 'This is "Page A"' }),
                has: makeLayoutPage({
                  classes,
                })
              }).isolated('pageA')
            },
            {
              resolve: PathToRegexp('/forms/:path?'),
              value: makeLayout({
                classes,
                has: makeFormsPage({
                  classes,
                })
              }).isolated('pageB')
            },
          ]
        })
      }).map(WithFlexible({ classes })),

      DebugState,

      makeNavigation({
        classes,
        gutter: false,
        style: {
          backgroundColor: 'hsla(0,0%,20%,1)',
          marginTop: 'auto',
          justifyContent: 'center',
        },
        has: {
          spaced: true,
          style: {
            justifyContent: 'cennter',
            alignItems: 'center',
            fontSize: '2rem',
            color: 'orange'
          },
          has: [
            { href: '/sdfghj', has: 'Link 1' },
            { href: '/oiuyt', has: 'Link 2' },
            { href: 'dchjkijhkghhj', has: 'Link 3' },
          ]
        }
      }),

      makeBar({
        classes,
        style: {
          marginTop: 'auto',
          justifyContent: 'center',
          fontSize: '12px',
          fontFamily: 'initial',
        },
        has: 'Tous droits réservés - n00sphere labs',
      }).concat(Footer)
    ]
  }).transition()

module.exports = {
  default: makeCodemirror,
  makeApp
}

