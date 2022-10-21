// const { host, port } = require('../lib/config')
// const makeImage = require('./image')

module.exports = function makeImageAPI({getFile}) {
  return Object.freeze({
    getImage,
  })

  async function getImage({username, tweetId, path}) {
    // const url = `http://${host}${port == '' ? '' : ':'+port}/${path}`
    // return makeImage({url,  username, tweetId })
    const file = await getFile({username, tweetId, path})
    return file
  }
}
