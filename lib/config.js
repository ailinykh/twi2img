const os = require('os')

module.exports = {
  working_dir: process.env.WORKING_DIR || os.tmpdir(),
  host: process.env.host || 'localhost',
  port: process.env.PORT || 8000
}
