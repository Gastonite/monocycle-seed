const { default: $ } = require('xstream')
const { footer, img } = require('@cycle/dom')
const prop = require('ramda/src/prop')
const { makeNavigation } = require('components/Navigation')
const { makeBar, WithBar } = require('components/Bar')
const { makeView } = require('components/View')
const { makeLayout } = require('components/Layout')
const { makeFlexible } = require('components/Flexible')
const { makeImage } = require('components/Image')
const PathToRegexp = require('path-to-regexp')
const { makeHeader } = require('components/Header')
const { makeRouter } = require('components/Router')
const { DebugState } = require('components/Debug')
const { makeLink } = require('components/Link')
const { WithFlexible } = require('components/Flexible')


const Footer = () => ({ DOM: $.of(footer()) })

const makeApp = ({ classes } = {}) => makeLayout({
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
              { href: '/a', has: 'Page A' },
              { href: '/b', has: 'Page B' },
              { href: '/x', has: 'Page X' },
            ]
          },
        ]
      })
    ),

    // makeView({
    //   kind: '.banner',
    //   classes,
    //   from: (_, sources) => sources.onion.state$
    //     .map(prop('route'))
    //     .compose(dropRepeats())
    //     .map(route => {
    //       return {
    //         style: {

    //           backgroundImage: `url("${route === '/services'
    //             ? 'services.jpg'
    //             : (route === '/contact'
    //               ? 'contact.jpg'
    //               : 'accueil.jpg')}")`
    //         }
    //       }
    //     }),
    // }),

    DebugState,

    makeLayout({
      kind: `.${classes.Layout}.container`,
      direction: 'column',
      classes,
      has: makeRouter({
        isStateful: true,
        historySinkName: 'History',
        Default: makeLayout({
          classes,
          has: 'This is default page'
        }).isolated('home'),
        resolve: [
          {
            resolve: PathToRegexp('/a/:path?'),
            value: makeLayout({
              classes,
              has: 'This is "Page A"'
            }).isolated('pageA')
          },
          {
            resolve: PathToRegexp('/b/:path?'),
            value: makeLayout({
              classes,
              has: 'This is "Page B"'
            }).isolated('pageB')
          },
        ],
      })
    }).map(WithFlexible({ classes })),

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
})
  .transition()

module.exports = {
  default: ({ classes }) => {

    return makeLayout({
      classes,
      direction: 'column',
      gutter: false,
      spaced: true,
      has: [

        makeView({
          kind: 'span',
          style: {
            backgroundColor: 'red'
          },
          has: 'ga'
        }),

        makeView({
          kind: 'span',
          style: {
            backgroundColor: 'red'
          },
          has: 'bu'
        }),

        makeView({
          kind: 'span',
          style: {
            backgroundColor: 'red'
          },
          has: 'zo'
        }),

        makeView({
          kind: 'span',
          style: {
            backgroundColor: 'red'
          },
          has: 'meu'
        }),

      ]
    })
  },
  default: makeApp,
  makeApp
}

