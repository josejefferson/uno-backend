import { Router } from 'express'
import roomCtrl from './room'

const routes = Router()
export default routes

if (process.env.NODE_ENV === 'development') {
  routes.use((req, res, next) => {
    req.sessionID = 'a'
    next()
  })
}

routes.use('/room', roomCtrl)
