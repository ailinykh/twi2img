const fs = require('fs')
const makeImagePath = require('./image-path')

module.exports = function makeImageEndpointHandler({ twitterApi }) {
  return async function handler(httpRequest) {
    switch (httpRequest.method) {
      case 'GET':
        return getImage(httpRequest)
      default:
        throw new Error('Method not allowed')
    }
  }

  async function getImage(httpRequest) {
    const { username, tweetId } = httpRequest.pathParams
    console.info(`processing:: https://twitter.com/${username}/status/${tweetId}`)
    const path = makeImagePath({ username, tweetId })

    if (!fs.existsSync(path)) {
      await twitterApi.getImage({ username, tweetId, path })
    }

    const result = fs.readFileSync(path)

    return {
      headers: {
        'Content-Type': 'image/png'
      },
      statusCode: 200,
      // data: JSON.stringify(result)
      data: result
    }
  }
}
