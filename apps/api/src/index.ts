import config from './config'
import express, { Express, Request, Response } from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import router from './routes/index.routes'
import { prisma } from './utils/prisma'
import multer from 'multer'
import { initPassport } from './utils/passport'
import session from 'express-session'
import passport from 'passport'
import redisClient from './utils/redisClient'

const app: Express = express()

// Multer configuration
const upload = multer()

const corsOptions = {
  origin: [
    'http://localhost:3000',
    'http://localhost:8080',
    'http://localhost:5172',
    'http://localhost:5173',
    'http://localhost:5174',
    'http://localhost:5175'
  ],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  optionsSuccessStatus: 204
}

app.use(cors(corsOptions))
app.options('*', cors(corsOptions)) // Pre-flight handling

app.use(
  session({
    secret: config.COOKIE_SECRET || 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, maxAge: 24 * 60 * 60 * 1000 }
  })
)
app.use(express.raw())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cookieParser())
initPassport()
app.use(passport.initialize())
app.use(passport.authenticate('session'))
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
    await redisClient.connect()
    console.log('DB connected successful.')
  } catch (error) {
    console.error('Error in Connecting to DB ', error)
    process.exit(1)
  }
})
