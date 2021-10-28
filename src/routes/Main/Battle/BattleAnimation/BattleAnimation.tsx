import React from "react";

import { withStyles } from "@material-ui/styles";
import { StyleRules } from "@material-ui/core";
import { connect } from "react-redux";
import {} from "../../../../store/actions/battle";
import SlideIn, { SlideInProps } from "../../../../components/Cards/SlideIn";
import Slideout, { SlideOutProps } from "../../../../components/Cards/Slideout";
import FlyOut, { FlyOutProps } from "../../../../components/Cards/FlyOut";
import ShuffleDiscardToDraw, {
  ShuffleDiscardToDrawProps,
} from "./ShuffleDiscardToDraw";
import Shred, { ShredProps } from "../../../../components/Cards/Shred";

interface BattleAnimationProps {
  classes: Record<string, string>;
  slideInProps: SlideInProps[];
  slideOutProps: SlideOutProps[];
  flyOutProps: FlyOutProps[];
  shredProps: ShredProps[];
  shuffleDiscardToDrawProps: ShuffleDiscardToDrawProps;

  round: number;
  shuffle: number;
}

const styles: StyleRules = {};

class BattleAnimation extends React.Component<BattleAnimationProps> {
  render() {
    const { classes, shuffle } = this.props;
    return (
      <>
        {this.props.flyOutProps.map((props) => (
          <FlyOut {...props} key={"flyout-" + props.card.key + "-" + shuffle} />
        ))}
        {this.props.shredProps.map((props) => (
          <Shred {...props} key={"shred-" + props.card.key + "-" + shuffle} />
        ))}
        {this.props.shuffleDiscardToDrawProps && (
          <ShuffleDiscardToDraw
            {...this.props.shuffleDiscardToDrawProps}
            key={"sdtd-" + shuffle}
          />
        )}
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
    flyOutProps: animation.animation.flyOutAnimation,
    shredProps: animation.animation.shredAnimation,
    shuffleDiscardToDrawProps:
      animation.animation.shuffleDiscardToDrawAnimation,

    round: battle.battle.round,
    shuffle: battle.battle.noShuffles,
  };
};

export default connect(mapStateToProps, {})(StyledBattleAnimation);
