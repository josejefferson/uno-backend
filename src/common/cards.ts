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
  { id: 0, icon: '0', color: COLORS.RED },
  { id: 1, icon: '1', color: COLORS.RED },
  { id: 2, icon: '1', color: COLORS.RED },
  { id: 3, icon: '2', color: COLORS.RED },
  { id: 4, icon: '2', color: COLORS.RED },
  { id: 5, icon: '3', color: COLORS.RED },
  { id: 6, icon: '3', color: COLORS.RED },
  { id: 7, icon: '4', color: COLORS.RED },
  { id: 8, icon: '4', color: COLORS.RED },
  { id: 9, icon: '5', color: COLORS.RED },
  { id: 10, icon: '5', color: COLORS.RED },
  { id: 11, icon: '6', color: COLORS.RED },
  { id: 12, icon: '6', color: COLORS.RED },
  { id: 13, icon: '7', color: COLORS.RED },
  { id: 14, icon: '7', color: COLORS.RED },
  { id: 15, icon: '8', color: COLORS.RED },
  { id: 16, icon: '8', color: COLORS.RED },
  { id: 17, icon: '9', color: COLORS.RED },
  { id: 18, icon: '9', color: COLORS.RED },
  { id: 19, icon: 'REVERSE', color: COLORS.RED },
  { id: 20, icon: 'REVERSE', color: COLORS.RED },
  { id: 21, icon: 'SKIP', color: COLORS.RED },
  { id: 22, icon: 'SKIP', color: COLORS.RED },
  { id: 23, icon: 'DRAW2', color: COLORS.RED },
  { id: 24, icon: 'DRAW2', color: COLORS.RED },

  { id: 25, icon: '0', color: COLORS.YELLOW },
  { id: 26, icon: '1', color: COLORS.YELLOW },
  { id: 27, icon: '1', color: COLORS.YELLOW },
  { id: 28, icon: '2', color: COLORS.YELLOW },
  { id: 29, icon: '2', color: COLORS.YELLOW },
  { id: 30, icon: '3', color: COLORS.YELLOW },
  { id: 31, icon: '3', color: COLORS.YELLOW },
  { id: 32, icon: '4', color: COLORS.YELLOW },
  { id: 33, icon: '4', color: COLORS.YELLOW },
  { id: 34, icon: '5', color: COLORS.YELLOW },
  { id: 35, icon: '5', color: COLORS.YELLOW },
  { id: 36, icon: '6', color: COLORS.YELLOW },
  { id: 37, icon: '6', color: COLORS.YELLOW },
  { id: 38, icon: '7', color: COLORS.YELLOW },
  { id: 39, icon: '7', color: COLORS.YELLOW },
  { id: 40, icon: '8', color: COLORS.YELLOW },
  { id: 41, icon: '8', color: COLORS.YELLOW },
  { id: 42, icon: '9', color: COLORS.YELLOW },
  { id: 43, icon: '9', color: COLORS.YELLOW },
  { id: 44, icon: 'REVERSE', color: COLORS.YELLOW },
  { id: 45, icon: 'REVERSE', color: COLORS.YELLOW },
  { id: 46, icon: 'SKIP', color: COLORS.YELLOW },
  { id: 47, icon: 'SKIP', color: COLORS.YELLOW },
  { id: 48, icon: 'DRAW2', color: COLORS.YELLOW },
  { id: 49, icon: 'DRAW2', color: COLORS.YELLOW },

  { id: 50, icon: '0', color: COLORS.BLUE },
  { id: 51, icon: '1', color: COLORS.BLUE },
  { id: 52, icon: '1', color: COLORS.BLUE },
  { id: 53, icon: '2', color: COLORS.BLUE },
  { id: 54, icon: '2', color: COLORS.BLUE },
  { id: 55, icon: '3', color: COLORS.BLUE },
  { id: 56, icon: '3', color: COLORS.BLUE },
  { id: 57, icon: '4', color: COLORS.BLUE },
  { id: 58, icon: '4', color: COLORS.BLUE },
  { id: 59, icon: '5', color: COLORS.BLUE },
  { id: 60, icon: '5', color: COLORS.BLUE },
  { id: 61, icon: '6', color: COLORS.BLUE },
  { id: 62, icon: '6', color: COLORS.BLUE },
  { id: 63, icon: '7', color: COLORS.BLUE },
  { id: 64, icon: '7', color: COLORS.BLUE },
  { id: 65, icon: '8', color: COLORS.BLUE },
  { id: 66, icon: '8', color: COLORS.BLUE },
  { id: 67, icon: '9', color: COLORS.BLUE },
  { id: 68, icon: '9', color: COLORS.BLUE },
  { id: 69, icon: 'REVERSE', color: COLORS.BLUE },
  { id: 70, icon: 'REVERSE', color: COLORS.BLUE },
  { id: 71, icon: 'SKIP', color: COLORS.BLUE },
  { id: 72, icon: 'SKIP', color: COLORS.BLUE },
  { id: 73, icon: 'DRAW2', color: COLORS.BLUE },
  { id: 74, icon: 'DRAW2', color: COLORS.BLUE },

  { id: 75, icon: '0', color: COLORS.GREEN },
  { id: 76, icon: '1', color: COLORS.GREEN },
  { id: 77, icon: '1', color: COLORS.GREEN },
  { id: 78, icon: '2', color: COLORS.GREEN },
  { id: 79, icon: '2', color: COLORS.GREEN },
  { id: 80, icon: '3', color: COLORS.GREEN },
  { id: 81, icon: '3', color: COLORS.GREEN },
  { id: 82, icon: '4', color: COLORS.GREEN },
  { id: 83, icon: '4', color: COLORS.GREEN },
  { id: 84, icon: '5', color: COLORS.GREEN },
  { id: 85, icon: '5', color: COLORS.GREEN },
  { id: 86, icon: '6', color: COLORS.GREEN },
  { id: 87, icon: '6', color: COLORS.GREEN },
  { id: 88, icon: '7', color: COLORS.GREEN },
  { id: 89, icon: '7', color: COLORS.GREEN },
  { id: 90, icon: '8', color: COLORS.GREEN },
  { id: 91, icon: '8', color: COLORS.GREEN },
  { id: 92, icon: '9', color: COLORS.GREEN },
  { id: 93, icon: '9', color: COLORS.GREEN },
  { id: 94, icon: 'REVERSE', color: COLORS.GREEN },
  { id: 95, icon: 'REVERSE', color: COLORS.GREEN },
  { id: 96, icon: 'SKIP', color: COLORS.GREEN },
  { id: 97, icon: 'SKIP', color: COLORS.GREEN },
  { id: 98, icon: 'DRAW2', color: COLORS.GREEN },
  { id: 99, icon: 'DRAW2', color: COLORS.GREEN },

  { id: 100, icon: 'WILD', color: COLORS.WILD },
  { id: 101, icon: 'WILD', color: COLORS.WILD },
  { id: 102, icon: 'WILD', color: COLORS.WILD },
  { id: 103, icon: 'WILD', color: COLORS.WILD },

  { id: 104, icon: 'WILDDRAW4', color: COLORS.WILD },
  { id: 105, icon: 'WILDDRAW4', color: COLORS.WILD },
  { id: 106, icon: 'WILDDRAW4', color: COLORS.WILD },
  { id: 107, icon: 'WILDDRAW4', color: COLORS.WILD }

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
