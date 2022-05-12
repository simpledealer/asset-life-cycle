import createLogger from './util/logger'
import createGetKey from './get-asset-key'
import createGetAssetUrl from './get-asset-url'
import createUploadAsset from './upload-asset'

export default ({ awsServiceClient }) => {
  const log = createLogger('lib:main')
  log('Asset library ready')
  const getKey = createGetKey()
  const getAssetUrl = createGetAssetUrl({ awsServiceClient })
  const uploadAsset = createUploadAsset({ awsServiceClient })
  return { getKey, getAssetUrl, uploadAsset }
}
