const puppeteer = require('puppeteer');

module.exports = async function makeFile({ username, tweetId, path }) {
  const url = `https://twitter.com/${username}/status/${tweetId}`
  console.info(`getting url: ${url}`)
  const browser = await puppeteer.launch({
    args: [
        '--no-sandbox',
        '--disable-setuid-sandbox'
    ]
  });
  const page = await browser.newPage();
  await page.setUserAgent('Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36');
  await page.setViewport({width: 800, height: 1080, deviceScaleFactor: 2});
  await page.goto(url, {
    waitUntil: 'networkidle2',
  });

  // await page.screenshot({ path: `${path}-original.png` });

  const a = await page.$(`a[href="/${username}/status/${tweetId}"]`)

  // remove Reply/Retweet/Like/Share
  const [div] = await a.$x('../../../..');
  await div.evaluate((node) => node.removeChild(node.lastChild))

  // find nearest article
  const [article] = await a.$x('ancestor::article');
  if (article == null) {
      throw('article not found in DOM')
  }
  await article.screenshot({ path });
  await browser.close();

  return path
}
