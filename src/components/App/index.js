const { default: $ } = require('xstream')
const Cycle = require('component')
const { DebugState } = require('components/Debug')
const { header, footer, div, ul, li, a, section, h1, p } = require('@cycle/dom')
const prop = require('ramda/src/prop')
const AppNavigation = require('./Navigation')
// const Component = require('component')
const { makeLinkList } = require('components/LinkList')
const { makeNavigation } = require('components/Navigation')
const { makeBar } = require('components/Bar')

const PathToRegexp = require('path-to-regexp')
const { makeRouter } = require('components/Router')
const HomePage = require('./pages/HomePage')
const ContactPage = require('./pages/ContactPage')
const ServicesPage = require('./pages/ServicesPage')

const Header = sources => ({ DOM: $.of(header('Headerr')) })
const Footer = sources => ({ DOM: $.of(footer('Footer')) })
const Logo = sources => ({ DOM: $.of(div('Logo')) })





const AppRouter = makeRouter({
  isStateful: true,
  historySinkName: 'History',
  Default: HomePage.isolated({
    DOM: 'HomePage',
    '*': null
  }),
  resolve: [
    {
      resolve: PathToRegexp('/services/:path?'),
      value: Cycle(ServicesPage).isolated('services')
    },
    {
      resolve: PathToRegexp('/contact/:path?'),
      value: Cycle(ContactPage).isolated('contact')
    }
  ],
})

const makeApp = ({ classes } = {}) => Cycle({
  View: div.bind(void 0, `.${classes.App}`),
  has: [
    Cycle([
      makeBar({
        classes,
        size: 'big',
        has: [
          Logo,
          makeNavigation({
            // classes,
            has: {

              has: [
                { href: '/', has: 'Accueil' },
                { href: '/services', has: 'Services' },
                { href: '/contact', has: 'Contact' },
              ]
            
            }
          }),

          DebugState

        ]
      }),
      Header
    ]).isolated({ onion: 'route', '*': null }),
    DebugState,
    AppRouter,
    Footer
  ]
})
  // .after(sinks => Object.keys(sinks).reduce((before, key) => {
  //   const sink = sinks[key]

  //   return {
  //     ...before,
  //     [key]: sink.replaceError(err => console.error(err) || $.empty())
  //   }
  // }, {}))
  .reducer(() => ({}))
// .isolated({
//   History: '/admin',
//   '*': null
// })

module.exports = {
  default: makeApp,
  makeApp
}

