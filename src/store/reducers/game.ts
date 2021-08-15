import { combineReducers } from "redux";
import { TOGGLE_CARD_SELECTION_PAGE } from "../actions/types";
import { GameStateBuilder } from "../stateModels/gameModels";

const gameReducer = (state = GameStateBuilder.init(), action: any) => {
  switch (action.type) {
    case TOGGLE_CARD_SELECTION_PAGE:
      return GameStateBuilder.toggleCardSelectionPage(state);
    default:
      return state;
  }
};

export default combineReducers({
  game: gameReducer,
});
