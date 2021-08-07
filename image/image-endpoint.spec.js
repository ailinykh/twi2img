const config = require('../lib/config')
const handle = require('.')

jest.mock('./image-puppeteer', () => ({ path }) => {
  const fs = require('fs')
  fs.writeFileSync(path, 'success')
})

describe('image endpoint', () => {
  it('loads image from twitter if there is no local file', async () => {
    const fs = require('fs')
    const username = 'username'
    const tweetId = 1234567890
    const filename = `${config.working_dir}/${username}-${tweetId}.png`
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
    const fs = require('fs')
    const username = 'username'
    const tweetId = 1234567890
    const req = {
      method: 'GET',
      pathParams: { username, tweetId }
    }

    fs.writeFileSync(`${config.working_dir}/${username}-${tweetId}.png`, 'it works')
    const res = await handle(req)

    expect(res.data.toString()).toBe("it works")
  })
})
