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

    const res = await handle(req)

    expect(res.headers['Content-Type']).toBe('image/png')
    expect(res.data.toString()).toBe("success")
  })

  it('returns local file if any', async () => {
    const username = 'another_username'
    const tweetId = 1234567890
    const filename = `${config.working_dir}/${username}/${tweetId}.png`
    const req = {
      method: 'GET',
      pathParams: { username, tweetId }
    }

    await createFile(filename, 'it works')
    const res = await handle(req)

    expect(res.data.toString()).toBe("it works")
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
