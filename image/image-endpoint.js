const fs = require('fs')
const makeImagePath = require('./image-path')
const makeImage = require('./image')
const config = require('../lib/config')

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

    const port = !config.port || config.port == '80' ? '' : ':' + config.port
    const image = makeImage({
      username,
      tweetId,
      url: `http://${config.host}${port}/${username}/${tweetId}.png`
    })

    return {
      headers: {
        'Content-Type': 'application/json'
      },
      statusCode: 200,
      data: JSON.stringify(image)
    }
  }
}
