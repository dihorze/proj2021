import { AnyAction } from "@reduxjs/toolkit";
import { RootStateOrAny } from "react-redux";
import { ThunkAction } from "redux-thunk";
import { FlyOutProps } from "../../components/Cards/FlyOut";
import { shuffle } from "../../components/util/functions";
import { Card, Anim } from "../../model/classes";
import { Point } from "../../model/positioning";
import {
  FLY_OUT,
  SLIDE_FROM_HAND,
  SLIDE_TO_HAND,
} from "../stateModels/animationTypes";
import {
  PlayAnimation,
  removeFlyOutAnimation,
  removeSlideInAnimation,
  removeSlideOutAnimation,
} from "./animation";
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
  SELECT_CARD,
  SET_AIMING_CARD,
  SET_HOVERED_CARD,
  TOGGLE_DISCARD_PILE,
  TOGGLE_DRAW_PILE,
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
    key,
  };
};

export const selectCard = (key: string) => {
  return {
    type: SELECT_CARD,
    key,
  };
};

export const unselectCard = () => {
  return {
    type: UNSELECT_CARD,
  };
};

export const setAimingCard = (key: string) => {
  return {
    type: SET_AIMING_CARD,
    key,
  };
};

export const setHoveredCard = (idx: number) => {
  return {
    type: SET_HOVERED_CARD,
    index: idx,
  };
};

export const clearHoveredCard = () => {
  return {
    type: CLEAR_HOVERED_CARD,
  };
};

// Battle Procedures

export const addCardsToHand = (cards: Array<Card>) => {
  return {
    type: ADD_CARDS_TO_HAND,
    cards,
  };
};

export const deleteCardsFromHand = (keys: Array<string>) => {
  return {
    type: DELETE_CARDS_FROM_HAND,
    keys,
  };
};

export const addCardsToDrawPile = (cards: Array<Card>) => {
  return {
    type: ADD_CARDS_TO_DRAW_PILE,
    cards,
  };
};

export const deleteCardsFromDrawPile = (keys: Array<string>) => {
  return {
    type: DELETE_CARDS_FROM_DRAW_PILE,
    keys,
  };
};

export const addCardsToDiscardPile = (cards: Array<Card>) => {
  return {
    type: ADD_CARDS_TO_DISCARD_PILE,
    cards,
  };
};

export const deleteCardsFromDiscardPile = (keys: Array<string>) => {
  return {
    type: DELETE_CARDS_FROM_DISCARD_PILE,
    keys,
  };
};

export const addCardsToHandAnimated = (
  cardsToAdd: Array<Card>
): ThunkAction<void, RootStateOrAny, unknown, AnyAction> => {
  return (dispatch, getState) => {
    const cards = [...getState().battle.card.cards];
    // to-do: create callback to display cards ? and remove animation states
    dispatch(addCardsToHand(cardsToAdd));
    // slide in animation
    const slideInAnim: Anim = {
      type: SLIDE_TO_HAND,
      payload: {
        callbacks: [],
        cardsToAdd,
        cards,
        removeSlideInAnimation: (key: string) =>
          dispatch(removeSlideInAnimation(key)),
      },
    };
    dispatch(PlayAnimation(slideInAnim));
  };
};

export const deleteCardsFromHandAnimated = (
  keysToDelete: Array<string>,
  callback: Function
): ThunkAction<void, RootStateOrAny, unknown, AnyAction> => {
  return (dispatch, getState) => {
    const cards = [...getState().battle.card.cards];
    const slideOutAnim: Anim = {
      type: SLIDE_FROM_HAND,
      payload: {
        callbacks: [callback],
        keysToDelete,
        cards,
        removeSlideOutAnimation: (key: string) =>
          dispatch(removeSlideOutAnimation(key)),
      },
    };
    dispatch(PlayAnimation(slideOutAnim));
    dispatch(deleteCardsFromHand(keysToDelete)); // maybe replaced
  };
};

export const drawCards = (
  quantity = -1
): ThunkAction<void, RootStateOrAny, unknown, AnyAction> => {
  return (dispatch, getState) => {
    const { battle, player } = getState();
    const newDrawPileCards = [...battle.card.drawPileCards];
    const maxHand = player.player.maxCardsInHand;
    let nHand = battle.card.cards.length;
    let n = newDrawPileCards.length;

    quantity = quantity < 0 ? player.player.cardsPerTurn : quantity;

    // end recursion if no cards in both piles
    if (n <= 0 && battle.card.discardPileCards.length <= 0) return;
    const newCards = [];

    const nDraw = Math.min(quantity, n); // max to draw with draw pile

    if (nDraw > 0) {
      if (nHand + nDraw <= maxHand) {
        newCards.push(...newDrawPileCards.slice(0, nDraw));
        quantity -= nDraw;
        nHand += nDraw;
        n -= nDraw;
      } else {
        newCards.push(...newDrawPileCards.slice(0, maxHand - nHand));
        quantity -= maxHand - nHand;
        nHand = maxHand;
        n -= maxHand - nHand;
      }

      dispatch(deleteCardsFromDrawPile(newCards.map((c) => c.key)));
      dispatch(addCardsToHandAnimated(newCards));
    }

    if (quantity > 0 && nHand < maxHand) {
      setTimeout(() => {
        dispatch(shuffleDiscardToDraw());
        setTimeout(() => {
          dispatch(drawCards(quantity));
        }, 800); // for shuffling
      }, 1000); // need to wait for draw pile is clean for simulation purpose
    }
  };
};

export const startBattle = (): ThunkAction<
  void,
  RootStateOrAny,
  unknown,
  AnyAction
> => {
  return (dispatch, getState) => {
    const { player } = getState();
    dispatch(addCardsToDrawPile(player.player.deck));
    dispatch(drawCards(player.player.cardsPerTurn));
  };
};

export const shuffleDiscardToDraw = (): ThunkAction<
  void,
  RootStateOrAny,
  unknown,
  AnyAction
> => {
  return (dispatch, getState) => {
    const { battle } = getState();
    const cards = shuffle([...battle.card.discardPileCards]);
    dispatch(deleteCardsFromDiscardPile(cards.map((c) => c.key)));
    setTimeout(() => {
      dispatch(addCardsToDrawPile(cards));
    }, 500);
  };
};

export const discardCards = (
  cards: Card[]
): ThunkAction<void, RootStateOrAny, unknown, AnyAction> => {
  return (dispatch) => {
    const keys = cards.map((c) => c.key);
    dispatch(
      deleteCardsFromHandAnimated(keys, () =>
        dispatch(addCardsToDiscardPile(cards))
      )
    );
  };
}; // from hand

export const discardPlayedCards = (
  cards: Card[],
  locs: Point[]
): ThunkAction<void, RootStateOrAny, unknown, AnyAction> => {
  return (dispatch, getState) => {
    const cardKeys = cards.map((c) => c.key);
    const flyOutAnim: Anim = {
      type: FLY_OUT,
      payload: {
        callbacks: [() => dispatch(addCardsToDiscardPile(cards))],
        locs,
        cardsToFly: cards,
        removeFlyOutAnimation: (key: string) =>
          dispatch(removeFlyOutAnimation(key)),
      },
    };
    dispatch(PlayAnimation(flyOutAnim));
    dispatch(deleteCardsFromHand(cardKeys));
  };
};

export const playACard = (
  card: Card,
  loc: Point
): ThunkAction<void, RootStateOrAny, unknown, AnyAction> => {
  return (dispatch) => {
    // here for simulation of the effect of the card
    if (card.getIsShred()) return;
    // TO-DO: here to put the card in the shred pile
    else dispatch(discardPlayedCards([card], [loc]));
  };
}; // from hand

export const endTurn = (): ThunkAction<
  void,
  RootStateOrAny,
  unknown,
  AnyAction
> => {
  return (dispatch, getState) => {
    const { battle } = getState();
    dispatch(discardCards([...battle.card.cards]));
  };
};

// UI Related

export const toggleDrawPile = () => {
  return {
    type: TOGGLE_DRAW_PILE,
  };
};

export const toggleDiscardPile = () => {
  return {
    type: TOGGLE_DISCARD_PILE,
  };
};
