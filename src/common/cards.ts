import type { ICard, ICardsSheet } from '../types/cards'

export const COLORS = {
  WILD: -1,
  RED: 0,
  YELLOW: 1,
  BLUE: 2,
  GREEN: 3
}

export const COLORS_ID = {
  '-1': 'WILD',
  '0': 'RED',
  '1': 'YELLOW',
  '2': 'BLUE',
  '3': 'GREEN'
}

const cards = (): ICard[] => [
  { icon: '0', color: COLORS.RED },
  { icon: '1', color: COLORS.RED },
  { icon: '1', color: COLORS.RED },
  { icon: '2', color: COLORS.RED },
  { icon: '2', color: COLORS.RED },
  { icon: '3', color: COLORS.RED },
  { icon: '3', color: COLORS.RED },
  { icon: '4', color: COLORS.RED },
  { icon: '4', color: COLORS.RED },
  { icon: '5', color: COLORS.RED },
  { icon: '5', color: COLORS.RED },
  { icon: '6', color: COLORS.RED },
  { icon: '6', color: COLORS.RED },
  { icon: '7', color: COLORS.RED },
  { icon: '7', color: COLORS.RED },
  { icon: '8', color: COLORS.RED },
  { icon: '8', color: COLORS.RED },
  { icon: '9', color: COLORS.RED },
  { icon: '9', color: COLORS.RED },
  { icon: 'REVERSE', color: COLORS.RED },
  { icon: 'REVERSE', color: COLORS.RED },
  { icon: 'SKIP', color: COLORS.RED },
  { icon: 'SKIP', color: COLORS.RED },
  { icon: 'DRAW2', color: COLORS.RED },
  { icon: 'DRAW2', color: COLORS.RED },

  { icon: '0', color: COLORS.YELLOW },
  { icon: '1', color: COLORS.YELLOW },
  { icon: '1', color: COLORS.YELLOW },
  { icon: '2', color: COLORS.YELLOW },
  { icon: '2', color: COLORS.YELLOW },
  { icon: '3', color: COLORS.YELLOW },
  { icon: '3', color: COLORS.YELLOW },
  { icon: '4', color: COLORS.YELLOW },
  { icon: '4', color: COLORS.YELLOW },
  { icon: '5', color: COLORS.YELLOW },
  { icon: '5', color: COLORS.YELLOW },
  { icon: '6', color: COLORS.YELLOW },
  { icon: '6', color: COLORS.YELLOW },
  { icon: '7', color: COLORS.YELLOW },
  { icon: '7', color: COLORS.YELLOW },
  { icon: '8', color: COLORS.YELLOW },
  { icon: '8', color: COLORS.YELLOW },
  { icon: '9', color: COLORS.YELLOW },
  { icon: '9', color: COLORS.YELLOW },
  { icon: 'REVERSE', color: COLORS.YELLOW },
  { icon: 'REVERSE', color: COLORS.YELLOW },
  { icon: 'SKIP', color: COLORS.YELLOW },
  { icon: 'SKIP', color: COLORS.YELLOW },
  { icon: 'DRAW2', color: COLORS.YELLOW },
  { icon: 'DRAW2', color: COLORS.YELLOW },

  { icon: '0', color: COLORS.BLUE },
  { icon: '1', color: COLORS.BLUE },
  { icon: '1', color: COLORS.BLUE },
  { icon: '2', color: COLORS.BLUE },
  { icon: '2', color: COLORS.BLUE },
  { icon: '3', color: COLORS.BLUE },
  { icon: '3', color: COLORS.BLUE },
  { icon: '4', color: COLORS.BLUE },
  { icon: '4', color: COLORS.BLUE },
  { icon: '5', color: COLORS.BLUE },
  { icon: '5', color: COLORS.BLUE },
  { icon: '6', color: COLORS.BLUE },
  { icon: '6', color: COLORS.BLUE },
  { icon: '7', color: COLORS.BLUE },
  { icon: '7', color: COLORS.BLUE },
  { icon: '8', color: COLORS.BLUE },
  { icon: '8', color: COLORS.BLUE },
  { icon: '9', color: COLORS.BLUE },
  { icon: '9', color: COLORS.BLUE },
  { icon: 'REVERSE', color: COLORS.BLUE },
  { icon: 'REVERSE', color: COLORS.BLUE },
  { icon: 'SKIP', color: COLORS.BLUE },
  { icon: 'SKIP', color: COLORS.BLUE },
  { icon: 'DRAW2', color: COLORS.BLUE },
  { icon: 'DRAW2', color: COLORS.BLUE },

  { icon: '0', color: COLORS.GREEN },
  { icon: '1', color: COLORS.GREEN },
  { icon: '1', color: COLORS.GREEN },
  { icon: '2', color: COLORS.GREEN },
  { icon: '2', color: COLORS.GREEN },
  { icon: '3', color: COLORS.GREEN },
  { icon: '3', color: COLORS.GREEN },
  { icon: '4', color: COLORS.GREEN },
  { icon: '4', color: COLORS.GREEN },
  { icon: '5', color: COLORS.GREEN },
  { icon: '5', color: COLORS.GREEN },
  { icon: '6', color: COLORS.GREEN },
  { icon: '6', color: COLORS.GREEN },
  { icon: '7', color: COLORS.GREEN },
  { icon: '7', color: COLORS.GREEN },
  { icon: '8', color: COLORS.GREEN },
  { icon: '8', color: COLORS.GREEN },
  { icon: '9', color: COLORS.GREEN },
  { icon: '9', color: COLORS.GREEN },
  { icon: 'REVERSE', color: COLORS.GREEN },
  { icon: 'REVERSE', color: COLORS.GREEN },
  { icon: 'SKIP', color: COLORS.GREEN },
  { icon: 'SKIP', color: COLORS.GREEN },
  { icon: 'DRAW2', color: COLORS.GREEN },
  { icon: 'DRAW2', color: COLORS.GREEN },

  { icon: 'WILD', color: COLORS.WILD },
  { icon: 'WILD', color: COLORS.WILD },
  { icon: 'WILD', color: COLORS.WILD },
  { icon: 'WILD', color: COLORS.WILD },

  { icon: 'WILDDRAW4', color: COLORS.WILD },
  { icon: 'WILDDRAW4', color: COLORS.WILD },
  { icon: 'WILDDRAW4', color: COLORS.WILD },
  { icon: 'WILDDRAW4', color: COLORS.WILD }

  // { icon: 'HUSHTIME', color: COLORS.WILD },
  // { icon: 'HUSHTIME', color: COLORS.WILD }
]

const cardsSheet: ICardsSheet = {
  EMPTY: [-1, 0],

  // Red
  '0_0': [0, 0],
  '1_0': [0, 1],
  '2_0': [0, 2],
  '3_0': [0, 3],
  '4_0': [0, 4],
  '5_0': [0, 5],
  '6_0': [0, 6],
  '7_0': [0, 7],
  '8_0': [0, 8],
  '9_0': [0, 9],
  SKIP_0: [0, 10],
  REVERSE_0: [0, 11],
  DRAW2_0: [0, 12],

  // Yellow
  '0_1': [1, 0],
  '1_1': [1, 1],
  '2_1': [1, 2],
  '3_1': [1, 3],
  '4_1': [1, 4],
  '5_1': [1, 5],
  '6_1': [1, 6],
  '7_1': [1, 7],
  '8_1': [1, 8],
  '9_1': [1, 9],
  SKIP_1: [1, 10],
  REVERSE_1: [1, 11],
  DRAW2_1: [1, 12],

  // Blue
  '0_2': [3, 0],
  '1_2': [3, 1],
  '2_2': [3, 2],
  '3_2': [3, 3],
  '4_2': [3, 4],
  '5_2': [3, 5],
  '6_2': [3, 6],
  '7_2': [3, 7],
  '8_2': [3, 8],
  '9_2': [3, 9],
  SKIP_2: [3, 10],
  REVERSE_2: [3, 11],
  DRAW2_2: [3, 12],

  // Green
  '0_3': [2, 0],
  '1_3': [2, 1],
  '2_3': [2, 2],
  '3_3': [2, 3],
  '4_3': [2, 4],
  '5_3': [2, 5],
  '6_3': [2, 6],
  '7_3': [2, 7],
  '8_3': [2, 8],
  '9_3': [2, 9],
  SKIP_3: [2, 10],
  REVERSE_3: [2, 11],
  DRAW2_3: [2, 12],

  // Wildcards
  'WILD_-1': [0, 13],
  'WILDDRAW4_-1': [4, 13]
}

export const CARD_WIDTH = 99.8
export const CARD_HEIGHT = 69.7
export const cardsSheetCoordinates = { ...cardsSheet }
for (const card in cardsSheetCoordinates) {
  cardsSheetCoordinates[card][0] *= CARD_WIDTH
  cardsSheetCoordinates[card][1] *= CARD_HEIGHT
}

export default cards
