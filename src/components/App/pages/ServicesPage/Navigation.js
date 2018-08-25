const { default: $ } = require('xstream')
const { ul, li, a } = require('@cycle/dom')


const ServicesNavigation = sources => {

  return {
    DOM: $.of(ul([
      li([a('.link', { attrs: { href: '/' } }, 'ServiceHome')]),
      li([a('.link', { attrs: { href: '/offer' } }, 'Offer')]),
    ]))
  }
}

module.exports = ServicesNavigation