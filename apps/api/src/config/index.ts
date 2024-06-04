import dotenv from 'dotenv'
dotenv.config()

const config = {
  DATABASE_URL: process.env.DATABASE_URL,
  AZURE_BLOB_CONTAINER: process.env.AZURE_BLOB_CONTAINER,
  AZURE_STORAGE_ACCOUNT_NAME: process.env.AZURE_STORAGE_ACCOUNT_NAME,
  AZURE_STORAGE_ACCOUNT_ACCESS_KEY: process.env.AZURE_STORAGE_ACCOUNT_ACCESS_KEY,
  port: process.env.PORT || 8080,
  jwtSecret: process.env.JWT_SECRET || 'secret',
  MAIL_HOST: process.env.MAIL_HOST,
  MAIL_USER: process.env.MAIL_USER,
  MAIL_PASS: process.env.MAIL_PASS,
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
  GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
  ALLOWED_HOSTS: process.env.ALLOWED_HOSTS,
  AUTH_REDIRECT_URL: process.env.AUTH_REDIRECT_URL,
  CLIENT_URL: process.env.CLIENT_URL,
  COOKIE_SECRET: process.env.COOKIE_SECRET || '998awheifuabskjdbfiuwrb',
  REDIS_PASSWORD: process.env.REDIS_PASSWORD,
  REDIS_PORT: process.env.REDIS_PORT,
  REDIS_HOST: process.env.REDIS_HOST
}

export default config
