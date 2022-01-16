const config = require('../lib/config')
const fs = require('fs')

// TODO: make async
module.exports = function makeImagePath({ tweetId, username }) {
  const basedir = `${config.working_dir}/${username}`
  const path = `${basedir}/${tweetId}.png`

  if (!fs.existsSync(basedir)) {
    fs.mkdirSync(basedir, { recursive: true })
  }

  return path
}
