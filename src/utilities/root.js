const RootElement = (className) => {
  const rootElement = document.createElement('div')
  rootElement.classList.add(className)
  document.body.insertBefore(rootElement, document.body.firstChild)
  return rootElement
}


module.exports = ({ className = 'root' } = {}) => {
  
  let root = document.querySelector(`.${className}`)
  
  root && root.parentNode.removeChild(root)
  
  return RootElement(className)
}