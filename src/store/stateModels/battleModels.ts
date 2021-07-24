import { shuffle } from "../../components/util/functions";
import { CardTypes } from "../../data/deck";
import { BattleAnimation, Card } from "../../model/classes";

interface CardTableState {
  drawPileCards?: Array<Card>;
  discardPileCards?: Array<Card>;
  cards?: Array<Card>;
  selectedCard?: string; // string
  aimingCard?: string; // string
  hoveredCard?: number; // index
}

export class CardTableStateBuilder {
  static init(): CardTableState {
    return {
      drawPileCards: [],
      discardPileCards: [],
      cards: [],
      aimingCard: CardTypes.NONE,
      selectedCard: CardTypes.NONE,
      hoveredCard: -1,
    };
  }

  // shadow copy
  static copy(state: CardTableState): CardTableState {
    return {
      drawPileCards: state.drawPileCards,
      discardPileCards: state.discardPileCards,
      cards: state.cards,
      aimingCard: state.aimingCard,
      selectedCard: state.selectedCard,
      hoveredCard: state.hoveredCard,
    };
  }

  static withNewArray(state: CardTableState, newArrays: CardTableState) {
    const newState = CardTableStateBuilder.copy(state);
    newState.cards = newArrays.cards || newState.cards;
    newState.drawPileCards = newArrays.drawPileCards || newState.drawPileCards;
    newState.discardPileCards =
      newArrays.discardPileCards || newState.discardPileCards;
    return newState;
  }

  static clearSecondaryStates(state: CardTableState) {
    state.aimingCard = CardTypes.NONE;
    state.selectedCard = CardTypes.NONE;
    state.hoveredCard = -1;
  }

  // actions
  static addOneCard(state: CardTableState, key: string): CardTableState {
    key = key || Math.floor(Math.random() * 10000) + "";
    const newCards = state.cards.concat(
      Card.init(key, key + "-" + Math.floor(Math.random() * 1000))
    );
    return CardTableStateBuilder.withNewArray(state, { cards: newCards });
  }

  static addManyCards(
    state: CardTableState,
    keys: Array<string>
  ): CardTableState {
    keys =
      keys ||
      new Array(5).fill(0).map(() => Math.floor(Math.random() * 10000) + "");
    const newCards = state.cards.concat(
      keys.map((k) => Card.init(k, k + "-" + Math.floor(Math.random() * 1000)))
    );
    return CardTableStateBuilder.withNewArray(state, { cards: newCards });
  }

  static deleteAllCards(state: CardTableState): CardTableState {
    const newState = CardTableStateBuilder.withNewArray(state, { cards: [] });
    CardTableStateBuilder.clearSecondaryStates(newState);
    return newState;
  }

  static deleteOneCard(state: CardTableState, key: string): CardTableState {
    const newState = CardTableStateBuilder.withNewArray(state, {
      cards: state.cards.filter((c) => c.key !== key),
    });
    CardTableStateBuilder.clearSecondaryStates(newState);
    return newState;
  }

  static selectCard(state: CardTableState, key: string): CardTableState {
    const newState = CardTableStateBuilder.copy(state);
    CardTableStateBuilder.clearSecondaryStates(newState);
    newState.selectedCard = key;
    return newState;
  }

  static unselectCard(state: CardTableState): CardTableState {
    const newState = CardTableStateBuilder.copy(state);
    CardTableStateBuilder.clearSecondaryStates(newState);
    return newState;
  }

  static setAimingCard(state: CardTableState, key: string): CardTableState {
    // const newState = CardTableStateBuilder.withNewArray(state, {
    //   cards: state.cards.filter((c) => c !== key),
    // });
    const newState = CardTableStateBuilder.copy(state);
    CardTableStateBuilder.clearSecondaryStates(newState);
    newState.aimingCard = key;
    return newState;
  }

  static setHoveredCard(state: CardTableState, index: number): CardTableState {
    const newState = CardTableStateBuilder.copy(state);
    newState.hoveredCard = index;
    return newState;
  }

  static clearHoveredCard(state: CardTableState): CardTableState {
    const newState = CardTableStateBuilder.copy(state);
    newState.hoveredCard = -1;
    return newState;
  }

  // battle related procedure functions

  static addCardsToHand(state: CardTableState, cards: Card[]): CardTableState {
    const newCards = state.cards.concat(cards.map((c) => c.copy()));
    return CardTableStateBuilder.withNewArray(state, {
      cards: newCards,
    });
  }

  // for play cards and delete cards
  static deleteCardsFromHand(
    state: CardTableState,
    keys: string[]
  ): CardTableState {
    const newState = CardTableStateBuilder.withNewArray(state, {
      cards: state.cards.filter((c) => !keys.includes(c.key)),
    });
    CardTableStateBuilder.clearSecondaryStates(newState);
    return newState;
  }

  static addCardsToDrawPile(
    state: CardTableState,
    cards: Card[]
  ): CardTableState {
    const shuffledCards = shuffle(cards);
    const newCards = state.drawPileCards.concat(
      shuffledCards.map((c) => c.copy())
    );
    return CardTableStateBuilder.withNewArray(state, {
      drawPileCards: newCards,
    });
  }

  static deleteCardsFromDrawPile(
    state: CardTableState,
    keys: string[]
  ): CardTableState {
    const newState = CardTableStateBuilder.withNewArray(state, {
      drawPileCards: state.drawPileCards.filter((c) => !keys.includes(c.key)),
    });
    return newState;
  }

  static drawCards(state: CardTableState, quantity: number): CardTableState {
    let n = state.drawPileCards.length;
    const newDrawPileCards = [...state.drawPileCards];
    const newCards = [...state.cards];
    while (quantity--) {
      const idx = Math.floor(Math.random() * n--);
      newCards.push(newDrawPileCards[idx]);
      newDrawPileCards.splice(idx, 1);
    }

    return CardTableStateBuilder.withNewArray(state, {
      cards: newCards,
      drawPileCards: newDrawPileCards,
    });
  }

  // add to discard pile only, does not delete from hand
  static addCardsToDiscardPile(
    state: CardTableState,
    cards: Card[]
  ): CardTableState {
    const newCards = state.discardPileCards.concat(cards.map((c) => c.copy()));
    return CardTableStateBuilder.withNewArray(state, {
      discardPileCards: newCards,
    });
  }

  static deleteCardsFromDiscardPile(
    state: CardTableState,
    keys: string[]
  ): CardTableState {
    const newState = CardTableStateBuilder.withNewArray(state, {
      discardPileCards: state.discardPileCards.filter(
        (c) => !keys.includes(c.key)
      ),
    });
    return newState;
  }
}

interface BattleState {
  round: number;
  showDrawPile: boolean;
  showDiscardPile: boolean;
}

export class BattleStateBuilder {
  static init(): BattleState {
    return {
      round: 0,
      showDrawPile: false,
      showDiscardPile: false,
    };
  }

  // shadow copy
  static copy(state: BattleState): BattleState {
    return {
      round: state.round,
      showDrawPile: state.showDrawPile,
      showDiscardPile: state.showDiscardPile,
    };
  }

  static startRound(state: BattleState): BattleState {
    const newState = BattleStateBuilder.copy(state);
    newState.round++;
    return newState;
  }

  static toggleDrawPile(state: BattleState): BattleState {
    const newState = BattleStateBuilder.copy(state);
    newState.showDrawPile = !newState.showDrawPile;
    return newState;
  }

  static toggleDiscardPile(state: BattleState): BattleState {
    const newState = BattleStateBuilder.copy(state);
    newState.showDiscardPile = !newState.showDiscardPile;
    return newState;
  }
}

interface BattleAnimationState {
  queue: BattleAnimation[];
}

export class BattleAnimationStateBuilder {
  static init(): BattleAnimationState {
    return {
      queue: [],
    };
  }

  static copy(state: BattleAnimationState): BattleAnimationState {
    return {
      queue: state.queue,
    };
  }

  static withNewArray(
    state: BattleAnimationState,
    newArrays: BattleAnimationState
  ) {
    const newState = BattleAnimationStateBuilder.copy(state);
    newState.queue = newArrays.queue || newState.queue;
    return newState;
  }

  static queueAnimation(
    state: BattleAnimationState,
    animation: BattleAnimation
  ) {
    return BattleAnimationStateBuilder.withNewArray(state, {
      queue: state.queue.concat(animation)
    });
  }
}
