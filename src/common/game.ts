import EventEmitter2 from 'eventemitter2'
import seedrandom from 'seedrandom'
import { deserialize } from '../helpers'
import type { ICard } from '../types/cards'
import cards, { COLORS } from './cards'
import { IPlayer, Player } from './player'

export interface IGame {
  seed?: number
  players?: Player[]
  jogador?: number
  direcao?: 1 | -1
  playerCardsCount?: number[]
  baralho?: number
  descarteUltimaCarta?: ICard
}

export default class Game extends EventEmitter2 {
  #random: seedrandom.PRNG
  #descarte: ICard[]
  #baralho: ICard[]
  #playerCards: any[][]
  seed: number
  descarteUltimaCarta: ICard | null
  baralhoCount: number
  players: Player[]
  playerCardsCount: number[]
  jogador: number
  direcao: 1 | -1
  comprou: boolean // determina se o jogador pode passar, já que comprou

  get descarte() {
    return this.#descarte
  }
  get baralho() {
    return this.#baralho
  }
  get playerCards() {
    return this.#playerCards
  }
  get topo() {
    return this.#descarte[0]
  }
  get jogadorAtual() {
    return this.players[this.jogador]
  }

  constructor(props: IGame = {}) {
    super({ wildcard: true })
    this.seed = props.seed ?? Math.random()
    this.#random = seedrandom(this.seed.toString())
    this.#descarte = props.descarteUltimaCarta ? [props.descarteUltimaCarta] : []
    this.descarteUltimaCarta = props.descarteUltimaCarta ?? null
    this.#baralho = this.embaralhar()
    this.baralhoCount = props.baralho ?? this.#baralho.length
    this.#playerCards = props.players?.map(() => []) ?? []
    this.playerCardsCount = props.playerCardsCount ?? props.players?.map(() => 0) ?? []
    this.players = deserialize<Player[]>(props.players, Player) ?? []
    this.direcao = props.direcao ?? 1
    this.jogador = props.jogador ?? Math.floor(this.#random() * this.players.length)
    this.comprou = false
  }

  comeca() {
    this.distribuir()
    this.tirarPrimeiraCarta()
  }

  start(seed: number) {
    this.constructor({ seed })
  }

  embaralhar() {
    let baralho = cards()
    baralho = baralho.map((carta) => ({ ...carta }))
    baralho.sort(() => this.#random() - this.#random())
    return baralho
  }

  distribuir() {
    for (const i in this.players) {
      const cards = []
      for (let i = 0; i < 7; i++) {
        cards.push(this.tirarCartaDoBaralho())
      }
      this.setPlayerCards(+i, cards)
      this.setPlayerCardsLength(+i, cards.length)
    }
  }

  setPlayerCards(playerIndex: number, cards: ICard[]) {
    this.#playerCards[playerIndex] = [...cards]
    this.players[playerIndex].setCards([...cards])
  }

  addPlayerCards(playerIndex: number, cards: ICard[]) {
    this.#playerCards[playerIndex].push(...cards)
    this.players[playerIndex].addCards(cards)
  }

  removePlayerCard(playerIndex: number, index: number) {
    this.#playerCards[playerIndex].splice(index, 1)
    this.players[playerIndex].removeCard(index)
  }

  setPlayerCardsLength(playerIndex: number, cardsLength: number) {
    this.playerCardsCount[playerIndex] = cardsLength
    this.emit('game:setPlayerCardsLength', playerIndex, cardsLength)
  }

  tirarPrimeiraCarta() {
    this.descartar(this.tirarCartaDoBaralho())
  }

  tirarCartaDoBaralho() {
    if (this.#baralho.length <= 1) {
      this.emit('warning', 'O baralho foi reposto')
      this.reporBaralho()
    }
    if (this.#baralho.length === 1) {
      this.emit('warning', 'O baralho acabou')
    }
    const carta = this.#baralho.pop()
    this.baralhoCount--
    this.emit('game:tirarCartaDoBaralho')
    return carta!
  }

  setBaralhoCount(count: number) {
    this.baralhoCount = count
    this.emit('game:setBaralhoCount', count)
  }

  getMyCards(player: number | IPlayer | Player) {
    if (typeof player === 'number') return this.#playerCards[player]
    const me = this.players.findIndex((p) => p.id === player.id)
    return this.#playerCards[me]
  }

  descartar(carta: ICard) {
    this.#descarte.unshift(carta)
    this.descarteUltimaCarta = carta
    this.emit('game:descartar', carta)
  }

  jogar(cartaIndex: number, cor?: number) {
    cor = cor ? Number(cor) : cor
    const carta = this.#playerCards[this.jogador][cartaIndex]
    if (!carta) throw new Error('Carta inválida')
    if (typeof cor === 'number') carta.wildColor = cor // testar se carta é wild
    if (!this.podeJogar(carta))
      throw new Error(`Você não pode jogar esta carta: COR: ${carta.color}, ÍCONE: ${carta.icon}`)
    this.descartar(carta)
    this.removePlayerCard(this.jogador, cartaIndex)
    this.setPlayerCardsLength(this.jogador, this.#playerCards[this.jogador].length)
    if (this.#playerCards[this.jogador].length <= 0) {
      this.emit('message', `${this.players[this.jogador]?.name} ganhou o jogo!`)
      this.endGame(this.jogador)
      return
    }

    switch (carta.icon) {
      case 'REVERSE':
        this.inverter()
        break
      case 'SKIP':
        this.pular()
        break
      case 'DRAW2':
        this.compra2()
        break
      case 'WILDDRAW4':
        this.compra4()
        break
    }

    this.proximoJogador()
  }

  proximoJogador() {
    this.comprou = false
    let jogador = this.jogador + this.direcao
    if (jogador >= this.players.length) jogador = 0
    if (jogador < 0) jogador = this.players.length - 1
    this.setJogador(jogador)
  }

  setJogador(index: number) {
    this.jogador = index
    this.emit('game:setJogador', index)
  }

  podeJogar(carta: ICard) {
    if (this.topo?.color === COLORS.WILD && this.topo?.wildColor === undefined) return true
    if (this.topo?.color === COLORS.WILD && this.topo?.wildColor === carta.color) return true
    if (this.topo?.color === carta.color) return true
    if (this.topo?.icon === carta.icon) return true
    if (carta.color === COLORS.WILD) return true
    return false
  }

  comprar(automatico = false) {
    if (!automatico && this.comprou) throw new Error('Você já comprou, agora passe a vez')
    this.comprou = true
    const carta = this.tirarCartaDoBaralho()
    if (!carta) return
    this.addPlayerCards(this.jogador, [carta])
    this.setPlayerCardsLength(this.jogador, this.#playerCards[this.jogador].length)
  }

  reporBaralho() {
    const cartasRestantes = this.#descarte.splice(1)
    cartasRestantes.sort(() => this.#random() - this.#random())
    cartasRestantes.forEach((carta) => delete carta.wildColor)
    this.#baralho.push(...cartasRestantes)
    this.setBaralhoCount(this.#baralho.length)
  }

  passar() {
    if (this.#baralho.length && !this.comprou) {
      throw new Error('Você não comprou uma carta, então não pode passar')
    }
    this.proximoJogador()
  }

  setPlayerOnline(playerID: string, online: boolean, disconnectReason?: string) {
    const player = this.players.findIndex((p) => p.id === playerID)
    if (player === -1) return
    this.players[player].setOnline(online, disconnectReason)
    this.emit('game:setPlayerOnline', playerID, online, disconnectReason)
  }

  endGame(ganhador: number) {
    this.emit('endGame', ganhador)
  }

  // Ações das cartas
  pular() {
    this.proximoJogador()
    this.jogadorAtual.socket?.emit('message', 'Bloqueado')
  }
  inverter() {
    this.direcao *= -1
    this.emit('game:inverter')
    this.emit('message', 'Inverteu')
  }
  compra2() {
    this.proximoJogador()
    for (let i = 0; i < 2; i++) this.comprar(true)
    this.jogadorAtual.socket?.emit('message', 'Comprou +2')
  }
  compra4() {
    this.proximoJogador()
    for (let i = 0; i < 4; i++) this.comprar(true)
    this.jogadorAtual.socket?.emit('message', 'Comprou +4')
  }
}
