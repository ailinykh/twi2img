const fs = require('fs')
const path = require('path')
const config = require('../lib/config')
const handle = require('.')

jest.mock('./image-puppeteer', () => async ({ path }) => {
  await createFile(path, 'success')
})

describe('image endpoint', () => {
  it('loads image from twitter if there is no local file', async () => {
    const username = 'username'
    const tweetId = 1234567890
    const filename = `${config.working_dir}/${username}/${tweetId}.png`
    const req = {
      method: 'GET',
      pathParams: { username, tweetId }
    }

    if (fs.existsSync(filename)) {
      fs.unlinkSync(filename)
    }

    const data = {
      username,
      tweetId,
      url: `http://${config.host}${process.env.isDevelopment ? ':' + config.port : ''}/${username}/${tweetId}.png`
    }

    const res = await handle(req)

    expect(res.headers['Content-Type']).toBe('application/json')
    expect(res.data).toBe(JSON.stringify(data))
  })

  it('returns local file if any', async () => {
    const username = 'another_username'
    const tweetId = 1234567890
    const filename = `${config.working_dir}/${username}/${tweetId}.png`
    const req = {
      method: 'GET',
      pathParams: { username, tweetId }
    }

    const data = {
      username,
      tweetId,
      url: `http://${config.host}${process.env.isDevelopment ? ':' + config.port : ''}/${username}/${tweetId}.png`
    }

    await createFile(filename, 'it works')
    const res = await handle(req)

    expect(res.data).toBe(JSON.stringify(data))
  })
})

const createFile = async (filepath, data) => {
  return new Promise((resolve, reject) => {
    const dirname = path.dirname(filepath)
    if (!fs.existsSync(dirname)) {
      fs.mkdirSync(dirname)
    }
    fs.writeFile(filepath, data, {}, (err) => {
      if (err) {
        reject(err)
      } else {
        resolve()
      }
    })
  })
}
