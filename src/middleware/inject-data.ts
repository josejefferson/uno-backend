import { Player } from '../common/player'
import { rooms } from '../common/rooms'
import { dynamicRoomRegex } from '../socket/room'
import type { Next, Socket } from '../types'

const injectDataMiddleware = (socket: Socket, next: Next) => {
  const roomID = socket.nsp.name.match(dynamicRoomRegex)?.[1]
  const room = rooms.getRoom(roomID?.toUpperCase())

  if (!room) return next(new Error('Esta sala não existe'))

  let player = room.players.find((p) => p.id === socket.data.sessionID)
  if (!player) {
    player = new Player({
      id: socket.data.sessionID,
      name: socket.data.name || socket.request?.session?.name
    })
    room.joinGame(player)
  }
  player.socket = socket

  if (room.owner === socket.data.sessionID) socket.data.roomOwner = true
  socket.data.roomID = roomID
  socket.data.room = room
  socket.data.player = player
  next()
}

export default injectDataMiddleware
