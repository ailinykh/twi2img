const os = require('os')

module.exports = {
  working_dir: process.env.WORKING_DIR || os.tmpdir(),
  host: process.env.host || 'localhost',
  port: process.env.PORT || 8000,
  amqp: process.env.amqp || 'amqp://localhost',
}
