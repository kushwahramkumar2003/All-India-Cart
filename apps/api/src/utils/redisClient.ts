import { createClient } from 'redis'
import config from '../config'

const redisClient = createClient({
  password: config.REDIS_PASSWORD,
  socket: {
    host: config.REDIS_HOST,
    port: Number(config.REDIS_PORT) || 6379
  }
})

export default redisClient
