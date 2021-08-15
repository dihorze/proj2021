import React, { Component } from "react";
import { connect } from "react-redux";
import { withMouseContext } from "../../../components/context/withMouseContext";
import { withScreenContext } from "../../../components/context/withScreenContext";
import {
  getActiveAttackZoneBottomLineY,
  getActiveCardTableZoneBottomLineY,
} from "../../../data/Battlefield";
import { CardTypes, getCardType } from "../../../data/deck";
import { Card } from "../../../model/classes";
import { Point } from "../../../model/positioning";

import {
  endTurn,
  selectCard,
  setAimingCard,
  startTurn,
  unselectCard,
} from "../../../store/actions/battle";

interface InteractionProps {
  mousePos: Point;
  screenSize: Array<number>;
  selectedCard: string;
  aimingCard: string;
  cards: Card[];
  setAimingCard: (key: string) => void;
  unselectCard: () => void;

  startTurn: () => void;
  endTurn: () => void;
  selectCard: (key: string) => void;
}

class Interaction extends Component<InteractionProps> {
  componentDidMount() {
    window.addEventListener("mousemove", this.handleMouseMove);
    window.addEventListener("mouseup", this.handleMouseUp);
    window.addEventListener("keyup", this.handleKeyUp);
  }

  componentWillUnmount() {
    window.removeEventListener("mousemove", this.handleMouseMove);
    window.removeEventListener("mouseup", this.handleMouseUp);
    window.removeEventListener("keyup", this.handleKeyUp);
  }

  handleMouseMove = (e: MouseEvent) => {
    if (
      getCardType(this.props.selectedCard) === CardTypes.ATTACK &&
      e.clientY < getActiveAttackZoneBottomLineY(this.props.screenSize[1])
    ) {
      this.props.setAimingCard(this.props.selectedCard);
    }
    if (
      this.props.aimingCard !== CardTypes.NONE &&
      e.clientY > getActiveCardTableZoneBottomLineY(this.props.screenSize[1])
    ) {
      this.props.unselectCard();
    }
  };

  handleMouseUp = (e: MouseEvent) => {
    if (e.button === 0) {
    } else {
      this.props.unselectCard();
    }
  };

  handleKeyUp = (e: KeyboardEvent) => {
    const nums = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
    if (nums.includes(e.key)) {
      const idx = nums.findIndex((num) => num === e.key);
      if (idx >= this.props.cards.length) return;

      const cardKey = this.props.cards[idx].key;

      if (this.props.aimingCard === cardKey || this.props.selectedCard === cardKey)
        return this.props.unselectCard();

      if (
        getCardType(cardKey) === CardTypes.ATTACK &&
        this.props.mousePos.y <
          getActiveAttackZoneBottomLineY(this.props.screenSize[1])
      ) {
        this.props.setAimingCard(cardKey);
      } else {
        this.props.selectCard(cardKey);
      }

      return;
    }

    switch (e.key) {
      case "e":
        return this.props.endTurn();
      case "s":
        return this.props.startTurn();

      default:
        return;
    }
  };

  shouldComponentUpdate() {
    return false;
  }

  render() {
    return <div></div>;
  }
}

const mouseContextInteraction = withMouseContext(Interaction);
const screenContextInteraction = withScreenContext(mouseContextInteraction);

const mapStateToProps = ({ battle }) => {
  return {
    selectedCard: battle.card.selectedCard,
    aimingCard: battle.card.aimingCard,
    cards: battle.card.cards,
  };
};

export default connect(mapStateToProps, {
  setAimingCard,
  unselectCard,
  endTurn,
  startTurn,
  selectCard,
})(screenContextInteraction);
