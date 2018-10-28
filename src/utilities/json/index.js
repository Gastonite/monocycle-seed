const { Stream: $ } = require('xstream')
const castArray = require('lodash/castArray')
const isFunction = require('lodash/isFunction')
const isString = require('lodash/isString')
const pipe = require('ramda/src/pipe')
const over = require('ramda/src/over')
const prop = require('ramda/src/prop')
const filter = require('ramda/src/filter')
const startsWith = require('ramda/src/startsWith')
const __ = require('ramda/src/__')
const lensProp = require('ramda/src/lensProp')
const either = require('ramda/src/either')
const both = require('ramda/src/both')
const unless = require('ramda/src/unless')
const when = require('ramda/src/when')
const always = require('ramda/src/always')
const lensIndex = require('ramda/src/lensIndex')
const Cycle = require('component')

const parseOptions = pipe(
  over(lensProp('functions'), pipe(
    castArray,
    filter(isFunction)
  ))
)
const FromJson = (options = {}) => {

  const {
    functions
  } = parseOptions(options)


  const parseSchema = pipe(
    // castArray,
    when(
      both(
        Array.isArray,
        pipe(
          lensIndex(0),
          both(
            isString,
            startsWith('&')
          )
        )
      ),

    // over(lensIndex(0), pipe(
    //   either(
    //     prop(__, functions),
    //     always(Cycle)
    //   ),
    // )),
    ([f, options]) => {

      return () => {
        return () => {
        
        }
      }
      // return either(
      //   prop(__, functions),
      //   always(Cycle)
      // )(f)(options)

      return () => f(options)
      return f(pipe(
        Cycle.coerce,
        // over(lensProp('has'),
        //   parseSchema
        // ),
      )(options))
    }
    )

  )

  return (schema) => {
    // return () => {

      
    // }
    return parseSchema(schema)


    // // console.log('yo', s)

    // return s
    // // const 
    // // const 
    // return () => ({
    //   DOM: $.of({
    //     children: [
    //       {
    //         text: 'pwet'
    //       }
    //     ]
    //   })
    // })

  }
}

module.exports = {
  default: FromJson,
  FromJson
}