import { prop } from '@meltwater/phi'
import createLogger from './util/logger'
import getSalesCreditForm from './sales-credit-form/get-urls'
export const assetTree = {
  'sales-form-credit': getSalesCreditForm
}
export default ({ s3Options, s3Client, assetName, version }) => options => ({ ttl = 30000 } = {}) => {
  const log = createLogger('isAvailable')
  const { bucket: Bucket } = s3Options
  const keyFinder = prop(assetName, assetTree)
  const key = keyFinder({ version, assetName })(options)
  return new Promise((resolve, reject) => {
    log('Checking', key)
    let [intervalPointer, timeOutPointer] = [null, null]
    const clearIntervals = () => {
      if (intervalPointer) clearInterval(intervalPointer)
      if (timeOutPointer) clearInterval(timeOutPointer)
    }
    intervalPointer = setInterval(() => {
      s3Client.headObject({
        Bucket,
        Key: key
      }).promise()
        .then(result => {
          log('Found', result)
          clearIntervals()
          resolve(true)
        })
        .catch(() => {
          log('Not found', key)
        })
    }, 1000)
    timeOutPointer = setTimeout(() => {
      // this means we could not get the item on time
      clearIntervals()
      resolve(false)
    }, ttl)
    return key
  })
}
