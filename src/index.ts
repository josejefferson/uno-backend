// @ts-ignore
console._error = console.error
console.error = (...args) => {
  if (args[0]?.startsWith?.('Error: Not found: ')) return
  // @ts-ignore
  console._error(...args)
}

console.clear()
import dotenv from 'dotenv'
dotenv.config()
process.on('uncaughtException', console.error)
import './config/http'
import './socket/room'
