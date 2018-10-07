const { scrollY, vertical, flex, layerParent, fillParent } = require('csstips/lib')


module.exports = ({
  colors = {}
} = {}) => {


  return [
    // padding(em(2), em(8)),
    vertical,
    // horizontal,
    flex,
    fillParent,
    layerParent,
    {
      $debugName: 'App',
      color: colors.default,
      fontSize: '2.2rem',

      '& .container': {
        backgroundColor: colors.background,
        backgroundPosition: 'center',
        // ...fillParent,
        

        // background: 'red'
        // ...scrollY
        // minHeight: '40vh',
        // marginTop: 'calc(60vh + 11rem)',
        // maxWidth: '120rem',
        // margin: '0 auto 8rem',
        // '& > *': {
        //   // background: 'red'
        //   // ...scrollY
        //   // padding: '2.4rem',
        // },
      },
      '& .banner': {
        // ...pageTop,
        height: '100vh',
        width: '100%',
        position: 'fixed',
        // backgroundPosition: 'center 11rem',
        // backgroundSize: 'auto 40rem',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        marginTop: '11rem'
      },
      '& h2': {
        marginBottom: '2rem',
        // fontSize: '2.4rem'

      },
      '& small': {
        fontSize: '1.5rem'
      },
      //   backgroundSize: 'contain',
      // backgroundRepeat: 'no-repeat',
      // ...layerParent,

      //   backgroundAttachment: 'fixed',
      //   backgroundPosition: '0 8em',

      //   // background
      //   // '& > img': {
      //   //   maxHeight: viewHeight(42)
      //   // }
      //   ...verticallySpaced(em(1))
    }
  ]
}
