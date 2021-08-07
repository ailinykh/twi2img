const Koa = require('koa')
const Router = require('@koa/router')

const adaptRequest = require('./helpers/adapt-request')
const handleImageRequests = require('./image')

const app = new Koa()
const router = new Router().prefix('/get')

if (process.env.isDevelopment) {
    const logger = require('koa-logger')
    app.use(logger())
}

router.get('/:username/:tweetId', (ctx) => {
  ctx.req.params = ctx.req.params || ctx.params
  const httpRequest = adaptRequest(ctx.req)
  return handleImageRequests(httpRequest)
    .then(({ headers, statusCode, data }) => {
      ctx.set(headers)
      ctx.status = statusCode
      ctx.body = data
    })
    .catch(e => {
      console.log('exception handler')
      console.error(e)
      ctx.status = 500
      ctx.res.end()
    })
})

app.use(router.routes())
app.use(router.allowedMethods())

module.exports = app
