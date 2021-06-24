import { combineReducers } from 'redux';
import { ACTIVATE_AIMING_CARD, ADD_MANY_CARDS, ADD_ONE_CARD, DELETE_ALL_CARDS, DELETE_ONE_CARDS, SELECT_CARD, UNSELECT_CARD } from '../actions/types';
import { CardTableStateBuilder } from '../stateModels/battleModels';

const cardReducer = (state = CardTableStateBuilder.init(), action: any) => {
  switch (action.type) {
    case ACTIVATE_AIMING_CARD:
      return CardTableStateBuilder.setAimingCard(state, action.key);
    case ADD_ONE_CARD:
      return CardTableStateBuilder.addOneCard(state, action?.key);
    case ADD_MANY_CARDS:
      return CardTableStateBuilder.addManyCards(state, action?.keys);
    case DELETE_ALL_CARDS:
      return CardTableStateBuilder.deleteAllCards(state);
    case DELETE_ONE_CARDS:
      return CardTableStateBuilder.deleteOneCard(state, action?.key);
    case SELECT_CARD:
      return CardTableStateBuilder.selectCard(state, action.key);
    case UNSELECT_CARD:
      return CardTableStateBuilder.unselectCard(state);
    default:
      return state
  }
}

export default combineReducers({
  card: cardReducer
})