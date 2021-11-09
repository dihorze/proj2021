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
  ADD_CARDS_TO_SHRED_PILE,
  ADD_MANY_CARDS,
  ADD_ONE_CARD,
  CLEAR_HOVERED_CARD,
  DELETE_ALL_CARDS,
  DELETE_CARDS_FROM_DISCARD_PILE,
  DELETE_CARDS_FROM_DRAW_PILE,
  DELETE_CARDS_FROM_HAND,
  DELETE_CARDS_FROM_SHRED_PILE,
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
  TOGGLE_SHRED_PILE,
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

export const addCardsToHand = (
  cards: Array<Card>
): ThunkAction<Promise<any>, RootStateOrAny, unknown, AnyAction> => {
  return (dispatch, getState) =>
    Promise.resolve().then(() => {
      dispatch({
        type: ADD_CARDS_TO_HAND,
        cards,
      });
    });
};

export const deleteCardsFromHand = (
  keys: Array<string>
): ThunkAction<Promise<any>, RootStateOrAny, unknown, AnyAction> => {
  return (dispatch, getState) =>
    Promise.resolve().then(() => {
      dispatch({
        type: DELETE_CARDS_FROM_HAND,
        keys,
      });
    });
};

export const addCardsToDrawPile = (
  cards: Array<Card>
): ThunkAction<Promise<any>, RootStateOrAny, unknown, AnyAction> => {
  return (dispatch, getState) =>
    Promise.resolve().then(() => {
      dispatch({
        type: ADD_CARDS_TO_DRAW_PILE,
        cards,
      });
    });
};

export const deleteCardsFromDrawPile = (
  keys: Array<string>
): ThunkAction<Promise<any>, RootStateOrAny, unknown, AnyAction> => {
  return (dispatch, getState) =>
    Promise.resolve().then(() => {
      dispatch({
        type: DELETE_CARDS_FROM_DRAW_PILE,
        keys,
      });
    });
};

export const addCardsToDiscardPile = (
  cards: Array<Card>
): ThunkAction<Promise<any>, RootStateOrAny, unknown, AnyAction> => {
  return (dispatch, getState) =>
    Promise.resolve().then(() => {
      dispatch({
        type: ADD_CARDS_TO_DISCARD_PILE,
        cards,
      });
    });
};

export const deleteCardsFromDiscardPile = (
  keys: Array<string>
): ThunkAction<Promise<any>, RootStateOrAny, unknown, AnyAction> => {
  return (dispatch, getState) =>
    Promise.resolve().then(() => {
      dispatch({
        type: DELETE_CARDS_FROM_DISCARD_PILE,
        keys,
      });
    });
};

export const addCardsToShredPile = (
  cards: Array<Card>
): ThunkAction<Promise<any>, RootStateOrAny, unknown, AnyAction> => {
  return (dispatch, getState) =>
    Promise.resolve().then(() => {
      dispatch({
        type: ADD_CARDS_TO_SHRED_PILE,
        cards,
      });
    });
};

export const deleteCardsFromShredPile = (
  keys: Array<string>
): ThunkAction<Promise<any>, RootStateOrAny, unknown, AnyAction> => {
  return (dispatch, getState) =>
    Promise.resolve().then(() => {
      dispatch({
        type: DELETE_CARDS_FROM_SHRED_PILE,
        keys,
      });
    });
};

export const addCardsToHandAnimated = (
  cardsToAdd: Array<Card>,
  delay = 100,
  duration = 400
): ThunkAction<Promise<any>, RootStateOrAny, unknown, AnyAction> => {
  return async (dispatch, getState) => {
    const cards = [...getState().battle.card.cards];

    await dispatch(addCardsToHand(cardsToAdd));
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
    await dispatch(PlayAnimation(slideInAnim, delay * cardsToAdd.length + duration));
    cardsToAdd.forEach((card) => dispatch(removeSlideInAnimation(card.key)));
  };
};

export const deleteCardsFromHandAnimated = (
  keysToDelete: Array<string>,
  delay = 0,
  duration = 750
): ThunkAction<Promise<any>, RootStateOrAny, unknown, AnyAction> => {
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
    await dispatch(PlayAnimation(slideOutAnim, delay + duration));
    keysToDelete.forEach((key) => dispatch(removeSlideOutAnimation(key)));
    await dispatch(deleteCardsFromHand(keysToDelete));
  };
};

export const drawCards = (
  quantity = -1
): ThunkAction<Promise<any>, RootStateOrAny, unknown, AnyAction> => {
  return async (dispatch, getState) => {
    // need to acquire lock
    const { battle, player } = getState();
    const newDrawPileCards = [...battle.card.drawPileCards];
    const maxHand = player.player.maxCardsInHand;
    let nHand = battle.card.cards.length;
    let n = newDrawPileCards.length;

    quantity = quantity < 0 ? player.player.cardsPerTurn : quantity;

    // end recursion if no cards in both piles
    if (n <= 0 && battle.card.discardPileCards.length <= 0) {
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

      await dispatch(deleteCardsFromDrawPile(newCards.map((c) => c.key)));

      if (quantity > 0 && nHand < maxHand) {
        dispatch(addCardsToHandAnimated(newCards)); // simultaneously with shuffle discard to draw
        if (battle.card.discardPileCards.length > 0)
          await dispatch(shuffleDiscardToDraw());
        await dispatch(drawCards(quantity));
      } else await dispatch(addCardsToHandAnimated(newCards));
    } else {
      if (quantity > 0 && nHand < maxHand) {
        if (battle.card.discardPileCards.length > 0)
          await dispatch(shuffleDiscardToDraw());
        await dispatch(drawCards(quantity));
      }
    }
  };
};

export const drawCardsWithLock = (
  quantity = -1
): ThunkAction<void, RootStateOrAny, unknown, AnyAction> => {
  return (dispatch, getState) => {
    dispatch(tryLockCardTable(() => drawCards(quantity)));
  };
};

export const startBattle = (): ThunkAction<
  void,
  RootStateOrAny,
  unknown,
  AnyAction
> => {
  return async (dispatch, getState) => {
    // need to acquire lock
    const { player } = getState();
    await dispatch(addCardsToDrawPile(player.player.deck));
    dispatch(startTurn());
  };
};

export const shuffleDiscardToDraw = (
  duration = 1000,
  delay = 250
): ThunkAction<Promise<any>, RootStateOrAny, unknown, AnyAction> => {
  return async (dispatch, getState) => {
    const { battle } = getState();
    const cards = shuffle([...battle.card.discardPileCards]);

    dispatch(incrementShuffle());
    await dispatch(deleteCardsFromDiscardPile(cards.map((c) => c.key)));

    const sdtd: Anim = {
      type: SHUFFLE_DISCARD_TO_DRAW,
      payload: {
        duration,
        delay,
        noCards: cards.length,
      },
    };
    await dispatch(PlayAnimation(sdtd, delay + duration));
    dispatch(removeShuffleDiscardToDrawAnimation());
    await dispatch(addCardsToDrawPile(cards));
  };
};

export const discardCardsWithLock = (
  isDiscardAll: boolean = true,
  cards: Card[] = []
): ThunkAction<void, RootStateOrAny, unknown, AnyAction> => {
  return (dispatch) => {
    dispatch(tryLockCardTable(() => discardCards(isDiscardAll, cards)));
  };
};

export const discardCards = (
  isDiscardAll: boolean = true,
  cards: Card[] = []
): ThunkAction<Promise<any>, RootStateOrAny, unknown, AnyAction> => {
  return async (dispatch, getState) => {
    const cardsToDiscard = isDiscardAll ? getState().battle.card.cards : cards;
    const keys = cardsToDiscard.map((c: Card) => c.key);
    if (keys.length === 0) return;
    await dispatch(deleteCardsFromHandAnimated(keys));
    await dispatch(addCardsToDiscardPile([...cardsToDiscard]));
  };
}; // from hand

export const discardPlayedCardsWithLock = (
  cards: Card[],
  locs: Point[]
): ThunkAction<void, RootStateOrAny, unknown, AnyAction> => {
  return (dispatch, getState) => {
    dispatch(
      tryLockCardTable(() => discardPlayedCards(cards, locs))
    );
  };
};

export const discardPlayedCards = (
  cards: Card[],
  locs: Point[],
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
    await dispatch(deleteCardsFromHand(cardKeys));
    await dispatch(PlayAnimation(flyOutAnim, delay + duration));
    cards.forEach((card) => dispatch(removeFlyOutAnimation(card.key)));
    await dispatch(addCardsToDiscardPile(cards));
  };
};

export const shredPlayedCardsWithLock = (
  cards: Card[],
  locs: Point[]
): ThunkAction<void, RootStateOrAny, unknown, AnyAction> => {
  return (dispatch, getState) => {
    dispatch(
      tryLockCardTable(() => shredPlayedCards(cards, locs))
    );
  };
};

export const shredPlayedCards = (
  cards: Card[],
  locs: Point[],
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

    await dispatch(deleteCardsFromHand(cardKeys));
    await dispatch(PlayAnimation(shredAnim, delay + duration));
    cards.forEach((card) => dispatch(removeShredAnimation(card.key)));
    dispatch(addCardsToShredPile(cards));
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
      tryLockCardTable(() =>
        addCardsToDrawPileAnimated(cards, locs)
      )
    );
  };
};

export const addCardsToDrawPileAnimated = (
  cards: Card[],
  locs: Point[],
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
    if (isFromHand) await dispatch(deleteCardsFromHand(cards.map((c) => c.key)));

    await dispatch(PlayAnimation(flyOutAnim, delay + duration));

    cards.forEach((card) => dispatch(removeFlyOutAnimation(card.key)));
    await dispatch(addCardsToDrawPile(cards));
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

export const toggleShredPile = () => {
  return {
    type: TOGGLE_SHRED_PILE,
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
  Promise<any>,
  RootStateOrAny,
  unknown,
  AnyAction
> => {
  return async (dispatch, getState) => {
    const actionQueue: Function[] = getState().battle.card.actionQueue;
    if (actionQueue.length > 0) {
      const action = actionQueue[0];
      dispatch(dequeueActionQueue());
      await sleep(150);
      await dispatch(action());
      await dispatch(unlockCardTableAndNext());
    } else {
      dispatch(unlockCardTable());
    }
  };
};

export const tryLockCardTable = (
  action: Function
): ThunkAction<Promise<any>, RootStateOrAny, unknown, AnyAction> => {
  return async (dispatch, getState) => {
    if (getState().battle.card.cardTableLock) {
      dispatch(enqueueActionQueue(action));
    } else {
      dispatch(lockCardTable());
      await dispatch(action());
      await dispatch(unlockCardTableAndNext());
    }
  };
};
