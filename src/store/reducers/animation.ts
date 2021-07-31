import { combineReducers } from "@reduxjs/toolkit";
import {
  QUEUE_ANIMATION,
  START_PLAYING_ANIMATION,
  FINISH_PLAYING_ANIMATION,
  RUN_NEXT_ANIMATION,
  DEQUEUE_ANIMATION,
  REMOVE_SLIDE_IN_ANIMATION,
} from "../actions/types";
import { AnimationStateBuilder } from "../stateModels/animationModels";

const animationReducer = (
  state = AnimationStateBuilder.init(),
  action: any
) => {
  switch (action.type) {
    case QUEUE_ANIMATION:
      return AnimationStateBuilder.queueAnimation(state, action?.animation);
    case START_PLAYING_ANIMATION:
      return AnimationStateBuilder.startPlayingAnimation(state);
    case FINISH_PLAYING_ANIMATION:
      return AnimationStateBuilder.finishPlayingAnimation(state);
    case RUN_NEXT_ANIMATION:
      return AnimationStateBuilder.runNextAnimation(state);
    case DEQUEUE_ANIMATION:
      return AnimationStateBuilder.dequeueAnimation(state);


    case REMOVE_SLIDE_IN_ANIMATION:
      return AnimationStateBuilder.removeSlideInAnimation(state, action?.key);
    default:
      return state;
  }
};

export default combineReducers({
  animation: animationReducer,
});
