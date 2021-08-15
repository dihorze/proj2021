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
  REMOVE_SHUFFLE_DISCARD_TO_DRAW_ANIMATION,
  PLAY_ANIMATION,
  REMOVE_SHRED_ANIMATION,
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
) => {
  return {
    type: PLAY_ANIMATION,
    animation
  }
}


export const removeSlideInAnimation = (key: string) => {
  return {
    type: REMOVE_SLIDE_IN_ANIMATION,
    key,
  };
};

export const removeSlideOutAnimation = (key: string) => {
  return {
    type: REMOVE_SLIDE_OUT_ANIMATION,
    key,
  };
};

export const removeShredAnimation = (key: string) => {
  return {
    type: REMOVE_SHRED_ANIMATION,
    key,
  }
}

export const removeFlyOutAnimation = (key: string) => {
  return {
    type: REMOVE_FLY_OUT_ANIMATION,
    key,
  };
};

export const removeShuffleDiscardToDrawAnimation = () => {
  return {
    type: REMOVE_SHUFFLE_DISCARD_TO_DRAW_ANIMATION,
  };
};
