import React from "react";

import { withStyles } from "@material-ui/styles";
import { StyleRules } from "@material-ui/core";
import { connect } from "react-redux";
import {} from "../../../../store/actions/battle";
import SlideIn, { SlideInProps } from "../../../../components/Cards/SlideIn";

interface BattleAnimationProps {
  classes: Record<string, string>;
  slideInProps: SlideInProps[];
}

const styles: StyleRules = {};

class BattleAnimation extends React.Component<BattleAnimationProps> {
  render() {
    const { classes } = this.props;

    return (
      <>
        {/* {this.props.slideInProps.map((props) => (
          <SlideIn {...props} key={props.handIdx}/>
        ))} */}
      </>
    );
  }
}

const StyledBattleAnimation = withStyles(styles)(BattleAnimation);

const mapStateToProps = ({ battle, animation }) => {
  return {
    drawPileCards: battle.card.drawPileCards,
    showDrawPile: battle.battle.showDrawPile,
    discardPileCards: battle.card.discardPileCards,
    showDiscardPile: battle.battle.showDiscardPile,

    slideInProps: animation.animation.slideInAnimation,
  };
};

export default connect(mapStateToProps, {})(StyledBattleAnimation);
