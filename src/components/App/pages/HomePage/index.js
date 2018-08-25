const Cycle = require('component')
const { default: $ } = require('xstream');
const { section, h1, p } = require('@cycle/dom');

const HomePageView = () => {


  return (
    section('.home', [
      h1('The homepage!!!'),
      p('Welcome to our spectacular web page with nothing special here.'),
    ])
  );
}

const HomePage = sources => {

  return {
    DOM: $.of(HomePageView())
  }
}

module.exports = Cycle(HomePage)