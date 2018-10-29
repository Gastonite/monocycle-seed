const { WithLayout, makeLayout } = require('components/Layout')
const { makeParagraph } = require('components/Paragraph')

const WithHomePage = ({ classes } = {}) => {

  return WithLayout({
    direction: 'column',
    classes,
    has: [

      makeLayout({
        direction: 'column',
        spaced: true,
        style: {
          margin: 'auto',
          fontSize: '2.4rem',
          maxWidth: '80rem',
          // margin: 'auto'
        },
        classes,
        has: [
          makeParagraph([
            `Vbi curarum abiectis ponderibus aliis tamquam nodum et codicem difficillimum`,
            `Caesarem convellere nisu valido cogitabat, eique deliberanti cum proximis clandestinis `,
            `antequam effundendis rebus pertinacius incumberet confidentia, acciri mollioribus scriptis per simulationem `,
            `tractatus publici nimis urgentis eundem placuerat Gallum, ut auxilio destitutus sine ullo interiret obstaculo.`,
          ]),
          makeParagraph([
            `Hac ex causa conlaticia stipe Valerius humatur ille Publicola `,
            `et subsidiis amicorum mariti inops `,
            `cum liberis uxor alitur Reguli et dotatur ex aerario filia Scipionis, `,
            `cum nobilitas florem adultae virginis diuturnum absentia pauperis erubesceret patris.`,
          ]),
        ]
      }),
    ]
  })
}

module.exports = {
  default: WithHomePage,
  WithHomePage
}