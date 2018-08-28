const castArray = require('lodash.castarray')
const Cycle = require('component')
const ListView = require('components/List/view')
const { makeLink } = require('components/Link')
const { makeList } = require('components/List')
const { mergeClasses } = require('utilities/style')

const WithLinkList = (options = {}) => {

  const {
    View = ListView,
    [Cycle.hasKey]: has = Cycle.Empty
  } = options = Cycle.coerce(options)


  const classes = { LinkList: 'LinkList', ...options.classes }

  // Cycle.log('WithLinkList()', { classes, has })

  const LinkList = makeList({
    View,
    classes: mergeClasses(classes, {
      List: classes.LinkList
    }),
    [Cycle.hasKey]: has === Cycle.Empty
      ? has
      : castArray(has).map(makeLink)
  })

  return component => Object.assign(
    Cycle([component, LinkList]),
    { isLinkList: true }
  )
}

const makeLinkList = options => WithLinkList(options)()

module.exports = {
  default: makeLinkList,
  makeLinkList,
  WithLinkList
}