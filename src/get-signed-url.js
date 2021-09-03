import createLogger from './util/logger'
import createGetKey from './get-asset-key'

export const getSignedUrlPromise = ({
  operation,
  params,
  s3Client
}) => new Promise((resolve, reject) => {
  s3Client.getSignedUrl(operation, params, (err, url) =>
    err ? reject(err) : resolve(url)
  )
})

export default ({ s3Options, s3Client, assetName, version }) => options => async ({ ttl = 600 } = {}) => {
  const log = createLogger('getSignedUrl')
  const { bucket: Bucket } = s3Options
  const key = createGetKey({ version, assetName })(options)()
  log('Getting Signed Url', key)
  const operation = 'getObject'
  const params = { Key: key, Bucket, Expires: ttl }
  const url = await getSignedUrlPromise({ operation, params, s3Client })
  return url
}
