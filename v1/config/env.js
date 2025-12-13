process.loadEnvFile('.env')

const envName = process.env.ENV_NAME === 'production' ? 'prod' : 'dev'

if (envName === 'prod') process.loadEnvFile('.env.prod')

  const env={
    'envName':envName,
    'port':process.env.PORT,
    'DB_HOST':process.env.DB_HOST,
    'DB_USER':process.env.DB_USER,
    'DB_PASSWORD':process.env.DB_PASSWORD,
    'DB_NAME':process.env.DB_NAME,
    'JWT_SECRET': process.env.JWT_SECRET
  }

  export default env