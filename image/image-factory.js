const fs = require('fs')

const config = require('../lib/config')
const makeImagePath = require('./image-path')
const makeImage = require('./image')

module.exports = async function createImage({ username, tweetId, makeFile }) {
  const path = makeImagePath({ username, tweetId })

  if (!fs.existsSync(path)) {
    await makeFile({ username, tweetId, path })
  }

  const port = !config.port || config.port == '80' || !process.env.isDevelopment ? '' : ':' + config.port
  return makeImage({
    username,
    tweetId,
    url: `http://${config.host}${port}/${username}/${tweetId}.png`
  })
}
