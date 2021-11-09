import { FlyOutProps } from "../../components/Cards/FlyOut";
import { ShredProps } from "../../components/Cards/Shred";
import { SlideInProps } from "../../components/Cards/Slidein";
import { SlideOutProps } from "../../components/Cards/Slideout";
import { Card, Anim } from "../../model/classes";
import { ShuffleDiscardToDrawProps } from "../../routes/Main/Battle/BattleAnimation/ShuffleDiscardToDraw";
import {
  FLY_OUT,
  SHRED,
  SHUFFLE_DISCARD_TO_DRAW,
  SLIDE_FROM_HAND,
  SLIDE_TO_HAND,
} from "./animationTypes";

interface AnimationState {

  slideInAnimation?: SlideInProps[];
  slideOutAnimation?: SlideOutProps[];
  flyOutAnimation?: FlyOutProps[];
  shredAnimation?: ShredProps[];
  shuffleDiscardToDrawAnimation?: ShuffleDiscardToDrawProps;
}

export class AnimationStateBuilder {
  static init(): AnimationState {
    return {

      slideInAnimation: [],
      slideOutAnimation: [],
      flyOutAnimation: [],
      shredAnimation: [],
      shuffleDiscardToDrawAnimation: null,
    };
  }

  static copy(state: AnimationState): AnimationState {
    return {

      slideInAnimation: state.slideInAnimation,
      slideOutAnimation: state.slideOutAnimation,
      flyOutAnimation: state.flyOutAnimation,
      shredAnimation: state.shredAnimation,
      shuffleDiscardToDrawAnimation: state.shuffleDiscardToDrawAnimation,
    };
  }

  static playAnimation(state: AnimationState, anim: Anim) {
    switch (anim.type) {
      case SLIDE_TO_HAND:
        return AnimationStateBuilder.slideToHand(state, anim.payload);
      case SLIDE_FROM_HAND:
        return AnimationStateBuilder.slideFromHand(state, anim.payload);
      case FLY_OUT:
        return AnimationStateBuilder.flyOut(state, anim.payload);
      case SHRED:
        return AnimationStateBuilder.Shred(state, anim.payload);
      case SHUFFLE_DISCARD_TO_DRAW:
        return AnimationStateBuilder.shuffleDiscardToDraw(state, anim.payload);

      default:
        return state;
    }
  }

  static withNewAnimation(state: AnimationState, newArrays: AnimationState) {
    const newState = AnimationStateBuilder.copy(state);
    newState.slideInAnimation =
      newArrays.slideInAnimation || newState.slideInAnimation;
    newState.slideOutAnimation =
      newArrays.slideOutAnimation || newState.slideOutAnimation;
    newState.flyOutAnimation =
      newArrays.flyOutAnimation || newState.flyOutAnimation;
    newState.shredAnimation =
      newArrays.shredAnimation || newState.shredAnimation;
    return newState;
  }

  // Individual animations

  static slideToHand(state: AnimationState, payload: any) {
    const { cardsToAdd, cards, duration, delay } = payload;
    if (!cardsToAdd?.length) return state;
    const newSlideInAnimation: SlideInProps[] = state.slideInAnimation.concat(
      cardsToAdd.map((c: Card, idx: number) => {
        return {
          isToHand: true,
          isExpand: true,
          handIdx: cards.length + idx,
          noCardsInHand: cards.length + cardsToAdd.length,
          delay: delay * idx,
          duration,
          card: c,
        } as SlideInProps;
      })
    );

    return AnimationStateBuilder.withNewAnimation(state, {
      slideInAnimation: newSlideInAnimation,
    });
  }

  static removeSlideInAnimation(state: AnimationState, key: string) {
    const newSlideInAnimation = state.slideInAnimation.filter(
      (s) => s.card.key !== key
    );
    return AnimationStateBuilder.withNewAnimation(state, {
      slideInAnimation: newSlideInAnimation,
    });
  }

  static slideFromHand(state: AnimationState, payload: any) {
    const { keysToDelete, cards, delay, duration } = payload;
    
    if (!keysToDelete?.length) return state;
    const cardKeys: string[] = cards.map((c: Card) => c.key);
    const newSlideOutAnimation: SlideOutProps[] =
      state.slideOutAnimation.concat(
        keysToDelete.map((ckey: string, idx: number) => {
          const handIdx = cardKeys.findIndex((k) => k === ckey);
          return {
            isFromHand: true,
            isShrink: true,
            handIdx,
            noCardsInHand: cards.length,
            delay,
            duration,
            card: cards[handIdx],
          } as SlideOutProps;
        })
      );
    return AnimationStateBuilder.withNewAnimation(state, {
      slideOutAnimation: newSlideOutAnimation,
    });
  }

  static removeSlideOutAnimation(state: AnimationState, key: string) {
    const newSlideOutAnimation = state.slideOutAnimation.filter(
      (s) => s.card.key !== key
    );
    return AnimationStateBuilder.withNewAnimation(state, {
      slideOutAnimation: newSlideOutAnimation,
    });
  }

  static flyOut(state: AnimationState, payload: any) {
    const { locs, cardsToFly, duration, delay, endLoc } = payload;
    if (!cardsToFly?.length) return state;

    const newFlyOutAnimation: FlyOutProps[] = state.flyOutAnimation.concat(
      cardsToFly.map((card: Card, idx: number) => {
        return {
          loc: locs[idx],
          endLoc, 
          isShrink: true,
          duration,
          delay,
          card,
        } as FlyOutProps;
      })
    );
    return AnimationStateBuilder.withNewAnimation(state, {
      flyOutAnimation: newFlyOutAnimation,
    });
  }

  static removeFlyOutAnimation(state: AnimationState, key: string) {
    const newFlyOutAnimation = state.flyOutAnimation.filter(
      (s) => s.card.key !== key
    );

    return AnimationStateBuilder.withNewAnimation(state, {
      flyOutAnimation: newFlyOutAnimation,
    });
  }

  static Shred(state: AnimationState, payload: any) {
    const { locs, cardsToShred, duration, delay } = payload;
    if (!cardsToShred?.length) return state;

    const newShredAnimation: ShredProps[] = state.shredAnimation.concat(
      cardsToShred.map((card: Card, idx: number) => {
        return {
          loc: locs[idx],
          duration,
          delay,
          card,
        } as ShredProps;
      })
    );
    return AnimationStateBuilder.withNewAnimation(state, {
      shredAnimation: newShredAnimation,
    });
  }

  static removeShredAnimation(state: AnimationState, key: string) {
    const newShredAnimation = state.shredAnimation.filter(
      (s) => s.card.key !== key
    );

    return AnimationStateBuilder.withNewAnimation(state, {
      shredAnimation: newShredAnimation,
    });
  }

  static shuffleDiscardToDraw(state: AnimationState, payload: any) {
    const newState = AnimationStateBuilder.copy(state);
    const { noCards, duration, delay } = payload;
    const anim: ShuffleDiscardToDrawProps = {
      duration,
      delay,
      noCards: noCards || 10,
    };

    newState.shuffleDiscardToDrawAnimation = anim;
    return newState;
  }

  static removeShuffleDiscardToDrawAnimation(state: AnimationState) {
    const newState = AnimationStateBuilder.copy(state);
    newState.shuffleDiscardToDrawAnimation = null;
    return newState;
  }
}
