import createLogger from './util/logger'
import createGetKey from './get-asset-key'

export default ({ s3Options, s3Client, assetName, version }) => options => ({ ttl = 30000 } = {}) => {
  const log = createLogger('isAvailable')
  const { bucket: Bucket } = s3Options
  const key = createGetKey({ version, assetName })(options)()
  return new Promise(resolve => {
    log('Checking', key)
    let [intervalPointer, timeOutPointer] = [null, null]
    const clearIntervals = () => {
      if (intervalPointer) clearInterval(intervalPointer)
      if (timeOutPointer) clearInterval(timeOutPointer)
    }
    intervalPointer = setInterval(() => {
      s3Client.headObject({ Bucket, Key: key }).promise()
        .then(result => {
          log('Found', result)
          clearIntervals()
          resolve(true)
        })
        .catch(() => { log('Not found', key) })
    }, 1000)
    timeOutPointer = setTimeout(() => {
      // this means we could not get the item on time
      clearIntervals()
      resolve(false)
    }, ttl)
    return key
  })
}
