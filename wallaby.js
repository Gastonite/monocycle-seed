module.exports = function () {
  return {
    files: [
      'src/**/*.js',
      '!src/**/*spec.js',
      '!node_modules/**/*',
      '!old/**/*',
    ],

    tests: [
      'src/components/Counter/*.spec.js',
      // 'src/**/*spec.js',
    ],
    env: {
      type: 'node'
    },
    testFramework: 'ava',
    setup: wallaby => {

    }
  }
}
