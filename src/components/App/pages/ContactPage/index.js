const { default: $ } = require('xstream')
const Component = require('component')
const { section, h1, p } = require('@cycle/dom')

const ContactPageView = () => {
  return (
    section('.about', [
      h1('Contact'),
      p('This is the page where we describe ourselves.'),
      p('Contact us'),
    ])
  );
}

const ContactPage = sources => {
  return {
    DOM: $.of(ContactPageView()).debug('contact')
  }
}

module.exports = Component(ContactPage)