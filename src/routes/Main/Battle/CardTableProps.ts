import { SlideInProps } from "../../../components/Cards/SlideIn";
import { SlideOutProps } from "../../../components/Cards/Slideout";
import { Card } from "../../../model/classes";
import { Point } from "../../../model/positioning";
import {
  activateAimingCard,
  deleteAllCards,
  deleteOneCard,
  selectCard,
  unselectCard,
  setHoveredCard,
  clearHoveredCard,
  startBattle,
  playACard,
  startTurn
} from "../../../store/actions/battle";
import { toggleCardSelectionPage } from "../../../store/actions/game";

export interface CardTableProps {
  mousePos: Point;
  screenSize: Array<number>;
  classes: Record<string, string>;
  cards: Array<Card>;
  selectedCard: string;
  aimingCard: string;
  hoveredCard: number;
  deleteAllCards: () => void;
  deleteOneCard: (key: string) => void;
  selectCard: (key: string) => void;
  unselectCard: () => void;
  setHoveredCard: (key: number) => void;
  clearHoveredCard: () => void;
  startBattle: () => void;
  playACard: (card: Card, loc: Point) => void;
  startTurn: () => void;
  toggleCardSelectionPage: () => void;

  slideInAnimation: SlideInProps[];
  slideOutAnimation: SlideOutProps[];
}

export interface CardTableStates {

}

export const CardTableMapStateToProps = ({ battle, animation }) => {
  return {
    cards: battle.card.cards,
    aimingCard: battle.card.aimingCard,
    hoveredCard: battle.card.hoveredCard,
    selectedCard: battle.card.selectedCard,
    
    slideInAnimation: animation.animation.slideInAnimation,
    slideOutAnimation: animation.animation.slideOutAnimation
  };
};


export const cardTableActions = {
  activateAimingCard,
  deleteAllCards,
  deleteOneCard,
  selectCard,
  unselectCard,
  setHoveredCard,
  clearHoveredCard,
  startBattle,
  playACard,
  startTurn,
  toggleCardSelectionPage
};





