import React from "react";

import { withStyles } from "@material-ui/styles";
import { StyleRules } from "@material-ui/core";
import { DiscardStack } from "./DiscardStack";
import { Trashbin } from "./Trashbin";
import { DrawStack } from "./DrawStack";
import { Scene } from "./Scene";
import { connect } from "react-redux";
import {
  toggleDrawPile,
  toggleDiscardPile,
  endTurn,
} from "../../../../store/actions/battle";
import { Card } from "../../../../model/classes";

interface BattleUIProps {
  classes: Record<string, string>;
  drawPileCards: Array<Card>;
  showDrawPile: boolean;
  toggleDrawPile: () => void;
  discardPileCards: Array<Card>;
  showDiscardPile: boolean;
  toggleDiscardPile: () => void;
  endTurn: () => void;
}

const styles: StyleRules = {};

class BattleUI extends React.Component<BattleUIProps> {
  render() {
    const { classes } = this.props;

    return (
      <>
        <Scene />
        <Trashbin onClick={this.props.endTurn}/>
        <DiscardStack
          showDiscardDeck={this.props.showDiscardPile}
          cards={this.props.discardPileCards}
          onClick={this.props.toggleDiscardPile}
          onContextMenu={this.props.toggleDiscardPile}
        />
        <DrawStack
          showDrawDeck={this.props.showDrawPile}
          cards={this.props.drawPileCards}
          onClick={this.props.toggleDrawPile}
          onContextMenu={this.props.toggleDrawPile}
        />
      </>
    );
  }
}

const StyledBattleUI = withStyles(styles)(BattleUI);

const mapStateToProps = ({ battle }) => {
  return {
    drawPileCards: battle.card.drawPileCards,
    showDrawPile: battle.battle.showDrawPile,
    discardPileCards: battle.card.discardPileCards,
    showDiscardPile: battle.battle.showDiscardPile,
  };
};

export default connect(mapStateToProps, {
  toggleDrawPile,
  toggleDiscardPile,
  endTurn,
})(StyledBattleUI);
