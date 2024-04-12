import config from './config'
import express, { Express, Request, Response } from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import router from './routes/index.routes'
import { prisma } from './utils/prisma'
import multer from 'multer'

const app: Express = express()

// Multer configuration
const upload = multer()

app.use(express.raw())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cookieParser())
app.use(
  cors({
    origin: [
      'http://localhost:3000',
      'http://localhost:8080',
      'http://localhost:5172',
      'http://localhost:5173',
      'http://localhost:5174',
      'http://localhost:5175'
    ],
    credentials: true
  })
)

// Use multer for parsing multipart/form-data
app.use(upload.any())

app.use('/api/v1', router)

app.get('/', async (req: Request, res: Response) => {
  res.send('I am healthy')
})

app.listen(config.port, async () => {
  console.log(`[server]: Server is running at http://localhost:${config.port}`)
  try {
    console.log('Connecting to DB......')
    await prisma.$connect()
    console.log('DB connected successful.')
  } catch (error) {
    console.error('Error in Connecting to DB ', error)
    process.exit(1)
  }
})
