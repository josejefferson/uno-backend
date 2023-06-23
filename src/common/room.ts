import EventEmitter2 from 'eventemitter2'
import { deserialize, inheritEvents, randomRoomID } from '../helpers'
import Game, { IGame } from './game'
import { IPlayer, Player } from './player'

export interface IRoom {
  id?: string
  isPublic?: boolean
  started?: boolean
  owner?: string | null
  currentGame?: Game | null
  currentGameIndex?: number
  players?: Player[]
}

export class Room extends EventEmitter2 {
  id: string
  isPublic: boolean
  started: boolean
  owner: string | null
  currentGame: Game | null
  currentGameIndex: number
  players: Player[]

  constructor(props: IRoom) {
    super({ wildcard: true })
    this.id = props.id ?? randomRoomID()
    this.isPublic = props.isPublic ?? false
    this.started = props.started ?? false
    this.owner = props.owner ?? null
    this.players = deserialize<Player[]>(props.players, Player) ?? []
    this.currentGame = deserialize<Game>(props.currentGame ?? null, Game)
    this.currentGameIndex = props.currentGameIndex ?? -1
    if (this.currentGame) inheritEvents(this, this.currentGame)
  }

  joinGame(player: Player | IPlayer) {
    if (this.players.some((p) => p.id === player.id)) {
      return
    }

    const deserializedPlayer = deserialize<Player>(player, Player)
    this.players.push(deserializedPlayer)
    this.emit('room:joinGame', player)
    // inheritEvents(this, deserializedPlayer)
  }

  setPlayerOnline(player: IPlayer, online: boolean, disconnectReason?: string) {
    const thePlayer = this.players.find((p) => p.id === player.id)
    if (!thePlayer) return
    thePlayer.setOnline(online, disconnectReason)
    this.emit('room:setPlayerOnline', player, online, disconnectReason)
    this.currentGame?.setPlayerOnline(player.id, online, disconnectReason)
  }

  startGame(game?: IGame | Game) {
    this.currentGame =
      deserialize<Game>(game, Game) ?? new Game({ /*seed:this.seed,*/ players: this.players })
    this.emit('room:startGame', this.currentGame)
    inheritEvents(this, this.currentGame)
    if (typeof window === 'undefined') this.currentGame.comeca()
    this.started = true
    this.currentGameIndex++

    this.currentGame.on('endGame', (ganhador: number) => {
      this.endGame(ganhador)
    })
    // for (const player of this.players) {
    //   player.socket?.emit('player:setCards', player.cards)
    // }
  }

  endGame(ganhador: number) {
    this.currentGame = null
    this.started = false
    this.players[ganhador].score += 1
    this.emit('room:endGame', ganhador)
  }
}
