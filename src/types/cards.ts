export interface ICard {
  id: number
  icon: string
  color: number
  wildColor?: number
}

export interface ICardsSheet {
  [key: string]: [number, number]
}
