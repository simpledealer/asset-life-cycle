import debug from 'debug'
import { name as applicationName } from '../../package.json'

console.log('the name is ', applicationName)
export default logName => debug(`${applicationName}:${logName}`)
