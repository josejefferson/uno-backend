import { forbidden, notFound } from '@hapi/boom'
import { Router } from 'express'
import { Player } from '../common/player'
import { rooms } from '../common/rooms'
const roomCtrl = Router()
export default roomCtrl

/**
 * Retorna as salas disponíveis
 */
roomCtrl.get('/', (req, res) => {
  res.json(rooms.publicRooms)
})

/**
 * Retorna os dados da sala
 */
roomCtrl.get('/:id', (req, res) => {
  const room = rooms.getRoom(req.params.id)

  if (!room) {
    throw notFound('Sala não encontrada')
  }

  if (!room.players.some((player) => player.id === req.sessionID)) {
    throw forbidden('Você não está nesta sala')
  }

  res.json({ room })
})

/**
 * Entra em uma sala
 */
roomCtrl.get('/join/:id', (req, res) => {
  const room = rooms.getRoom(req.params.id)

  if (!room) {
    throw notFound('Sala não encontrada')
  }

  if (room.started) {
    throw forbidden('Você não pode entrar nesta sala pois o jogo já começou')
  }

  if (room.players.length >= 10) {
    throw forbidden('A sala está cheia')
  }

  room.joinGame(new Player({ id: req.sessionID, name: 'Jogador' }))

  res.json({ room })
})

/**
 * Cria uma sala
 */
roomCtrl.post('/', (req, res) => {
  const room = rooms.newRoom({ owner: req.query.sessionID as string|| req.sessionID, isPublic: true /* temp */ })
  room.joinGame({
    id: (req.query.sessionID as string) || req.sessionID,
    name: (req.query.name as string) || req.session.name
  })
  res.json(room)
})
