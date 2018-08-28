const Cycle = require('component')
const castArray = require('lodash.castarray')
const isString = require('assertions/isString')
const LinkView = require('./view')

const prefixHref = (prefix, href = '') => {

  return href.startsWith('http') || href.startsWith('//')
    ? href
    : (
      href = (href && !href.startsWith('/'))
        ? '/' + href
        : href,
      !prefix ? href : (prefix + (href === '/' ? '' : href))
    )
}

const WithLink = (options = {}) => {

  const {
    View = LinkView,
    href = '',
    [Cycle.hasKey]: has = Cycle.Empty
  } = options = Cycle.coerce(options)


  const classes = { Link: 'Link', ...options.classes }

  const Link = sources => Cycle({
    View: View.bind(void 0, `.${classes.Link}`, {
      attrs: { href: prefixHref(sources.History.prefix, href) }
    }),
    [Cycle.hasKey]: has,
  })(sources)

  return component => Cycle([component, Link], 'Link')
}

const makeLink = options => WithLink(options)()

module.exports = {
  default: makeLink,
  makeLink,
  WithLink
}