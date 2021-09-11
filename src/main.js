import { noop } from './util/fxn'
import { STS as createSTS, S3 as createS3 } from 'aws-sdk'
import createLogger from './util/logger'
import createGetKey from './get-asset-key'
import createIsAssetAvailable from './is-asset-available'
import createGetSignedUrl from './get-signed-url'
import createRepushAsset from './repush'

export default ({
  s3: s3Options,
  STS = createSTS,
  S3 = createS3,
  getVersion = noop
}) => assetName => async (options = {}) => {
  const log = createLogger('lib:main')
  log('Getting Asset information')
  const stsCLient = new STS(s3Options)
  log('STS client created')
  await stsCLient.getCallerIdentity().promise()
  log('Identity verified')
  const s3Client = new S3(s3Options)
  log('S3 client created')
  const version = await getVersion()
  log('Asset Version', version)
  const isAvailable = createIsAssetAvailable({ s3Options, s3Client, version, assetName })(options)
  log('IsAvailable Created')
  const getSignedUrl = createGetSignedUrl({ s3Options, s3Client, version, assetName })(options)
  log('getSignedUrl Created')
  const repush = createRepushAsset({ s3Options, s3Client, version, assetName })(options)
  log('repush created')
  const getKey = createGetKey({ s3Options, s3Client, version, assetName })(options)
  log('getKey created')
  return {
    getKey,
    isAvailable,
    getSignedUrl,
    repush,
    queue: repush
  }
}
