
const { Stream: $ } = require('xstream')
const Cycle = require('component')
const { makeField } = require('components/Form/Field')
const { makeTextareaField } = require('components/TextareaField')
const pipe = require('ramda/src/pipe')
const prop = require('ramda/src/prop')
const over = require('ramda/src/over')
const always = require('ramda/src/always')
const unless = require('ramda/src/unless')
const lensProp = require('ramda/src/lensProp')
const { Empty } = require('monocycle/component')
const isPlainObj = require('ramda-adjunct/lib/isPlainObj').default

const isNonEmptyString = require('ramda-adjunct/lib/isNonEmptyString').default
const { WithForm } = require('components/Form')
const lt = require('ramda/src/lt')
const both = require('ramda/src/both')
const test = require('ramda/src/test')


const defaultValidators = {
  required: {
    validate: x => x && x.length > 0,
    message: 'Ce champ est requis'
  },
}

const parseOptions = pipe(
  Cycle.coerce,
  over(lensProp('requestOptions'), pipe(
    unless(isPlainObj, Empty),
    over(lensProp('url'), pipe(
      unless(isNonEmptyString, always('contact'))
    )),
    over(lensProp('category'), pipe(
      unless(isNonEmptyString, always('sendMessage'))
    ))
  ))
)

const phoneRegex = /^\d+$/
const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

const WithContactForm = (options = {}) => {


  const {
    classes,
    shas,
    ...formOptions
  } = options = parseOptions(options)


  return component => Cycle(component)
    .listener([
      {
        from: (sinks, sources) => sources.HTTP.select('sendMessage')
          .debug('response$')
          .map(response$ => response$.replaceError(pipe(prop('response'), $.of)))
          .flatten()
          .debug('response'),
        combiner: $.merge,
        to: 'sendMessageResponse$'
      },
      {
        from: 'sendMessageResponse$',
        to: 'resetForm$'
      }
    ])

    .map(WithForm({
      ...formOptions,
      classes,
      formatData: ({ email, telephone, content }) => ({
        email,
        subject: `Message from ${email}`,
        content,
        telephone
      }),
      has: [

        makeField({
          classes,
          label: 'Email',
          name: 'email',
          validableOptions: {
            lens: lensProp('email'),
            message: `Invalid email`,
            validate: both(
              pipe(prop('length'), lt(1)),
              test(emailRegex)
            ),
          }
        }),

        makeField({
          classes,
          label: 'Subject',
          name: 'subject',
        }),

        makeTextareaField({
          classes,
          label: 'Unicorn',
          name: 'content',
          validableOptions: {
            message: `This field is required`,
            lens: lensProp('content'),
            validate: pipe(prop('length'), lt(1)),
          },
        }),
      ]
    }))

}

module.exports = {
  default: WithContactForm,
  WithContactForm
}
