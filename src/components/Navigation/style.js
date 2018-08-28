const { padding, horizontal } = require('csstips/lib')

const { em } = require('csx/lib')

module.exports = ({
  LinkList
} = {}) => {

  return [
    {
      $debugName: 'Navigation',
      '& > ul': {
      // [`& > .${LinkList}`]: {
        ...horizontal,
        listStyle: 'none',
        ...padding(0),
      }
    }
  ]
}
