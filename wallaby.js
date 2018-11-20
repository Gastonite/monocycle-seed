module.exports = function () {
  return {
    files: [
      'src/**/*.js',
      '!src/**/*spec.js',
      '!node_modules/**/*',
      '!old/**/*',
    ],

    tests: [
      'src/**/*spec.js',
    ],
    env: {
      type: 'node'
    },
    setup: function (wallaby) {
      // console.log('setup', wallaby)
      var mocha = wallaby.testFramework;
      mocha.ui('tdd');
      mocha.timeout(10000);
      // etc.
      // require('module-alias/register')

    }
  };
};
