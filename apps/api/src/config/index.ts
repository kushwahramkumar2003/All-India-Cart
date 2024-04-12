import dotenv from "dotenv";
dotenv.config();

const config = {
  DATABASE_URL: process.env.DATABASE_URL,
  AZURE_BLOB_CONTAINER: process.env.AZURE_BLOB_CONTAINER,
  AZURE_STORAGE_ACCOUNT_NAME: process.env.AZURE_STORAGE_ACCOUNT_NAME,
  AZURE_STORAGE_ACCOUNT_ACCESS_KEY:
    process.env.AZURE_STORAGE_ACCOUNT_ACCESS_KEY,
  port: process.env.PORT || 8080,
  jwtSecret: process.env.JWT_SECRET || "secret",
  MAIL_HOST: process.env.MAIL_HOST,
  MAIL_USER: process.env.MAIL_USER,
  MAIL_PASS: process.env.MAIL_PASS
};

export default config;
