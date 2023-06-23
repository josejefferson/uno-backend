import cookie from 'cookie'
import cookieParser from 'cookie-parser'
import { Next, Socket } from '../types'

const sessionIDMiddleware = (socket: Socket, next: Next) => {
  // return next(new Error('teste'))
  const mockSessionID = socket.handshake.query.sessionID
  const cookies = socket.handshake.headers.cookie || ''
  const parsedCookies = cookie.parse(cookies)
  const connectSID = parsedCookies['connect.sid']
  const sessionID =
    mockSessionID ?? cookieParser.signedCookie(connectSID, process.env.SESSION_SECRET || '@secret!')
  if (!sessionID) return next(new Error('Cookie connect.sid inválido'))
  socket.data.sessionID = sessionID
  socket.data.name = socket.handshake.query.name
  next()
}

export default sessionIDMiddleware
