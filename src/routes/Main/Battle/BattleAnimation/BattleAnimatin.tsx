import React from "react";

import { withStyles } from "@material-ui/styles";
import { StyleRules } from "@material-ui/core";
import { connect } from "react-redux";
import {
  
} from "../../../../store/actions/battle";
import { Card } from "../../../../model/classes";

interface BattleAnimationProps {
  classes: Record<string, string>;
  
}

const styles: StyleRules = {};

class BattleAnimation extends React.Component<BattleAnimationProps> {
  render() {
    const { classes } = this.props;

    return (
      <>
        
      </>
    );
  }
}

const StyledBattleAnimation = withStyles(styles)(BattleAnimation);

const mapStateToProps = ({ battle }) => {
  return {
    drawPileCards: battle.card.drawPileCards,
    showDrawPile: battle.battle.showDrawPile,
    discardPileCards: battle.card.discardPileCards,
    showDiscardPile: battle.battle.showDiscardPile,
  };
};

export default connect(mapStateToProps, {
  
})(StyledBattleAnimation);
