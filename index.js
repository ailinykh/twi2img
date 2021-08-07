require('dotenv').config()

const app = require('./app')
const config = require('./lib/config')

app.listen(config.port, () => {
  console.info(`App is running at http://${config.host}:${config.port}`)
})
