import { Point } from "../../../model/positioning";
import {
  activateAimingCard,
  addOneCard,
  addManyCards,
  deleteAllCards,
  deleteOneCard,
  selectCard,
  unselectCard
} from "../../../store/actions/battle";

export interface CardTableProps {
  mousePos: Point;
  classes: Record<string, string>;
  cards: Array<string>;
  selectedCard: string;
  aimingCard: string;
  addOneCard: (key: string) => void;
  addManyCards: (keys: Array<string>) => void;
  deleteAllCards: () => void;
  deleteOneCard: (key: string) => void;
  selectCard: (key: string) => void;
  unselectCard: () => void;
}

export interface CardTableStates {
  exitingCards: Array<string>;
  enteringCards: Array<string>;
  discardingCards: Record<string, number>;
  hoveredCard: number;
}

export const CardTableMapStateToProps = ({ battle }) => {
  return {
    cards: battle.card.cards,
    exitingCards: battle.card.exitingCards,
    discardingCards: battle.card.discardingCards, // from hand
    enteringCards: battle.card.enteringCards,
    aimingCard: battle.card.aimingCard,
    hoveredCard: battle.card.hoveredCard,
    selectedCard: battle.card.selectedCard,
  };
};

export const cardTableActions = {
  activateAimingCard,
  addOneCard,
  addManyCards,
  deleteAllCards,
  deleteOneCard,
  selectCard,
  unselectCard
};
