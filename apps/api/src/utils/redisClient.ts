import { createClient } from 'redis'
import config from '../config'

const redisClient = createClient({
  url: config.REDIS_URL,
  pingInterval: 1000 * 60 * 1
})
// const redisClient = createClient({
//   password: config.REDIS_PASSWORD,
//   socket: {
//     host: config.REDIS_HOST,
//     port: Number(config.REDIS_PORT) || 17911
//   }
// })

export default redisClient
