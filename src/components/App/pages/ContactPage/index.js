const { default: $ } = require('xstream')
const Cycle = require('component')
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
    DOM: $.of(ContactPageView())
  }
}

module.exports = Cycle(ContactPage)