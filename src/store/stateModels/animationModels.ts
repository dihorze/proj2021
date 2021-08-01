import { FlyOutProps } from "../../components/Cards/FlyOut";
import { slideInDuration, SlideInProps } from "../../components/Cards/SlideIn";
import { SlideOutProps } from "../../components/Cards/Slideout";
import { Card, Anim } from "../../model/classes";
import { FLY_OUT, SLIDE_FROM_HAND, SLIDE_TO_HAND } from "./animationTypes";

interface AnimationState {
  queue?: Anim[];
  isPlaying?: boolean;

  slideInAnimation?: SlideInProps[];
  slideOutAnimation?: SlideOutProps[];
  flyOutAnimation?: FlyOutProps[];
}

export class AnimationStateBuilder {
  static init(): AnimationState {
    return {
      queue: [],
      isPlaying: false,

      slideInAnimation: [],
      slideOutAnimation: [],
      flyOutAnimation: [],
    };
  }

  static copy(state: AnimationState): AnimationState {
    return {
      queue: state.queue,
      isPlaying: state.isPlaying,

      slideInAnimation: [],
      slideOutAnimation: [],
      flyOutAnimation: [],
    };
  }

  static withNewArray(state: AnimationState, newArrays: AnimationState) {
    const newState = AnimationStateBuilder.copy(state);
    newState.queue = newArrays.queue || newState.queue;
    return newState;
  }

  static queueAnimation(state: AnimationState, animation: Anim) {
    return AnimationStateBuilder.withNewArray(state, {
      queue: state.queue.concat(animation),
    });
  }

  static startPlayingAnimation(state: AnimationState) {
    const newState = AnimationStateBuilder.copy(state);
    newState.isPlaying = true;
    return newState;
  }

  static finishPlayingAnimation(state: AnimationState) {
    const newState = AnimationStateBuilder.copy(state);
    newState.isPlaying = false;
    return newState;
  }

  static runNextAnimation(state: AnimationState) {
    if (state.queue.length <= 0) return state;
    switch (state.queue[0].type) {
      case SLIDE_TO_HAND:
        return AnimationStateBuilder.slideToHand(state, state.queue[0].payload);
      case SLIDE_FROM_HAND:
        return AnimationStateBuilder.slideFromHand(
          state,
          state.queue[0].payload
        );
      case FLY_OUT:
        return AnimationStateBuilder.flyOut(state, state.queue[0].payload);
      default:
        return state;
    }
  }

  static dequeueAnimation(state: AnimationState) {
    return AnimationStateBuilder.withNewArray(state, {
      queue: state.queue.slice(1), // dequeue buy array slicing, not splicing!
    });
  }

  static withNewAnimation(state: AnimationState, newArrays: AnimationState) {
    const newState = AnimationStateBuilder.copy(state);
    newState.slideInAnimation =
      newArrays.slideInAnimation || newState.slideInAnimation;
    newState.slideOutAnimation =
      newArrays.slideOutAnimation || newState.slideOutAnimation;
    newState.flyOutAnimation =
      newArrays.flyOutAnimation || newState.flyOutAnimation;
    return newState;
  }

  // Individual animations

  static slideToHand(state: AnimationState, payload: any) {
    const { cardsToAdd, cards, removeSlideInAnimation, callbacks } = payload;
    if (!cardsToAdd?.length) return state;
    const newSlideInAnimation: SlideInProps[] = state.slideInAnimation.concat(
      cardsToAdd.map((c: Card, idx: number) => {
        return {
          isToHand: true,
          isExpand: true,
          handIdx: cards.length + idx,
          noCardsInHand: cards.length + cardsToAdd.length,
          delay: slideInDuration * idx,
          duration: slideInDuration,
          card: c,
          callback:
            idx < cardsToAdd.length - 1
              ? () => {
                  removeSlideInAnimation(c.key);
                }
              : () => {
                  removeSlideInAnimation(c.key);
                  callbacks.forEach((f: Function) => f()); // any additional callback after all animation
                },
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
    const { keysToDelete, cards, removeSlideOutAnimation, callbacks } = payload;
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
            delay: 0,
            duration: 750, // adjust duration here
            card: cards[handIdx],
            callback:
              idx < keysToDelete.length - 1
                ? () => {
                    removeSlideOutAnimation(ckey);
                  }
                : () => {
                    removeSlideOutAnimation(ckey);
                    callbacks.forEach((f: Function) => f()); // any additional callback after all animation
                  },
          } as SlideInProps;
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
    const { locs, cardsToFly, removeFlyOutAnimation, callbacks } = payload;
    if (!cardsToFly?.length) return state;

    const newFlyOutAnimation: FlyOutProps[] = state.flyOutAnimation.concat(
      cardsToFly.map((card: Card, idx: number) => {
        return {
          loc: locs[idx],
          isShrink: true,
          duration: 750,
          delay: 0,
          card,
          callback:
            idx < cardsToFly.length - 1
              ? () => {
                  removeFlyOutAnimation(card.key);
                }
              : () => {
                  removeFlyOutAnimation(card.key);
                  callbacks.forEach((f: Function) => f()); // any additional callback after all animation
                },
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
}
