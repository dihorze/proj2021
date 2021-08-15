import React from "react";
import Battlefield from "./Battle/Battlefield";

import { withStyles } from "@material-ui/styles";
import { StyleRules } from "@material-ui/core";
import TopBar from "./TopBar/TopBar";
import { ADeckOfCards } from "../../components/Deck/ADeckOfCards";
import { connect } from "react-redux";
import { Card } from "../../model/classes";
import { toggleDeckOfCards } from "../../store/actions/setting";
import { CardSelectionPage } from "../../components/Deck/CardSelectionPage";
import { toggleCardSelectionPage } from "../../store/actions/game";
import { addNewCardsOutsideDeck } from "../../store/actions/battle";
import { Point } from "../../model/positioning";

interface MainProps {
  classes: Record<string, string>;
  showDeck: boolean;
  deck: Array<Card>;
  showCardSelectionPage: boolean;
  toggleDeckOfCards: () => void;
  toggleCardSelectionPage: () => void;
  addNewCardsOutsideDeck: (cards: Card[], locs: Point[]) => void;
}

const styles: StyleRules = {};

class Main extends React.Component<MainProps> {
  render() {
    const { classes } = this.props;

    return (
      <>
        <TopBar />
        <Battlefield />
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

const StyledMain = withStyles(styles)(Main);

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
})(StyledMain);
