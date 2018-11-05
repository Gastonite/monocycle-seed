const { default: $ } = require('xstream')
const Cycle = require('component')
const { makeHeading } = require('components/Heading')
const { makeCard } = require('components/Card')
const { makeBar } = require('components/Bar')
const { makeLayout, WithLayout } = require('components/Layout')
const { makeEditor } = require('components/Editor')
const { makeList } = require('components/List')
const { makeFlexible } = require('components/Flexible')
const { makeParagraph } = require('components/Paragraph')
const { makeCodemirror } = require('components/Codemirror')
const { makeContactForm } = require('./ContactForm')
const unless = require('ramda/src/unless')
const pipe = require('ramda/src/pipe')
const prop = require('ramda/src/prop')
const objOf = require('ramda/src/objOf')
const always = require('ramda/src/always')
const when = require('ramda/src/when')
const lensProp = require('ramda/src/lensProp')
const over = require('ramda/src/over')
const isString = require('lodash/isString')
const isNonEmptyString = require('predicates/isNonEmptyString')

const WithFormsPage = ({
  classes = {}
} = {}) => {

  const FormsPage = makeLayout({
    spaced: true,
    fill: true,

    direction: 'column',
    classes,
    has: [
      makeHeading('Forms'),

      makeLayout({
        classes,
        style: {
          justifyContent: 'center',
          alignItems: 'center',
        },
        has: [

          makeFlexible({
            classes,
            has: [

              makeCard({
                classes,
                has: [

                  makeParagraph([
                    `Components/Behaviors used:`,
                  ]),

                  makeList([
                    'Form',
                    'FieldGroup',
                    'Field',
                    'Button',
                    'Clickable',
                    'Validable',
                    'Focusable',
                    'Codemirror',
                    'Editor',
                    '(to be continued)',
                  ]),
                ]
              }).map(WithLayout({
                classes,
                direction: 'column',
                spaced: true,
              })),

              makeHeading('Codemirror', 2),

              makeCard({
                classes,
                gutter: false,
                has: [
                  
                  makeCodemirror().isolation({
                    DOM: 'Codemirror',
                    '*': null,
                  })
                ]
              }),

              makeHeading('Editor', 2),

              makeCard({
                classes,
                gutter: false,
                has: [
                  makeEditor({ classes }).isolation({
                    DOM: 'Editor',
                    '*': null,
                  })
                ]
              }),
            ]
          }).map(WithLayout({
            classes,
            direction: 'column',
            spaced: true
          })),

          makeFlexible({
            classes,
            has: [

              makeHeading('Contact form', 2),

              makeCard({
                gutter: false,
                classes,
                has: makeFlexible({
                  classes,
                  sel: '.contact-form',
                  has: [

                    makeBar({
                      classes,
                      from: (sinks, sources) => sources.state.stream
                        .map(prop('message'))
                        .map(when(Boolean, pipe(
                          when(isString, objOf('text')),
                          over(lensProp('type'), unless(isNonEmptyString, always('success'))),
                        )))
                        .map(message => ({
                          style: {
                            justifyContent: 'center',
                            display: !message ? 'none' : 'flex',
                            backgroundColor: message && message.type === 'success'
                              ? '#1bc876'
                              : '#e93f3b',
                            color: '#fefefe'
                          },
                          has: message && message.text
                        }))
                    }),

                    makeContactForm({
                      classes
                    }).isolation('form'),
                  ]
                })

                  .transition({
                    name: 'setMessage',
                    from: (sinks, sources) =>
                      sinks.sendMessageResponse$
                        .map(({ statusCode, text }) => {

                          const { message } = JSON.parse(text)

                          return $.merge(
                            $.of(
                              statusCode === 200 && message === 'message sent'
                                ? {
                                  type: 'success',
                                  text: 'Unicorn sent'
                                }
                                : (
                                  statusCode === 400 && message === 'invalid from'
                                    ? {
                                      type: 'error',
                                      text: 'Invalid email'
                                    }
                                    : {
                                      type: 'error',
                                      text: 'An error occured'
                                    }
                                )
                            ),
                            $.of(void 0).compose(sources.Time.delay(4000))
                          )
                        })
                        .flatten(),
                    reducer: message => (state = {}) => ({
                      ...state,
                      message
                    })
                  })
              }),
            ]

          }).map(WithLayout({
            classes,
            direction: 'column',
            spaced: true
          }))
          
        ]
      })
    ]
  })

  return component => Cycle([component, FormsPage])
}

module.exports = {
  default: WithFormsPage,
  WithFormsPage
}