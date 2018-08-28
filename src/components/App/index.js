const { default: $ } = require('xstream')
const Cycle = require('component')
const { DebugState } = require('components/Debug')
const { header, footer, div } = require('@cycle/dom')
const { makeNavigation } = require('components/Navigation')
const { makeBar } = require('components/Bar')
const { makeLayout } = require('components/Layout')
const { WithFlexible } = require('components/Flexible')
const PathToRegexp = require('path-to-regexp')
const { WithRouter } = require('components/Router')
const HomePage = require('./pages/HomePage')
const ContactPage = require('./pages/ContactPage')
const ServicesPage = require('./pages/ServicesPage')

const Header = sources => ({ DOM: $.of(header()) })
const Footer = sources => ({ DOM: $.of(footer('Footer')) })
const Logo = sources => ({ DOM: $.of(div('Logo')) })

const makeApp = ({ classes } = {}) => Cycle({
  View: div.bind(void 0, `.${classes.App}`),
  has: [
    
    Cycle([
      makeBar({
        classes,
        size: 'big',
        spaced: true,
        has: [
          Logo,
          makeNavigation({
            classes,
            fill: true,
            spaced: true,
            has: [
              {
                spaced: true,
                end: true,
                has: [
                  { href: '/', has: 'Accueil' },
                  { href: '/services', has: 'Services' },
                  { href: '/contact', has: 'Contact' },
                ]
              }
            ]
          }).map(WithFlexible({ classes })),
        ]
      }),
      Header
    ]).isolated({ onion: 'route', '*': null }),

    DebugState,

    makeLayout({
      direction: 'column',
      classes,
    }).map(WithRouter({
      isStateful: true,
      historySinkName: 'History',
      Default: HomePage.isolated({ DOM: 'HomePage', '*': null }),
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
    })),

    Footer
  ]
})
  .reducer()

module.exports = {
  default: makeApp,
  makeApp
}

