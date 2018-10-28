const Cycle = require('component')
const { makeLink } = require('components/Link')
const { makeList } = require('components/List')
const { mergeClasses } = require('utilities/style')
const Factory = require('utilities/factory')

const WithLinkList = (options = {}) => {

  const {
    has = Cycle.Empty
  } = options = Cycle.coerce(options)


  const classes = { LinkList: 'LinkList', ...options.classes }

  Cycle.log('WithLinkList()', { classes, has })

  const LinkList = makeList({
    classes: mergeClasses(classes, {
      List: classes.LinkList
    }),
    has: has
    .map(Cycle.coerce)
        .map(options => makeLink({
          ...options,
          classes
        }))
  })

  return component => Object.assign(
    Cycle([component, LinkList]),
    { isLinkList: true }
  )
}

const makeLinkList = Factory(WithLinkList)

module.exports = {
  default: makeLinkList,
  makeLinkList,
  WithLinkList
}