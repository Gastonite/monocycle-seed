require('module-alias/register')
const { ok } = require('assert')
const isFunction = require('lodash/isFunction')
const { FromJson } = require('./index.js')

suite('json', () => {

  test('should be a function', () => {

    ok(isFunction(FromJson))
  });

  setup(() => {
    // ...
  });

  suite('fromJson()', () => {

    let fromJson

    test('should return a function', () => {

      fromJson = FromJson()
      ok(isFunction(fromJson))
    });

    // test('should parse json', () => {

    //   ok(isFunction(fromJson({
    //     "has": [
    //       ["makeButton", "pwet"]
    //     ]
    //   })))
    // });


  });
});
