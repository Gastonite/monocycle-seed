const { vertical, flex, layerParent, fillParent } = require('csstips/lib')


module.exports = () => {

  console.log('AppStyle()')

  return [
    // padding(em(2), em(8)),
    vertical,
    flex,
    fillParent,
    layerParent,
    {
      $debugName: 'App',
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
