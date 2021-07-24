import React from "react";
import Battlefield from "./Battle/Battlefield";

import { withStyles } from "@material-ui/styles";
import { StyleRules } from "@material-ui/core";
import TopBar from "./TopBar/TopBar";
import { ADeckOfCards } from "../../components/Deck/ADeckOfCards";
import { connect } from "react-redux";
import { Card } from "../../model/classes";
import { toggleDeckOfCards } from "../../store/actions/setting";

interface MainProps {
  classes: Record<string, string>;
  showDeck: boolean;
  deck: Array<Card>;
  toggleDeckOfCards: () => void;
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
      </>
    );
  }
}

const StyledMain = withStyles(styles)(Main);

const mapStateToProps = ({ setting, player }) => {
  return {
    showDeck: setting.setting.showDeck,
    deck: player.player.deck,
  };
};

export default connect(mapStateToProps, { toggleDeckOfCards })(StyledMain);
