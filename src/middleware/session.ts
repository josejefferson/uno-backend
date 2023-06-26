import { NextFunction, Request, Response } from 'express'
import session from 'express-session'

export const expressSession = (req: Request, res: Response, next: NextFunction) => {
  if (req.query.sessionID) {
    req.sessionID = req.query.sessionID as string
    req.session = { name: req.query.name as string, cookie: req.cookies }
    next()
  } else {
    session({
      secret: process.env.SESSION_SECRET || '@secret!',
      saveUninitialized: true,
      cookie: { maxAge: 1000 * 60 * 60 * 24 * 365 },
      resave: false
    })(req, res, next)
  }
}

export const socketSession = (socket: any, next: any) =>
  expressSession(socket.request, {} as any, next)
