import { IRoomProps } from '../types/game'
import { Room } from './room'

export class Rooms {
  rooms: Room[]

  constructor() {
    this.rooms = []
  }

  getRoom(id?: string) {
    if (id === undefined) return
    id = id.trim().toUpperCase()
    return this.rooms.find((room) => room.id === id)
  }

  get publicRooms() {
    return this.rooms.filter((room) => {
      return room.isPublic && !room.started && room.players.length < 10
    })
  }

  newRoom(params: IRoomProps) {
    const room = new Room(params)
    this.rooms.push(room)
    return room
  }
}

export const rooms = new Rooms()
rooms.newRoom({ id: '00000000', owner: 'a', isPublic: true })
