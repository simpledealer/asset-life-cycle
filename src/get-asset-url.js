import axios from 'axios'
import { success } from 'awaiting'
import { delayedPromiseRetry } from 'delayed-promise-retry'
import createLogger from './util/logger'
import createGetKey from './get-asset-key'

export const createAxiosClient = () => {
  const axiosClient = axios.create({})
  return axiosClient
}

export default ({ s3ServiceClient }) => async ({
  version = 'v0',
  resourceId,
  instanceId,
  extension,
  bucket = 'enrich-form-service-data',
  signedUrlExpiration = 120,
  waitPeriod = 30000,
  retries = 4
} = {}) => {
  const log = createLogger('getAssetUrl')
  const getKey = createGetKey()
  const key = getKey({
    version,
    resourceId,
    instanceId,
    extension
  })
  log('Using key', { key })
  const headObjectParams = { bucket, key, signedUrlExpiration, operation: 'headObject' }
  const { data: { url: headSignedUrl } } = await s3ServiceClient.get('/', { params: headObjectParams })
  log({ headSignedUrl })
  const signedUrl = await success(delayedPromiseRetry(async () => {
    const axiosClient = createAxiosClient()
    log('Trying head request', headSignedUrl)
    await axiosClient.head(headSignedUrl) // this throws if the asset does not exist
    const getObjectParams = { bucket, key, signedUrlExpiration, operation: 'getObject' }
    const { data: { url: getObjectSignedUrl } } = await s3ServiceClient.get('/', { params: getObjectParams })
    log(getObjectSignedUrl)
    return getObjectSignedUrl
  }, retries, waitPeriod))
  log(signedUrl)
  return signedUrl
}
