import {
  ACTIVATE_AIMING_CARD,
  ADD_MANY_CARDS,
  ADD_ONE_CARD,
  DELETE_ALL_CARDS,
  DELETE_ONE_CARDS,
  SELECT_CARD,
  UNSELECT_CARD,
} from "./types";

export const activateAimingCard = (key: string) => {
  return {
    type: ACTIVATE_AIMING_CARD,
    key,
  };
};

export const addOneCard = (key: string) => {
  return {
    type: ADD_ONE_CARD,
    key,
  };
};

export const addManyCards = (keys: Array<string>) => {
  return {
    type: ADD_MANY_CARDS,
    keys,
  };
};

export const deleteAllCards = () => {
  return {
    type: DELETE_ALL_CARDS,
  };
};

export const deleteOneCard = (key: string) => {
  return {
    type: DELETE_ONE_CARDS,
    key
  };
};

export const selectCard = (key: string) => {
  return {
    type: SELECT_CARD,
    key
  };
};

export const unselectCard = () => {
  return {
    type: UNSELECT_CARD
  }
}