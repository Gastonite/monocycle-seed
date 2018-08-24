const Component = require('component')
const Bar = require('components/Bar')
const { default: $ } = require('xstream')
const { ul, li, a } = require('@cycle/dom')

const AppNavigationView = () => {
  return (
    ul([
      li([a('.link', { attrs: { href: '/' } }, 'Home')]),
      li([a('.link', { attrs: { href: '/services' } }, 'Services')]),
      li([a('.link', { attrs: { href: '/contact' } }, 'Contact')]),
    ])
  );
}
const AppNavigation = sources => {

  return {
    DOM: $.of(AppNavigationView())
  }
}

module.exports = AppNavigation