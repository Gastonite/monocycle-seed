module.exports = function () {
  return {
    files: [
      'src/**/*.js',
      '!src/**/test.js',
      '!src/**/test/index.js',
      '!node_modules/**/*',
    ],

    tests: [
      'src/**/test.js',
      'src/**/test/index.js',
    ],
    env: {
      type: 'node'
    },
    setup: function (wallaby) {
      // console.log('setup', wallaby)
      var mocha = wallaby.testFramework;
      mocha.ui('tdd');
      mocha.timeout(5000);
      // etc.
      // require('module-alias/register')

    }
  };
};
