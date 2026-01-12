import dotenv from "dotenv";

dotenv.config();

const envFile = process.env

const envName = envFile.ENV_NAME === 'production' ? 'prod' : 'dev'

const env = {
  'envName': envName,
  'port': envFile.PORT || 8080,
  'DB_HOST': envFile.DB_HOST,
  'DB_USER': envFile.DB_USER,
  'DB_PASSWORD': envFile.DB_PASSWORD,
  'DB_NAME': envFile.DB_NAME,
  'JWT_SECRET': envFile.JWT_SECRET
}

export default env