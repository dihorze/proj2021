import { combineReducers } from "redux";
import { TOGGLE_DECK_OF_CARDS } from "../actions/types";
import { SettingStateBuilder } from "../stateModels/settingsModels";

const settingReducer = (state = SettingStateBuilder.init(), action: any) => {
  switch (action.type) {
    case TOGGLE_DECK_OF_CARDS:
      return SettingStateBuilder.toggleShowDeck(state);
    default:
      return state;
  }
};

export default combineReducers({
  setting: settingReducer,
});
