
const { Stream: $ } = require('xstream')
const dropRepeats = require('xstream/extra/dropRepeats').default
const Cycle = require('component')
const True = require('ramda/src/T')
const unless = require('ramda/src/unless')
const over = require('ramda/src/over')
const map = require('ramda/src/map')
const lensIndex = require('ramda/src/lensIndex')
const pipe = require('ramda/src/pipe')
const both = require('ramda/src/both')
const reduce = require('ramda/src/reduce')
const filter = require('ramda/src/filter')
const complement = require('ramda/src/complement')
const when = require('ramda/src/when')
const assoc = require('ramda/src/assoc')
const always = require('ramda/src/always')
const prop = require('ramda/src/prop')
const defaultTo = require('ramda/src/defaultTo')
const lensProp = require('ramda/src/lensProp')
const addIndex = require('ramda/src/addIndex')
const set = require('ramda/src/set')
const view = require('ramda/src/view')
const isFunction = require('lodash/isFunction')
const isString = require('lodash/isString')
const isNonEmptyString = require('predicates/isNonEmptyString')
const Factory = require('utilities/factory')
const KindReducer = require('utilities/kind')
const isArray = require('lodash/isArray')
const identity = require('ramda/src/identity')
const all = require('ramda/src/all')

const parseOptions = pipe(
  Cycle.coerce,
  over(lensProp(Cycle.hasKey),
    pipe(
      defaultTo([]),
      filter(Boolean),
      map(unless(isFunction, makeValidable))
    )
  ),
  over(lensProp('lens'),
    unless(isFunction, always(void 0))
  ),
  over(lensProp('ItemScope'),
    unless(isFunction, always(identity))
  ),
  over(lensProp('valueKey'),
    unless(isNonEmptyString, always('value'))
  ),
  over(lensProp('from'), pipe(
    defaultTo('validate$'),
    when(isString, prop),
    unless(isFunction, always($.empty))
  )),
  over(lensProp('validate'),
    unless(isFunction, defaultTo(True))
  ),
  over(lensProp('message'),
    unless(isNonEmptyString, defaultTo('Invalid field'))
  ),
)

const WithValidable = (options = {}) => {

  const {
    validate,
    message,
    from,
    lens,
    ItemScope,
    valueKey,
    [Cycle.hasKey]: has,
    ...componentOptions
  } = options = parseOptions(options)

  let isValueArray = true

  const lenses = has.map((validable, i) => {

    const lens = prop('lens')(validable)

    if (lens)
      isValueArray = false
    return lens || lensIndex(i)
  })

  Cycle.log('WithValidable()', {
    validate,
    has,
    message,
    from,
    lenses,
    lens,
    ItemScope,
  })


  const ValidateReducer = value => state => {

    const isValid = Boolean(validate(value, state))

    return {
      ...state,
      error: isValid ? void 0 : {
        message
      },
      [valueKey]: value,
      isValid,
    }
  }

  const Validable = Cycle()
    .transition([
      {
        name: 'initValidable',
        from: (sinks, sources) => sources.onion.state$
          .filter(complement(prop('isValidable')))
          .map(prop(valueKey))
          .compose(dropRepeats()),
        reducer: value => pipe(
          KindReducer('Validable'),
          ValidateReducer(value),
          assoc('isValidable', true)
        )
      },
      {
        name: 'validate',
        from,
        reducer: ValidateReducer
      }
    ])

  const Validables = Cycle({
    ...componentOptions,
    [Cycle.hasKey]: has
      .filter(Boolean)
      .map((field, i) =>
        field.isolated(ItemScope('' + i, field))
      )
  })
    .isolated({
      onion: {
        get: (state = {}) => pipe(
          prop(Cycle.hasKey),
          defaultTo(
            Array(has.length).fill(void 0)
          ),
        )(state),
        get: (state = {}) => {

          const {
            [Cycle.hasKey]: validables = []
          } = state

          return addIndex(map)((lens, i) => {

            return {
              ...validables[i],
              [valueKey]: view(lens, state[valueKey])
            }
          }, lenses)
        },
        set: (state, validables) => {

          const isValid = all(prop('isValid'))(validables)

          const ret = ({
            ...state,
            [Cycle.hasKey]: validables,
            [valueKey]: addIndex(reduce)(
              (before, lens, i) => {

                return set(lens, validables[i][valueKey])(before)
              },
              isValueArray
                ? Array(validables.length).fill(void 0)
                : {},
              lenses
            ),
            isValid
          })

          return ret
        }
      },
      '*': null
    })
    .transition({
      name: 'initValidables',
      from: (sinks, sources) =>
        sources.onion.state$
          .filter(complement(prop('isValidables')))
          .filter(pipe(
            prop(Cycle.hasKey),
            both(
              isArray,
              all(prop('isValidable'))
            ),
          ))
          .compose(sources.Time.debounce(0)),
      reducer: () => pipe(
        KindReducer(['Validable', 'Validables']),
        assoc('isValidables', true),
        assoc('isValidable', true),
      )
    })


  return component => Object.assign(
    Cycle([
      component,
      has.length > 0 ? Validables : Validable
    ], 'Validable'),
    { isValidable: true, lens }
  )
}

const makeValidable = Factory(WithValidable)

module.exports = {
  default: makeValidable,
  makeValidable,
  WithValidable
}
