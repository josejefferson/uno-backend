import { Namespace, Socket as _Socket } from 'socket.io'
import type { ExtendedError } from 'socket.io/dist/namespace'
import type { DefaultEventsMap } from 'socket.io/dist/typed-events'
import { Player } from '../common/player'
import { Room } from '../common/room'

export interface ISocketData {
  sessionID: string
  roomOwner?: boolean
  roomID: string
  room: Room
  player: Player
}

export type RoomNamespace = Namespace<
  DefaultEventsMap,
  DefaultEventsMap,
  DefaultEventsMap,
  ISocketData
>

export type Socket = _Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>
export type Next = (err?: ExtendedError | undefined) => void
