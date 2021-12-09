import createLogger from './util/logger'
import createGetKey from './get-asset-key'
import createGetAssetUrl from './get-asset-url'
import createUploadAsset from './upload-asset'

export default ({ s3ServiceClient }) => {
  const log = createLogger('lib:main')
  log('Asset library ready')
  const getKey = createGetKey()
  const getAssetUrl = createGetAssetUrl({ s3ServiceClient })
  const uploadAsset = createUploadAsset({ s3ServiceClient })
  return { getKey, getAssetUrl, uploadAsset }
}
