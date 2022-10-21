const requiredParam = require('../helpers/required-param')

module.exports = function makeImage(imageInfo = requiredParam('imageInfo')) {
  const image = validate(imageInfo)
  return Object.freeze(image)

  function validate({
    url = requiredParam('url'),
    username = requiredParam('username'),
    tweetId = requiredParam('tweetId'),
  } = {}) {
    return {username, tweetId, url}
  }
}
