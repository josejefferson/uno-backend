import cookieParser from 'cookie-parser'
import cors from 'cors'
import express from 'express'
import 'express-async-errors'
import http from 'http'
import error from '../helpers/error'
import log from '../helpers/log'
import { randomName } from '../helpers/random'
import { expressSession } from '../middleware/session'
import routes from '../routes'

const PORT = process.env.PORT || 4000
const app = express()
export const server = http.createServer(app)

app.set('trust proxy', 1)
app.options('*', cors({ credentials: true, exposedHeaders: '*', origin: true }))
app.use(cors({ credentials: true, exposedHeaders: '*', origin: true }))

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(expressSession)
app.use((req, res, next) => {
  req.session.name = req.session.name ?? randomName()
  next()
})
app.use('/api', routes)
app.use(express.static('dist'))
app.use(express.static('public'))

app.use(error)

server.listen(PORT, () => {
  log('INFO', '', `Servidor iniciado na porta ${PORT}`)
})
