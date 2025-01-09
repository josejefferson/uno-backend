import { io } from '../config/socket'
import injectDataMiddleware from '../middleware/inject-data'
import { socketSession } from '../middleware/session'
import sessionIDMiddleware from '../middleware/session-id'
import type { RoomNamespace } from '../types'

export const dynamicRoomRegex = /^\/room\/([A-F0-9]{8})$/
const roomNamespace: RoomNamespace = io.of(dynamicRoomRegex)

roomNamespace.use(socketSession)
roomNamespace.use(sessionIDMiddleware)
roomNamespace.use(injectDataMiddleware)

roomNamespace.on('connection', (socket) => {
  // TODO: desconectar outros sockets antigos que tiveram conectados
  const player = socket.data.player!
  const room = socket.data.room!
  // const game = socket.data.room.currentGame

  if (player) {
    room.setPlayerOnline(player, true)
  }

  socket.emit('room:data', room)
  socket.emit('player:data', player)
  if (room.currentGame) socket.emit('player:setCards', room.currentGame?.getMyCards(player))

  room.on('player:online', (player: any) => {
    io.of(socket.nsp.name).emit('player:online', player)
  })

  room.on('*', function (this: any, ...args) {
    socket.emit(this.event, ...args)
  })

  // Aguarda os comandos do Game
  socket.onAny((eventName, ...args) => {
    if (!['game:jogar', 'game:comprar', 'game:passar', 'game:gritarUNO'].includes(eventName)) return
    try {
      ;(room.currentGame as any)?.[eventName.split('game:')[1]]?.(...args)
    } catch (err: any) {
      socket.emit('error', err.message)
    }
  })

  // Inicia o jogo
  socket.on('room:startGame', (callback) => {
    if (false /*!socket.data.roomOwner*/) return callback('Você não é o dono da sala')
    room.startGame()
    return callback(null, true)
  })

  // Retorna suas cartas
  socket.on('game:getMyCards', (callback) => {
    const cards = room.currentGame?.getMyCards(player)
    if (!cards) callback(new Error('Ocorreu um erro'))
    callback(null, cards)
  })

  socket.on('disconnect', (reason) => {
    if (player) {
      room.setPlayerOnline(player, false, reason)
    }
  })
})
