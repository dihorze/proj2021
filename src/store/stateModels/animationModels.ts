import { slideInDuration, SlideInProps } from "../../components/Cards/SlideIn";
import { Card, Anim } from "../../model/classes";
import { SLIDE_TO_HAND } from "./animationTypes";

interface AnimationState {
  queue?: Anim[];
  isPlaying?: boolean;

  slideInAnimation?: SlideInProps[];
}

export class AnimationStateBuilder {
  static init(): AnimationState {
    return {
      queue: [],
      isPlaying: false,

      slideInAnimation: [],
    };
  }

  static copy(state: AnimationState): AnimationState {
    return {
      queue: state.queue,
      isPlaying: state.isPlaying,

      slideInAnimation: [],
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
}
