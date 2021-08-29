import React from "react";

import { withStyles } from "@material-ui/styles";
import { StyleRules } from "@material-ui/core";
import { ADeckOfCards } from "../../../components/Deck/ADeckOfCards";
import { CardSelectionPage } from "../../../components/Deck/CardSelectionPage";
import { Point } from "../../../model/positioning";
import { Card } from "../../../model/classes";
import { toggleDeckOfCards } from "../../../store/actions/setting";
import { toggleCardSelectionPage } from "../../../store/actions/game";
import { addNewCardsOutsideDeck } from "../../../store/actions/battle";
import { connect } from "react-redux";

interface TogglableProps {
  classes: Record<string, string>;
  showDeck: boolean;
  deck: Array<Card>;
  showCardSelectionPage: boolean;
  toggleDeckOfCards: () => void;
  toggleCardSelectionPage: () => void;
  addNewCardsOutsideDeck: (cards: Card[], locs: Point[]) => void;
}

const styles: StyleRules = {};

class Togglable extends React.Component<TogglableProps> {
  render() {
    const { classes } = this.props;

    return (
      <>
        <ADeckOfCards
          show={this.props.showDeck}
          cards={this.props.deck}
          onContextMenu={this.props.toggleDeckOfCards}
        />
        <CardSelectionPage
          show={this.props.showCardSelectionPage}
          onContextMenu={this.props.toggleCardSelectionPage}
          onClick={(card: Card) => (event: React.MouseEvent) => {
            this.props.toggleCardSelectionPage();
            this.props.addNewCardsOutsideDeck(
              [card],
              [Point.at(window.innerWidth / 2, window.innerHeight / 2)]
            );
          }}
        />
      </>
    );
  }
}

const StyledTogglable = withStyles(styles)(Togglable);

const mapStateToProps = ({ setting, player, game }) => {
  return {
    showDeck: setting.setting.showDeck,
    deck: player.player.deck,

    showCardSelectionPage: game.game.showCardSelectionPage,
  };
};

export default connect(mapStateToProps, {
  toggleDeckOfCards,
  toggleCardSelectionPage,
  addNewCardsOutsideDeck,
})(StyledTogglable);
