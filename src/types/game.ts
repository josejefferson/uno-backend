import type { Player } from '../common/player'
import type { ICard } from './cards'

export interface IPlayer {
  id: string
  name: string
  cards: ICard[]
}

export interface IRoomProps {
  id?: string
  owner: string
  isPublic?: boolean
  players?: Player[]
  seed?: number
}

export interface IGameProps {
  seed?: number
  players?: Player[]
}
