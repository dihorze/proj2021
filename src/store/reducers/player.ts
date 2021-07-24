import { combineReducers } from 'redux';
import { ADD_ONE_CARD_TO_DECK } from '../actions/types';
import { PlayerStateBuilder } from '../stateModels/playerModels';

const playerReducer = (state = PlayerStateBuilder.init(), action: any) => {
  switch (action.type) {
    case ADD_ONE_CARD_TO_DECK:
      return PlayerStateBuilder.addOneCardToDeck(state, action.id);
    default:
      return state
  }
}

export default combineReducers({
  player: playerReducer
})