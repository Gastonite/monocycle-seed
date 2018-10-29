const { makeLayout, WithLayout } = require('components/Layout')
const { makeCard } = require('components/Card')
const { WithFlexible } = require('components/Flexible')
const { makeParagraph } = require('components/Paragraph')

const WithSwitchesPage = ({ classes }) => {

  console.log('WithSwitchesPage()')
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
              sel: 'span',
              has: 'bu'
            }),
              makeCard({
                classes,
                has: makeParagraph(`Quae dum ita struuntur, indicatum est apud Tyrum indumentum regale textum occulte`),
              }),
            makeCard({
              classes,
              sel: 'span',
              style: {
                backgroundColor: 'red'
              },
              has: 'zo'
            }),
            makeCard({
              classes,
              direction: 'row',
              sel: 'span',
              spaced: true,
              has: [
                makeCard({
                  classes,
                  sel: 'span',
                  has: 'ga'
                }),
                makeCard({
                  classes,
                  sel: 'span',
                  has: 'ga'
                }),
                makeCard({
                  classes,
                  sel: 'span',
                  has: 'ga'
                }).map(WithFlexible({ classes })),
                makeCard({
                  classes,
                  sel: 'span',
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
                  sel: 'span',
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
                  sel: 'span',
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
              sel: 'span',
              spaced: true,
              has: [
                makeCard({
                  classes,
                  sel: 'span',
                  has: 'ga'
                }),
                makeCard({
                  classes,
                  sel: 'span',
                  has: 'ga'
                }),
                makeCard({
                  classes,
                  sel: 'span',
                  has: 'ga'
                }).map(WithFlexible({ classes })),
                makeCard({
                  classes,
                  sel: 'span',
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

module.exports = {
  default: WithSwitchesPage,
  WithSwitchesPage
}