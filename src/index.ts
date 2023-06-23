console.clear()
import dotenv from 'dotenv'
dotenv.config()
process.on('uncaughtException', console.error)
import './config/http'
import './socket/room'
