import axios from 'axios'
import createLogger from './util/logger'
import createGetKey from './get-asset-key'

export const createAxiosClient = () => axios.create({})

export default ({ awsServiceClient }) => async ({
  version = 'v0',
  resourceId,
  instanceId,
  extension,
  bucket = 'enrich-form-service-data',
  signedUrlExpiration = 120,
  contentType = 'application/json',
  data = null
} = {}) => {
  const log = createLogger('uploadAssetUrl')
  const getKey = createGetKey()
  const key = getKey({ version, resourceId, instanceId, extension })
  log('Using key', { key })
  const putObjectParams = { bucket, key, signedUrlExpiration, operation: 'putObject', contentType }
  const { data: { url: uploadSignedUrl } } = await awsServiceClient.get('/s3', { params: putObjectParams })
  log({ uploadSignedUrl })
  const axiosClient = createAxiosClient()
  await axiosClient.put(uploadSignedUrl, data, { headers: { 'content-type': contentType } })
  log('Uploaded')
  return true
}
