const castArray = require('lodash.castarray')
const Cycle = require('component')
const { classes } = require('typestyle')
const { default: $ } = require('xstream')
const isNotPlainObject = require('assertions/isNotPlainObject')
const objOf = require('ramda/src/objOf')
const when = require('ramda/src/when')
const LinkListView = require('./view')
const { makeLink } = require('components/Link')
const { makeList } = require('components/List')
const { mergeClasses } = require('utilities/style')

const WithLinkList = (options = {}) => {

  const {
    View = LinkListView,
    [Cycle.hasKey]: has = Cycle.Empty
  } = options = when(
    isNotPlainObject,
    objOf(Cycle.hasKey),
    options
  )

  const classes = { LinkList: 'LinkList', ...options.classes }

  Cycle.log('LinkList', { classes, has })
  // const LinkList = Cycle({
  //   View: View.bind(void 0, `.${classes.LinkList}`),
  //   [Cycle.hasKey]: has
  // })
  // if (has.length === 1 && has[0].isLinkList)
  //   return has[0]

  const LinkList = makeList({
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