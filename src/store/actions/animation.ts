import { AnyAction } from "@reduxjs/toolkit";
import { RootStateOrAny } from "react-redux";
import { ThunkAction } from "redux-thunk";
import { Anim } from "../../model/classes";
import {
  QUEUE_ANIMATION,
  START_PLAYING_ANIMATION,
  FINISH_PLAYING_ANIMATION,
  RUN_NEXT_ANIMATION,
  DEQUEUE_ANIMATION,
  REMOVE_SLIDE_IN_ANIMATION,
  REMOVE_SLIDE_OUT_ANIMATION,
  REMOVE_FLY_OUT_ANIMATION,
} from "./types";

export const queueAnimation = (animation: Anim) => {
  return {
    type: QUEUE_ANIMATION,
    animation,
  };
};

export const startPlayingAnimation = () => {
  return {
    type: START_PLAYING_ANIMATION,
  };
};

export const finishPlayingAnimation = () => {
  return {
    type: FINISH_PLAYING_ANIMATION,
  };
};

export const runNextAnimation = () => {
  return {
    type: RUN_NEXT_ANIMATION,
  };
};

export const dequeueAnimation = () => {
  return {
    type: DEQUEUE_ANIMATION,
  };
};

export const PlayAnimation = (
  animation: Anim
): ThunkAction<void, RootStateOrAny, unknown, AnyAction> => {
  return (dispatch, getState) => {
    const isRunning = getState().animation.animation.isPlaying;

    const callback = () => {
      dispatch(finishPlayingAnimation());
      dispatch(dequeueAnimation());
      dispatch(runNextAnimation());
    };
    animation.payload.callbacks.push(callback);

    dispatch(startPlayingAnimation());
    dispatch(queueAnimation(animation));
    if (!isRunning) dispatch(runNextAnimation());
    // to-do: supplement callback to run next animation
    
  }
};

export const removeSlideInAnimation = (key: string) => {
  return {
    type: REMOVE_SLIDE_IN_ANIMATION,
    key
  }
}

export const removeSlideOutAnimation = (key: string) => {
  return {
    type: REMOVE_SLIDE_OUT_ANIMATION,
    key
  }
}

export const removeFlyOutAnimation = (key: string) => {
  return {
    type: REMOVE_FLY_OUT_ANIMATION,
    key
  }
}
