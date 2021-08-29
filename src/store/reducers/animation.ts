import { combineReducers } from "@reduxjs/toolkit";
import {
  REMOVE_SLIDE_IN_ANIMATION,
  REMOVE_SLIDE_OUT_ANIMATION,
  REMOVE_FLY_OUT_ANIMATION,
  REMOVE_SHUFFLE_DISCARD_TO_DRAW_ANIMATION,
  PLAY_ANIMATION,
  REMOVE_SHRED_ANIMATION,
} from "../actions/types";
import { AnimationStateBuilder } from "../stateModels/animationModels";

const animationReducer = (
  state = AnimationStateBuilder.init(),
  action: any
) => {
  switch (action.type) {

    case PLAY_ANIMATION:
      return AnimationStateBuilder.playAnimation(state, action?.animation)

    case REMOVE_SLIDE_IN_ANIMATION:
      return AnimationStateBuilder.removeSlideInAnimation(state, action?.key);
    case REMOVE_SLIDE_OUT_ANIMATION:
      return AnimationStateBuilder.removeSlideOutAnimation(state, action?.key);
    case REMOVE_FLY_OUT_ANIMATION:
      return AnimationStateBuilder.removeFlyOutAnimation(state, action?.key);
    case REMOVE_SHRED_ANIMATION:
      return AnimationStateBuilder.removeShredAnimation(state, action?.key);
    case REMOVE_SHUFFLE_DISCARD_TO_DRAW_ANIMATION:
      return AnimationStateBuilder.removeShuffleDiscardToDrawAnimation(state);
    default:
      return state;
  }
};

export default combineReducers({
  animation: animationReducer,
});
