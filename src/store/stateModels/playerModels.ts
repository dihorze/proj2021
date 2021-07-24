import { Card } from "../../model/classes";

interface PlayerState {
  mot: number;
  met: number;
  res: number;
  san: number;
  hIdx: number;
  $$: number;
  deck: Array<Card>;
  cardsPerTurn: number;
  maxCardsInHand: number;
}

export class PlayerStateBuilder {
  static init(): PlayerState {
    // starting deck
    const ids = new Array(10).fill(0).map((a, idx) => {
      const isComposite = Math.random() > 0.5;
      return idx < 5
        ? !isComposite
          ? "explain"
          : "quick_reference"
        : !isComposite
        ? "calm"
        : "smile_and_nod";
    });

    const deck = [];
    let a = 0,
      b = 0,
      c = 0,
      d = 0;
    ids.forEach((id) => {
      switch (id) {
        case "quick_reference":
          a++;
          deck.push(Card.init(id, id + "-" + a));
          break;

        case "explain":
          b++;
          deck.push(Card.init(id, id + "-" + b));
          break;

        case "smile_and_nod":
          c++;
          deck.push(Card.init(id, id + "-" + c));
          break;

        case "calm":
          d++;
          deck.push(Card.init(id, id + "-" + d));
          break;

        default:
          break;
      }
    });

    return {
      mot: 60,
      met: 15,
      res: 5,
      san: 200,
      hIdx: 1,
      $$: 2000,
      cardsPerTurn: 6,
      maxCardsInHand: 10,
      deck,
    };
  }

  static copy(state: PlayerState) {
    return {
      mot: state.mot,
      met: state.met,
      res: state.res,
      san: state.san,
      hIdx: state.hIdx,
      $$: state.$$,
      cardsPerTurn: state.cardsPerTurn,
      maxCardsInHand: state.maxCardsInHand,
      deck: state.deck,
    };
  }

  static addOneCardToDeck(state: PlayerState, id: string) {
    const newState = PlayerStateBuilder.copy(state);
    let cnt = 1;
    const keys = newState.deck.map((c) => c.key);
    let key = id + "-" + cnt++;
    while (keys.includes(key)) key = id + "-" + cnt++;
    newState.deck.concat(Card.init(id, key));
    return newState;
  }
}
