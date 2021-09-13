import { strict as assert } from 'assert'
import { compose, includes, not, when, is } from './util/fxn'
import createLogger from './util/logger'
import createGetKey from './get-asset-key'

export const condParseToJson = when(compose(not, is(String)), obj => JSON.stringify(obj))
export const validateQueueKey = key => {
  assert(key, 'The key can not be empty')
  assert(includes('/queue/', key), 'The key must include /queue/')
  assert(compose(not, includes('.'))(key), 'Key must not contain a .')
}
export default ({ s3Options, s3Client, assetName, version }) => options => async ({ ttl = 600, body = null } = {}) => {
  const log = createLogger('Queuing')
  const { bucket: Bucket } = s3Options
  const key = createGetKey({ version, assetName })(options)()
  validateQueueKey(key)
  log('Key', key)
  const params = { Key: key, Bucket, Expires: ttl, Body: (body ? condParseToJson(body) : null) }
  log('Params', params)
  await s3Client.putObject(params).promise()
  return true
}
