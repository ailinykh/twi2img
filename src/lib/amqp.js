const amqp = require('amqplib')
const config = require('./config')

module.exports = async function run({handleMessage}) {
  try {
    const queueName = 'twitter_queue'
    conn = await amqp.connect(config.amqp)
    chan = await conn.createChannel()
    result = await chan.assertQueue(queueName, {durable: false})

    chan.prefetch(1)
    chan.consume(queueName, async (msg) => {
      try {
        const request = JSON.parse(msg.content.toString())
        const data = JSON.stringify(await handleMessage(request))
        chan.sendToQueue(msg.properties.replyTo, Buffer.from(data), {
          correlationId: msg.properties.correlationId,
        })
        chan.ack(msg)
      } catch (e) {
        console.info(msg.content.toString())
        console.error(e)
      }
    })
  } catch (e) {
    console.error(e)
  }
}
