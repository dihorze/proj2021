import { combineReducers } from "redux";
import {
  ACTIVATE_AIMING_CARD,
  ADD_CARDS_TO_DISCARD_PILE,
  ADD_CARDS_TO_DRAW_PILE,
  ADD_CARDS_TO_HAND,
  ADD_MANY_CARDS,
  ADD_ONE_CARD,
  CLEAR_HOVERED_CARD,
  DELETE_ALL_CARDS,
  DELETE_CARDS_FROM_DISCARD_PILE,
  DELETE_CARDS_FROM_DRAW_PILE,
  DELETE_CARDS_FROM_HAND,
  DELETE_ONE_CARDS,
  DEQUEUE_ACTION_QUEUE,
  ENQUEUE_ACTION_QUEUE,
  INCREMENT_ROUND,
  INCREMENT_SHUFFLE,
  LOCK_CARD_TABLE,
  SELECT_CARD,
  SET_AIMING_CARD,
  SET_HOVERED_CARD,
  TOGGLE_DISCARD_PILE,
  TOGGLE_DRAW_PILE,
  UNLOCK_CARD_TABLE,
  UNSELECT_CARD,
} from "../actions/types";
import {
  BattleStateBuilder,
  CardTableStateBuilder,
} from "../stateModels/battleModels";

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
    case SET_AIMING_CARD:
      return CardTableStateBuilder.setAimingCard(state, action.key);
    case SET_HOVERED_CARD:
      return CardTableStateBuilder.setHoveredCard(state, action.index);
    case CLEAR_HOVERED_CARD:
      return CardTableStateBuilder.clearHoveredCard(state);

    // battle related card actions
    case ADD_CARDS_TO_HAND:
      return CardTableStateBuilder.addCardsToHand(state, action.cards);
    case DELETE_CARDS_FROM_HAND:
      return CardTableStateBuilder.deleteCardsFromHand(state, action?.keys);
    case ADD_CARDS_TO_DRAW_PILE:
      return CardTableStateBuilder.addCardsToDrawPile(state, action.cards);
    case DELETE_CARDS_FROM_DRAW_PILE:
      return CardTableStateBuilder.deleteCardsFromDrawPile(state, action?.keys);
    case ADD_CARDS_TO_DISCARD_PILE:
      return CardTableStateBuilder.addCardsToDiscardPile(state, action.cards);
    case DELETE_CARDS_FROM_DISCARD_PILE:
      return CardTableStateBuilder.deleteCardsFromDiscardPile(
        state,
        action?.keys
      );

    case LOCK_CARD_TABLE:
      return CardTableStateBuilder.lockCardTable(state);
    case UNLOCK_CARD_TABLE:
      return CardTableStateBuilder.unlockCardTable(state);
    case ENQUEUE_ACTION_QUEUE:
      return CardTableStateBuilder.enqueueActionQueue(state, action?.action);
    case DEQUEUE_ACTION_QUEUE:
      return CardTableStateBuilder.dequeueActionQueue(state);

    default:
      return state;
  }
};

const battleReducer = (state = BattleStateBuilder.init(), action: any) => {
  switch (action.type) {
    case INCREMENT_ROUND:
      return BattleStateBuilder.startRound(state);
    case INCREMENT_SHUFFLE:
      return BattleStateBuilder.incrementShuffle(state);
    case TOGGLE_DRAW_PILE:
      return BattleStateBuilder.toggleDrawPile(state);
    case TOGGLE_DISCARD_PILE:
      return BattleStateBuilder.toggleDiscardPile(state);
    default:
      return state;
  }
};



export default combineReducers({
  card: cardReducer,
  battle: battleReducer
});
