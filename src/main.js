import createLogger from './util/logger'
import createPrint from './print'

export default () => async () => {
  const log = createLogger('lib:main')
  log('Printing started')
  const print = createPrint()
  print('Hello World')
  return true
}
