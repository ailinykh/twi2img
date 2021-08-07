const fs = require('fs')
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
    const basedir = `${config.working_dir}/${username}`
    const path = `${basedir}/${tweetId}.png`

    if (!fs.existsSync(basedir)) {
      fs.mkdirSync(basedir, { recursive: true })
    }

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
