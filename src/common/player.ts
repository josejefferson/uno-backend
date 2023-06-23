import EventEmitter2 from 'eventemitter2'
import type { Socket } from '../types'
import type { ICard } from '../types/cards'

export interface IPlayer {
  id: string
  name: string
  online?: boolean
  score?: number
  isOwner?: boolean
  disconnectReason?: string | null
  cardsCount?: number
  cards?: ICard[]
  socket?: Socket
}

export class Player extends EventEmitter2 {
  id: string
  name: string
  online: boolean
  score: number
  isOwner: boolean
  disconnectReason?: string | null
  cardsCount: number
  #cards: ICard[]
  #socket?: Socket

  constructor(props: IPlayer) {
    super({ wildcard: true })
    this.id = props.id
    this.name = props.name
    this.isOwner = props.isOwner ?? false
    this.online = props.online ?? false
    this.score = props.score ?? 0
    this.cardsCount = props.cardsCount ?? 0
    this.#cards = props.cards ?? []
    this.#socket = props.socket
  }

  get cards() {
    return this.#cards
  }

  setCards(cards: ICard[]) {
    this.#cards = cards
    this.cardsCount = this.#cards.length
    this.socket?.emit('player:setCards', cards)
  }

  addCards(cards: ICard[]) {
    this.#cards.push(...cards)
    this.cardsCount = this.#cards.length
    this.socket?.emit('player:addCards', cards)
  }

  removeCard(index: number) {
    this.#cards.splice(index, 1)
    this.cardsCount = this.#cards.length
    this.socket?.emit('player:removeCard', index)
  }

  get socket(): Socket | undefined {
    return this.#socket
  }

  set socket(value: Socket | undefined) {
    this.#socket = value
  }

  setOnline(online: boolean, disconnectReason?: string) {
    this.online = online
    this.disconnectReason = disconnectReason
  }
}
