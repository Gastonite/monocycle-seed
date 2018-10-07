const { Stream: $ } = require('xstream')
const Cycle = require('component')
const { WithView } = require('components/View')
const pipe = require('ramda/src/pipe')
const lensProp = require('ramda/src/lensProp')
const over = require('ramda/src/over')
const when = require('ramda/src/when')
const unless = require('ramda/src/unless')
const prop = require('ramda/src/prop')
const always = require('ramda/src/always')
const isString = require('lodash/isString')
const isFunction = require('lodash/isFunction')
const log = require('utilities/log').Log('Link')

const prefixHref = (prefix, href = '') =>
  href.startsWith('http') || href.startsWith('//')
    ? href
    : (
      href = (href && !href.startsWith('/'))
        ? '/' + href
        : href,
      !prefix ? href : (prefix + (href === '/' ? '' : href))
    )

/* 
  const WithLinkOld = (options = {}) => {

    const {
      View = LinkView,
      href = '',
      [Cycle.hasKey]: has = Cycle.Empty
    } = options = Cycle.coerce(options)


    const classes = { Link: 'Link', ...options.classes }

    const Link = sources => {

      return Cycle({
        View: View.bind(void 0, `.${classes.Link}`, {
          attrs: { href: prefixHref(sources.History.prefix, href) }
        }),
        [Cycle.hasKey]: has,
      })(sources)
    }
    return component => Cycle([component, Link], 'Link')
  }
*/


const parseOptions = pipe(
  Cycle.coerce,

  over(lensProp('from'), pipe(
    when(isString, prop),
    unless(isFunction, always(void 0)),
    // unless(isFunction, always($.of.bind(void 0))),
  )),
)

const WithLink = (options = {}) => {

  const {
    kind = '',
    href = '',
    from,

    [Cycle.hasKey]: has,
    ...viewOptions
  } = parseOptions(options)

  Cycle.log('WithLink()', {
    from,
    has
  })

  return WithView({
    ...viewOptions,

    from: from && ((sinks, sources) => (from(sinks, sources) || $.empty())
      .map(Cycle.coerce)
      .map(log.partial('WithLink.coucou'))
      .map(from => ({
        ...from,
        [Cycle.hasKey]: from[Cycle.hasKey] ||  has,
        attrs: {
          ...(from.attrs || {}),
          href: prefixHref(sources.History.prefix, href)
        }
      }))),
    classes: {
      Link: 'Link',
      ...(viewOptions.classes || {})
    },
    attrs: {
      href,
      //   ...(options.attrs || {}),
      //   href: prefixHref(sources.History.prefix, href)
    },
    [Cycle.hasKey]: has,
    kind: `a${kind}`,
  })
}


const makeLink = options => WithLink(options)()

module.exports = {
  default: makeLink,
  makeLink,
  WithLink,
  prefixHref
}