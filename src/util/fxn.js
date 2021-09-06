export function curry (func) {
  return function curried (...args) {
    if (args.length >= func.length) {
      return func.apply(this, args)
    } else {
      return function (...args2) {
        return curried.apply(this, args.concat(args2))
      }
    }
  }
}
export const compose = (...functions) => x => functions.reduceRight((acc, fn) => fn(acc), x)
export const includes = curry((sub, mainStr) => mainStr.includes(sub))
export const not = val => !val
export const noop = () => {}
export const prop = curry((propName, obj) => obj[propName])
export const when = curry((cond, fxn, input) => cond(input) ? fxn(input) : input)
export const is = curry((type, inst) => inst instanceof type)
