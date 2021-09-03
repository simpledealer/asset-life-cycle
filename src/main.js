import { noop } from '@meltwater/phi'
import { STS as createSTS, S3 as createS3 } from 'aws-sdk'
import createLogger from './util/logger'
import createIsAssetAvailable from './is-asset-available'
import createGetSignedUrl from './get-signed-url'
import createRepushAsset from './repush'

export default ({
  s3: s3Options,
  STS = createSTS,
  S3 = createS3,
  getVersion = noop()
}) => assetName => async (options = {}) => {
  const log = createLogger('lib:main')
  log('Getting Asset information')
  const stsCLient = new STS(s3Options)
  await stsCLient.getCallerIdentity().promise()
  const s3Client = new S3(s3Options)
  const version = await getVersion()
  const isAvailable = createIsAssetAvailable({ s3Options, s3Client, version, assetName })(options)
  const getSignedUrl = createGetSignedUrl({ s3Options, s3Client, version, assetName })(options)
  const repush = createRepushAsset({ s3Options, s3Client, version, assetName })(options)
  console.log('isAvailable', isAvailable)
  return {
    isAvailable,
    getSignedUrl,
    repush
  }
}
