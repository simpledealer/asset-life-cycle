# Asset Life Cycle
Check and preview assets on s3
## Description
This library provides the simple way to handle docs on s3.

### Usage
```
const s3 = {
    accessKeyId: 'xxxxxxxxxxxxxxx',
    secretAccessKey: 'yyyyyyyyyyyyyyyyyy',
    bucket: 'enrich-form-service-data',
    region: 'us-east-1'
  }
  const client = await createAssetClient({
    s3,
    getVersion: always('v0')
  })('sales-form-credit') //

  const formAssets = await client({
    dealershipId: 'zzzzzzzzzzzzzzzzz',
    applicationId: 'cccccccccccccccc',
    assetType: 'pdf',
    uuid: 'ffffffffffffffffffffff',
    resultOrQueue: 'result'
  })
  console.log('isAvailable ', typeof formAssets)
  // const result = await formAssets.isAvailable()
  // const result1 = await formAssets.getSignedUrl()
  const result2 = await formAssets.repush()
  console.log('the result are ', result2)
```

### Tasks
1. Change the package name
2. Update his readMe to talk about your library

## License

This npm package is Copyright (c) 2016-2017 Simple Dealer.

## Warranty

This software is provided by the copyright holders and contributors 'as is' and
any express or implied warranties, including, but not limited to, the implied
warranties of merchantability and fitness for a particular purpose are
disclaimed. In no event shall the copyright holder or contributors be liable for
any direct, indirect, incidental, special, exemplary, or consequential damages
(including, but not limited to, procurement of substitute goods or services;
loss of use, data, or profits; or business interruption) however caused and on
any theory of liability, whether in contract, strict liability, or tort
(including negligence or otherwise) arising in any way out of the use of this
software, even if advised of the possibility of such damage.
