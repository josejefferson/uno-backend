import { Server as IOServer } from 'socket.io'
import sessionIDMiddleware from '../middleware/session-id'
import { server } from './http'

export const io = new IOServer(server, {
  cookie: true,
  cors: {
    origin: '*'
  }
})

io.use(sessionIDMiddleware)
