import { AnyAction } from "@reduxjs/toolkit";
import { RootStateOrAny } from "react-redux";
import { ThunkAction } from "redux-thunk";
import { sleep } from "../../components/util/functions";
import { Anim } from "../../model/classes";
import {
  REMOVE_SLIDE_IN_ANIMATION,
  REMOVE_SLIDE_OUT_ANIMATION,
  REMOVE_FLY_OUT_ANIMATION,
  REMOVE_SHUFFLE_DISCARD_TO_DRAW_ANIMATION,
  PLAY_ANIMATION,
  REMOVE_SHRED_ANIMATION,
} from "./types";

export const PlayAnimation = (
  animation: Anim,
  duration = 0
): ThunkAction<Promise<any>, RootStateOrAny, unknown, AnyAction> => {
  return async (dispatch, getState) => {
    dispatch({
      type: PLAY_ANIMATION,
      animation,
    });
    await sleep(duration);
  }
};

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
  };
};

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
