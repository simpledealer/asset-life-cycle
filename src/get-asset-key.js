import { prop } from '@meltwater/phi'
import { v4 as getUuid } from 'uuid'

const pathSeperators = { queue: '/', result: '.' }
export const getExtension = (destinationType, assetType) => `${prop(destinationType, pathSeperators)}${assetType}`

export default ({ version, assetName = 'sales-credit-form' }) => ({
  dealershipId,
  applicationId,
  assetType,
  uuid = getUuid(),
  resultOrQueue = 'result'
}) => () =>
  `${version}/${resultOrQueue}/${assetName}/${dealershipId}/${applicationId}/${uuid}${getExtension(resultOrQueue, assetType)}`
