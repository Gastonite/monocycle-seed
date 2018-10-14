const unless = require('ramda/src/unless')
const pipe = require('ramda/src/pipe')
const lensProp = require('ramda/src/lensProp')
const isUndefined = require('lodash/isUndefined')
const castArray = require('lodash/castArray')
const over = require('ramda/src/over')
const when = require('ramda/src/when')
const objOf = require('ramda/src/objOf')
const isNotPlainObject = require('monocycle/assertions/isNotPlainObject')

const coerce = pipe(
  when(isNotPlainObject, objOf('has')),
  over(lensProp('has'), unless(isUndefined, castArray))
)

console.log(coerce())