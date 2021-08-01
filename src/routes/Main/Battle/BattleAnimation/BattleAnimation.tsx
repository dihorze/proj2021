import React from "react";

import { withStyles } from "@material-ui/styles";
import { StyleRules } from "@material-ui/core";
import { connect } from "react-redux";
import {} from "../../../../store/actions/battle";
import SlideIn, { SlideInProps } from "../../../../components/Cards/SlideIn";
import Slideout, { SlideOutProps } from "../../../../components/Cards/Slideout";
import FlyOut, { FlyOutProps } from "../../../../components/Cards/FlyOut";

interface BattleAnimationProps {
  classes: Record<string, string>;
  slideInProps: SlideInProps[];
  slideOutProps: SlideOutProps[];
  flyOutProps: FlyOutProps[];
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
        {this.props.slideOutProps.map((props) => (
          <Slideout {...props} key={props.handIdx} />
        ))}
        {this.props.flyOutProps.map((props) => (
          <FlyOut {...props} key={props.card.key} />
        ))}
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
    slideOutProps: animation.animation.slideOutAnimation,
    flyOutProps: animation.animation.flyOutAnimation
  };
};

export default connect(mapStateToProps, {})(StyledBattleAnimation);
