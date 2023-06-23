import session from 'express-session'

export const expressSession = session({
  secret: process.env.SESSION_SECRET || '@secret!',
  saveUninitialized: true,
  cookie: { maxAge: 1000 * 60 * 60 * 24 * 365 },
  resave: false
})

export const socketSession = (socket: any, next: any) =>
  expressSession(socket.request, {} as any, next)
