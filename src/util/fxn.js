export const compose = (...functions) => x => functions.reduceRight((acc, fn) => fn(acc), x)
export const includes = sub => mainStr => mainStr.includes(sub)
export const not = val => !val
export const noop = () => {}
export const prop = (propName, obj) => obj[propName]
