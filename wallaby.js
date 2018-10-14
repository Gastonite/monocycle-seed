module.exports = function () {
  return {
    files: [
      'src/**/*.js',
      '!src/**/test.js',
    ],

    tests: [
      'src/**/test.js'
    ],
    env: {
      type: 'node'
    },
    setup: function (wallaby) {
      // console.log('setup', wallaby)
      var mocha = wallaby.testFramework;
      mocha.ui('tdd');
      // etc.
      // require('module-alias/register')

    }
  };
};
