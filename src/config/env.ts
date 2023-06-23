import dotenv from 'dotenv'
dotenv.config()

const env = {
  environment: process.env.NODE_ENV,
  port: Number(process.env.BACKEND_PORT) || Number(process.env.PORT),
  isNodemon: !!process.env.NODEMON,
  cors: !!process.env.CORS
}

export default env
