import { SlideInProps } from "../../../components/Cards/SlideIn";
import { Card } from "../../../model/classes";
import { Point } from "../../../model/positioning";
import {
  activateAimingCard,
  addOneCard,
  addManyCards,
  deleteAllCards,
  deleteOneCard,
  selectCard,
  unselectCard,
  setHoveredCard,
  clearHoveredCard,
  startBattle,
  playACard,
  drawCards
} from "../../../store/actions/battle";

export interface CardTableProps {
  mousePos: Point;
  classes: Record<string, string>;
  cards: Array<Card>;
  selectedCard: string;
  aimingCard: string;
  hoveredCard: number;
  addOneCard: (key: string) => void;
  addManyCards: (keys: Array<string>) => void;
  deleteAllCards: () => void;
  deleteOneCard: (key: string) => void;
  selectCard: (key: string) => void;
  unselectCard: () => void;
  setHoveredCard: (key: number) => void;
  clearHoveredCard: () => void;
  startBattle: () => void;
  playACard: (card: Card, loc: Point) => void;
  drawCards: () => void;

  slideInAnimation: SlideInProps[];
}

export interface CardTableStates {

}

export const CardTableMapStateToProps = ({ battle, animation }) => {
  return {
    cards: battle.card.cards,
    aimingCard: battle.card.aimingCard,
    hoveredCard: battle.card.hoveredCard,
    selectedCard: battle.card.selectedCard,
    
    slideInAnimation: animation.animation.slideInAnimation
  };
};


export const cardTableActions = {
  activateAimingCard,
  addOneCard,
  addManyCards,
  deleteAllCards,
  deleteOneCard,
  selectCard,
  unselectCard,
  setHoveredCard,
  clearHoveredCard,
  startBattle,
  playACard,
  drawCards
};


