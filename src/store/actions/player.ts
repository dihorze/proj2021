import { ADD_ONE_CARD_TO_DECK } from "./types"

export const addOneCardToDeck = (id: string) => {
  return {
    type: ADD_ONE_CARD_TO_DECK,
    id
  }
}