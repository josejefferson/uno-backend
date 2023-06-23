import { SessionData } from 'express-session'

export {}

declare module 'express-session' {
  interface SessionData {
    name: string
  }
}

declare module 'node:http' {
  interface IncomingMessage {
    session: SessionData
  }
}
