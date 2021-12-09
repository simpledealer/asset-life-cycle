import { defaultTo } from '@simple_merchant/fxn'
import { v4 as getUuid } from 'uuid'

export default () => ({
  version = 'v0',
  resourceId,
  instanceId,
  extension = '/json'
}) => `${defaultTo('v_', version)}/${resourceId}/${defaultTo(getUuid(), instanceId)}${extension}`
