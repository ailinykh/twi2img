const createImage = require('./image-factory')

module.exports = function makeImageEndpointHandler({twitterApi}) {
  return async function handler(httpRequest) {
    switch (httpRequest.method) {
      case 'GET':
        return getImage(httpRequest)
      default:
        throw new Error('Method not allowed')
    }
  }

  async function getImage(httpRequest) {
    const {username, tweetId} = httpRequest.pathParams
    console.info(
      `processing:: https://twitter.com/${username}/status/${tweetId}`,
    )

    const image = await createImage({
      username,
      tweetId,
      makeFile: twitterApi.getImage,
    })

    return {
      headers: {
        'Content-Type': 'application/json',
      },
      statusCode: 200,
      data: JSON.stringify(image),
    }
  }
}
