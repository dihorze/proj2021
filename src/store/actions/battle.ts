import { AnyAction } from "@reduxjs/toolkit";
import { RootStateOrAny } from "react-redux";
import { ThunkAction } from "redux-thunk";
import { shuffle, sleep } from "../../components/util/functions";
import { Card, Anim } from "../../model/classes";
import { Point } from "../../model/positioning";
import {
  FLY_OUT,
  SHRED,
  SHUFFLE_DISCARD_TO_DRAW,
  SLIDE_FROM_HAND,
  SLIDE_TO_HAND,
} from "../stateModels/animationTypes";
import {
  PlayAnimation,
  removeFlyOutAnimation,
  removeShredAnimation,
  removeShuffleDiscardToDrawAnimation,
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
  cardsToAdd: Array<Card>,
  unlockCallback: Function = null,
  delay = 100,
  duration = 400
): ThunkAction<void, RootStateOrAny, unknown, AnyAction> => {
  return async (dispatch, getState) => {
    const cards = [...getState().battle.card.cards];

    dispatch(addCardsToHand(cardsToAdd));
    // slide in animation
    const slideInAnim: Anim = {
      type: SLIDE_TO_HAND,
      payload: {
        cardsToAdd,
        cards,
        duration,
        delay,
      },
    };
    dispatch(PlayAnimation(slideInAnim));
    await sleep(delay * cardsToAdd.length + duration);
    cardsToAdd.forEach((card) => dispatch(removeSlideInAnimation(card.key)));
    if (unlockCallback) unlockCallback();
  };
};

export const deleteCardsFromHandAnimated = (
  keysToDelete: Array<string>,
  callback: Function,
  delay = 0,
  duration = 750
): ThunkAction<void, RootStateOrAny, unknown, AnyAction> => {
  return async (dispatch, getState) => {
    const cards = [...getState().battle.card.cards];
    const slideOutAnim: Anim = {
      type: SLIDE_FROM_HAND,
      payload: {
        keysToDelete,
        cards,
        delay,
        duration,
      },
    };
    dispatch(PlayAnimation(slideOutAnim));

    await sleep(delay + duration);
    keysToDelete.forEach((key) => dispatch(removeSlideOutAnimation(key)));
    dispatch(deleteCardsFromHand(keysToDelete));
    callback();
  };
};

export const drawCards = (
  quantity = -1,
  unlockCallback: Function
): ThunkAction<void, RootStateOrAny, unknown, AnyAction> => {
  return (dispatch, getState) => {
    // need to acquire lock
    const { battle, player } = getState();
    const newDrawPileCards = [...battle.card.drawPileCards];
    const maxHand = player.player.maxCardsInHand;
    let nHand = battle.card.cards.length;
    let n = newDrawPileCards.length;

    quantity = quantity < 0 ? player.player.cardsPerTurn : quantity;

    // end recursion if no cards in both piles
    if (n <= 0 && battle.card.discardPileCards.length <= 0) {
      unlockCallback();
      return;
    }
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

      if (quantity > 0 && nHand < maxHand) {
        dispatch(addCardsToHandAnimated(newCards));
        if (battle.card.discardPileCards.length > 0)
          dispatch(
            shuffleDiscardToDraw(() =>
              dispatch(drawCards(quantity, unlockCallback))
            )
          );
        else unlockCallback();
      } else dispatch(addCardsToHandAnimated(newCards, unlockCallback));
    } else {
      if (quantity > 0 && nHand < maxHand) {
        if (battle.card.discardPileCards.length > 0)
          dispatch(
            shuffleDiscardToDraw(() =>
              dispatch(drawCards(quantity, unlockCallback))
            )
          );
        else unlockCallback();
      }
    }
  };
};

export const drawCardsWithLock = (
  quantity = -1
): ThunkAction<void, RootStateOrAny, unknown, AnyAction> => {
  return (dispatch, getState) => {
    dispatch(tryLockCardTable((cb: Function) => drawCards(quantity, cb)));
  };
};

export const startBattle = (): ThunkAction<
  void,
  RootStateOrAny,
  unknown,
  AnyAction
> => {
  return (dispatch, getState) => {
    // need to acquire lock
    const { player } = getState();
    dispatch(addCardsToDrawPile(player.player.deck));
    dispatch(startTurn());
  };
};

export const shuffleDiscardToDraw = (
  callback: Function,
  duration = 1000,
  delay = 250
): ThunkAction<void, RootStateOrAny, unknown, AnyAction> => {
  return async (dispatch, getState) => {
    const { battle } = getState();
    const cards = shuffle([...battle.card.discardPileCards]);

    dispatch(incrementShuffle());
    dispatch(deleteCardsFromDiscardPile(cards.map((c) => c.key)));

    const sdtd: Anim = {
      type: SHUFFLE_DISCARD_TO_DRAW,
      payload: {
        duration,
        delay,
        noCards: cards.length,
      },
    };
    dispatch(PlayAnimation(sdtd));
    await sleep(delay + duration);

    dispatch(removeShuffleDiscardToDrawAnimation());
    dispatch(addCardsToDrawPile(cards));
    callback();
  };
};

export const discardCardsWithLock = (
  isDiscardAll: boolean = true,
  cards: Card[] = []
): ThunkAction<void, RootStateOrAny, unknown, AnyAction> => {
  return (dispatch) => {
    dispatch(
      tryLockCardTable((cb: Function) => discardCards(isDiscardAll, cards, cb))
    );
  };
};

export const discardCards = (
  isDiscardAll: boolean = true,
  cards: Card[] = [],
  unlockCallback: Function
): ThunkAction<void, RootStateOrAny, unknown, AnyAction> => {
  return (dispatch, getState) => {
    const cardsToDiscard = isDiscardAll ? getState().battle.card.cards : cards;
    const keys = cardsToDiscard.map((c: Card) => c.key);
    if (keys.length === 0) return unlockCallback();
    dispatch(
      deleteCardsFromHandAnimated(keys, () => {
        dispatch(addCardsToDiscardPile([...cardsToDiscard]));
        unlockCallback();
      })
    );
  };
}; // from hand

export const discardPlayedCardsWithLock = (
  cards: Card[],
  locs: Point[]
): ThunkAction<void, RootStateOrAny, unknown, AnyAction> => {
  return (dispatch, getState) => {
    dispatch(
      tryLockCardTable((cb: Function) => discardPlayedCards(cards, locs, cb))
    );
  };
};

export const discardPlayedCards = (
  cards: Card[],
  locs: Point[],
  unlockCallback: Function,
  duration = 750,
  delay = 0
): ThunkAction<void, RootStateOrAny, unknown, AnyAction> => {
  return async (dispatch, getState) => {
    const cardKeys = cards.map((c) => c.key);
    const flyOutAnim: Anim = {
      type: FLY_OUT,
      payload: {
        locs,
        cardsToFly: cards,
        duration,
        delay,
      },
    };
    dispatch(PlayAnimation(flyOutAnim));
    dispatch(deleteCardsFromHand(cardKeys));

    await sleep(delay + duration);

    cards.forEach((card) => dispatch(removeFlyOutAnimation(card.key)));
    dispatch(addCardsToDiscardPile(cards));
    unlockCallback();
  };
};

export const shredPlayedCardsWithLock = (
  cards: Card[],
  locs: Point[]
): ThunkAction<void, RootStateOrAny, unknown, AnyAction> => {
  return (dispatch, getState) => {
    dispatch(
      tryLockCardTable((cb: Function) => shredPlayedCards(cards, locs, cb))
    );
  };
};

export const shredPlayedCards = (
  cards: Card[],
  locs: Point[],
  unlockCallback: Function,
  duration = 750,
  delay = 0
): ThunkAction<void, RootStateOrAny, unknown, AnyAction> => {
  return async (dispatch, getState) => {
    const cardKeys = cards.map((c) => c.key);
    const shredAnim: Anim = {
      type: SHRED,
      payload: {
        locs,
        cardsToShred: cards,
        duration,
        delay,
      },
    };
    dispatch(PlayAnimation(shredAnim));
    dispatch(deleteCardsFromHand(cardKeys));

    await sleep(delay + duration);

    cards.forEach((card) => dispatch(removeShredAnimation(card.key)));
    // TO-DO: dispatch(addCardsToShredPile(cards));
    unlockCallback();
  };
};

export const playACard = (
  card: Card,
  loc: Point
): ThunkAction<void, RootStateOrAny, unknown, AnyAction> => {
  return (dispatch) => {
    // here for simulation of the effect of the card
    if (card.getIsShred()) dispatch(shredPlayedCardsWithLock([card], [loc]));
    // TO-DO: here to put the card in the shred pile
    else dispatch(discardPlayedCardsWithLock([card], [loc]));
  };
}; // from hand

export const addNewCardsOutsideDeck = (
  cards: Card[],
  locs: Point[]
): ThunkAction<void, RootStateOrAny, unknown, AnyAction> => {
  return (dispatch, getState) => {
    dispatch(
      tryLockCardTable((cb: Function) =>
        addCardsToDrawPileAnimated(cards, locs, cb)
      )
    );
  };
};

export const addCardsToDrawPileAnimated = (
  cards: Card[],
  locs: Point[],
  unlockCallback: Function,
  isFromHand = false,
  duration = 750,
  delay = 0
): ThunkAction<void, RootStateOrAny, unknown, AnyAction> => {
  return async (dispatch, getState) => {
    const flyOutAnim: Anim = {
      type: FLY_OUT,
      payload: {
        locs,
        endLoc: Point.at(25, window.innerHeight - 25),
        cardsToFly: cards,
        duration,
        delay,
      },
    };
    dispatch(PlayAnimation(flyOutAnim));

    if (isFromHand) dispatch(deleteCardsFromHand(cards.map((c) => c.key)));

    await sleep(delay + duration);

    cards.forEach((card) => dispatch(removeFlyOutAnimation(card.key)));
    dispatch(addCardsToDrawPile(cards));
    unlockCallback();
  };
};

export const startTurn = (): ThunkAction<
  void,
  RootStateOrAny,
  unknown,
  AnyAction
> => {
  return (dispatch, getState) => {
    const { player } = getState();
    dispatch(incrementRound());
    dispatch(drawCardsWithLock(player.player.cardsPerTurn));
  };
};

export const endTurn = (): ThunkAction<
  void,
  RootStateOrAny,
  unknown,
  AnyAction
> => {
  return (dispatch, getState) => {
    dispatch(discardCardsWithLock());
  };
};

// round counter

export const incrementRound = () => {
  return {
    type: INCREMENT_ROUND,
  };
};

// shuffle counter

export const incrementShuffle = () => {
  return {
    type: INCREMENT_SHUFFLE,
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

// lock related

export const lockCardTable = () => {
  return {
    type: LOCK_CARD_TABLE,
  };
};

export const unlockCardTable = () => {
  return {
    type: UNLOCK_CARD_TABLE,
  };
};

export const enqueueActionQueue = (action: Function) => {
  return {
    type: ENQUEUE_ACTION_QUEUE,
    action,
  };
};

export const dequeueActionQueue = () => {
  return {
    type: DEQUEUE_ACTION_QUEUE,
  };
};

export const unlockCardTableAndNext = (): ThunkAction<
  void,
  RootStateOrAny,
  unknown,
  AnyAction
> => {
  return async (dispatch, getState) => {
    const actionQueue: Function[] = getState().battle.card.actionQueue;
    if (actionQueue.length > 0) {
      const action = actionQueue[0];
      dispatch(dequeueActionQueue());
      await sleep(250);
      action();
    } else {
      dispatch(unlockCardTable());
    }
  };
};

export const tryLockCardTable = (
  action: Function
): ThunkAction<void, RootStateOrAny, unknown, AnyAction> => {
  return (dispatch, getState) => {
    if (getState().battle.card.cardTableLock) {
      dispatch(
        enqueueActionQueue(() =>
          dispatch(action(() => dispatch(unlockCardTableAndNext())))
        )
      );
    } else {
      dispatch(lockCardTable());
      dispatch(action(() => dispatch(unlockCardTableAndNext())));
    }
  };
};
