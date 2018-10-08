const { makeLayout, WithLayout } = require('components/Layout')
const { makeCard } = require('components/Card')
const { WithFlexible } = require('components/Flexible')
const Factory = require('utilities/factory')

const WithLayoutPage = ({ classes }) => {

  console.log('WithLayoutPage()')
  return WithLayout({
    classes,
    direction: 'column',
    gutter: false,
    has: [
      makeLayout({
        classes,
        fill: true,
        has: makeLayout({
          classes,
          direction: 'column',
          gutter: false,
          spaced: true,
          fill: true,
          has: [
            makeCard({
              classes,
              kind: 'span',
              has: 'bu'
            }),
            makeCard({
              classes,
              kind: 'span',
              style: {
                backgroundColor: 'red'
              },
              has: 'zo'
            }),
            makeCard({
              classes,
              direction: 'row',
              kind: 'span',
              spaced: true,
              has: [
                makeCard({
                  classes,
                  kind: 'span',
                  has: 'ga'
                }),
                makeCard({
                  classes,
                  kind: 'span',
                  has: 'ga'
                }),
                makeCard({
                  classes,
                  kind: 'span',
                  has: 'ga'
                }).map(WithFlexible({ classes })),
                makeCard({
                  classes,
                  kind: 'span',
                  has: 'ga'
                })
              ]
            }),

            makeLayout({
              classes,
              gutter: false,
              spaced: true,
              has: [
                makeCard({
                  classes,
                  kind: 'span',
                  style: {
                    backgroundColor: '#bada55'
                  },
                  has: 'meu'
                }).map(WithFlexible({
                  classes,
                  grow: 2
                })),
                makeCard({
                  classes,
                  kind: 'span',
                  style: {
                    backgroundColor: '#bada55'
                  },
                  has: 'meu'
                }).map(WithFlexible({ classes })),
              ]
            }),

            makeCard({
              classes,
              // direction: 'row',
              kind: 'span',
              spaced: true,
              has: [
                makeCard({
                  classes,
                  kind: 'span',
                  has: 'ga'
                }),
                makeCard({
                  classes,
                  kind: 'span',
                  has: 'ga'
                }),
                makeCard({
                  classes,
                  kind: 'span',
                  has: 'ga'
                }).map(WithFlexible({ classes })),
                makeCard({
                  classes,
                  kind: 'span',
                  has: 'ga'
                })
              ]
            }),
          ]
        })
      })
    ]
  })
}

const makeLayoutPage = Factory(WithLayoutPage)

module.exports = {
  default: makeLayoutPage,
  makeLayoutPage,
  WithLayoutPage
}