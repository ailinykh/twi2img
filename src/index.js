require('dotenv').config()

const app = require('./app')
const config = require('./lib/config')
const run = require('./lib/amqp')
const createImage = require('./image/image-factory')
const makeFile = require('./image/image-puppeteer')

app.listen(config.port, () => {
  console.info(`App is running at http://${config.host}:${config.port}`)

  run({
    handleMessage: async ({username, tweetId}) => {
      return await createImage({username, tweetId, makeFile})
    },
  })
})
