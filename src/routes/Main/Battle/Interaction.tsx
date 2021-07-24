import React, { Component } from "react";
import { connect } from "react-redux";
import {
  activeAttackZoneBottomLineY,
  activeCardTableZoneBottomLineY,
  activeZoneBottomLineY,
} from "../../../data/Battlefield";
import { CardTypes, getCardType } from "../../../data/deck";

import { setAimingCard, unselectCard } from "../../../store/actions/battle";

interface InteractionProps {
  selectedCard: string;
  aimingCard: string;
  setAimingCard: (key: string) => void;
  unselectCard: () => void;
}

class Interaction extends Component<InteractionProps> {
  componentDidMount() {
    window.addEventListener("mousemove", this.handleMouseMove);
    window.addEventListener("mouseup", this.handleMouseUp);
  }

  componentWillUnmount() {
    window.removeEventListener("mousemove", this.handleMouseMove);
    window.removeEventListener("mouseup", this.handleMouseUp);
  }

  handleMouseMove = (e: MouseEvent) => {
    if (
      getCardType(this.props.selectedCard) === CardTypes.ATTACK &&
      e.clientY < activeAttackZoneBottomLineY
    ) {
      this.props.setAimingCard(this.props.selectedCard);
    }
    if (
      this.props.aimingCard !== CardTypes.NONE &&
      e.clientY > activeCardTableZoneBottomLineY
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

  shouldComponentUpdate() {
    return false;
  }

  render() {
    return <div></div>;
  }
}

const mapStateToProps = ({ battle }) => {
  return {
    selectedCard: battle.card.selectedCard,
    aimingCard: battle.card.aimingCard,
  };
};

export default connect(mapStateToProps, { setAimingCard, unselectCard })(
  Interaction
);
