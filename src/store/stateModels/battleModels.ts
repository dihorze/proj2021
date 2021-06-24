import { CardTypes } from "../../model/classes";

interface CardTableState {
  cards?: Array<string>;
  selectedCard?: string; // index
  aimingCard?: string; // string
}

export class CardTableStateBuilder {
  static init(): CardTableState {
    return {
      cards: ["0", "1", "2", "3", "4", "5"],
      aimingCard: CardTypes.NONE,
      selectedCard: CardTypes.NONE,
    };
  }

  // shadow copy
  static copy(state: CardTableState): CardTableState {
    return {
      cards: state.cards,
      aimingCard: state.aimingCard,
      selectedCard: state.selectedCard,
    };
  }

  static withNewArray(state: CardTableState, newArrays: CardTableState) {
    const newState = CardTableStateBuilder.copy(state);
    newState.cards = newArrays.cards || newState.cards;
    return newState;
  }

  static clearSecondaryStates(state: CardTableState) {
    state.aimingCard = CardTypes.NONE;
    state.selectedCard = CardTypes.NONE;
  }


  // actions
  static setAimingCard(state: CardTableState, key: string): CardTableState {
    const newState = CardTableStateBuilder.copy(state);
    newState.aimingCard = key;
    newState.cards = newState.cards.filter((c) => c !== key);
    return newState;
  }

  static addOneCard(state: CardTableState, key: string): CardTableState {
    key = key || Math.floor(Math.random() * 10000) + "";
    const newCards = state.cards.concat(key);
    return CardTableStateBuilder.withNewArray(state, { cards: newCards });
  }

  static addManyCards(
    state: CardTableState,
    keys: Array<string>
  ): CardTableState {
    keys =
      keys ||
      new Array(5).fill(0).map(() => Math.floor(Math.random() * 10000) + "");
    const newCards = state.cards.concat(keys);
    return CardTableStateBuilder.withNewArray(state, { cards: newCards });
  }

  static deleteAllCards(state: CardTableState): CardTableState {
    const newState = CardTableStateBuilder.withNewArray(state, { cards: [] });
    CardTableStateBuilder.clearSecondaryStates(newState);
    return newState;
  }

  static deleteOneCard(state: CardTableState, key: string): CardTableState {
    const newState = CardTableStateBuilder.withNewArray(state, {
      cards: state.cards.filter(c => c !== key),
    });
    CardTableStateBuilder.clearSecondaryStates(newState);
    return newState;
  }
  
  static selectCard(state: CardTableState, key: string): CardTableState {
    const newState = CardTableStateBuilder.copy(state);
    newState.selectedCard = key;
    return newState;
  }

  static unselectCard(state: CardTableState): CardTableState {
    const newState = CardTableStateBuilder.copy(state);
    newState.selectedCard = CardTypes.NONE;
    return newState;
  }
}
