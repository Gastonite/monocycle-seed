const { default: $ } = require('xstream')
const Cycle = require('component')
const { section, h1, p, div } = require('@cycle/dom')
const { makeLinkList } = require('components/LinkList')
const { makeRouter } = require('components/Router')
const PathToRegexp = require('path-to-regexp')

const ServicesPage = sources => {

  return {
    DOM: $.of(
      section('.services', [
        h1('Servicessssss'),
        p('Welcome to our spectacular web page with nothing special here.'),
        // MenuView(),
      ])
    )
  }
}

Cycle(ServicesPage)

const OfferPage = sources => {

  return {
    DOM: sources.History.map(path =>
      section('.services', [
        h1('Servicessss'),
        p('offers ' + JSON.stringify(path)),
        // MenuView(),
      ])
    )
  }
}
Cycle(OfferPage)

const ServicesRouter = makeRouter({
  kind: 'ServicesRouter',
  isStateful: true,
  historySinkName: 'History',
  Default: ServicesPage,
  resolve: [
    {
      resolve: PathToRegexp('/:path*'),
      value: OfferPage
    },
  ],
})


module.exports = Cycle({
  View: div,
  has: [
    ServicesRouter,
    makeLinkList({
      has: [
        {
          href: '/',
          has: 'services'
        },
        {
          href: '/offer',
          has: 'offres'
        }
      ]
    }),
  ]
})