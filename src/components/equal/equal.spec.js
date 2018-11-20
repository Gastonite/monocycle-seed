const { forall, assert, dict, nat, Options } = require('jsverify')
const { diagramArbitrary, withTime } = require('cyclejs-test-helpers')
const htmlLooksLike = require('html-looks-like');
const toHtml = require('snabbdom-to-html'); //snabbdom-to-html's typings are broken

const { Stream: $ } = require('xstream')
const { mockDOMSource, VNode } = require('@cycle/dom')
const { mockTimeSource } = require('@cycle/time')
const onionify = require('cycle-onionify')
const { withState } = require('@cycle/state');
const prettifyXml = require('prettify-xml'); //snabbdom-to-html's typings are broken
const keys = require('ramda/src/keys');
const apply = require('ramda/src/apply');
const prop = require('ramda/src/prop');
const equals = require('ramda/src/equals');
const map = require('ramda/src/map');
// const map = require('fantasy-laws/src/internal/map');
// const compose = require('fantasy-laws/src/internal/compose_');
// const identity = require('fantasy-laws/src/internal/identity');
const eqProps = require('ramda/src/eqProps');
const identical = require('ramda/src/identical');
const identity = require('ramda/src/identity');
const pipe = require('ramda/src/pipe');
const reduce = require('ramda/src/reduce');

const testOptions = {
  tests: 100,
  size: 200
};

const laws = require('fantasy-laws')
// const map = require('fantasy-laws/src/internal/map')
const jsc = require('jsverify')

const Poney = (value) => {

  let _value = value

  const map = f => Poney(f(_value))

  const poney = {
    value,
    map
  }

  return poney
}
// const poneyArb = jsc.array(jsc.number)

// checkFunctorLaws(
//   jsc.array(jsc.number),
//   equals
// )
// checkFunctorLaws(
//   // jsc.number.smap(Poney, identity/* poney => poney.value */),
//   jsc.dict(),
//   eqProps('value'),
// )