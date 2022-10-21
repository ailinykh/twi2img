const getFile = require('./image-puppeteer')
const makeImageAPI = require('./image-api')
const makeImageEndpointHandler = require('./image-endpoint')

const twitterApi = makeImageAPI({getFile})
const imageEndpointHandler = makeImageEndpointHandler({twitterApi})

module.exports = imageEndpointHandler
