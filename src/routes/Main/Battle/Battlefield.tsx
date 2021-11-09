import React from "react";

import { withStyles } from "@material-ui/styles";
import CardTable from "./CardTable";
import { MouseContextProvider } from "../../../components/context/withMouseContext";
import { ScreenContextProvider } from "../../../components/context/withScreenContext";
import MultiProvider from "../../../components/context/MultiProvide";
import { StyleRules } from "@material-ui/core";
import Interaction from "./Interaction";
import AimingArrow from "./AimingArrow";
import BattleUI from "./BattleUI/BattleUI";
import BattleAnimation from "./BattleAnimation/BattleAnimation";
import { deckMaster } from "../../../data/deck";
import StatusBar from "./StatusBar/StatusBar";
import { preloadAllAssets } from "../../../scripts/preload";

interface BattlefieldProps {
  classes: Record<string, string>;
}

const contextProviders = [MouseContextProvider, ScreenContextProvider];

const styles: StyleRules = {
  canvasContainer: {
    width: "100vw",
    height: "100vh",
    overflow: "hidden",
  },
};

class Battlefield extends React.Component<BattlefieldProps> {
  componentDidMount() {
    // preload card images
    preloadAllAssets();
  }

  render() {
    const { classes } = this.props;


    return (
      <MultiProvider providers={contextProviders}>
        <div
          id="map-area"
          className={classes.canvasContainer}
          onContextMenu={(e: React.MouseEvent) => e.preventDefault()}
        >
          <StatusBar />
          <CardTable />
          <AimingArrow />
          <BattleAnimation />
          <BattleUI />
        </div>
        <Interaction />
      </MultiProvider>
    );
  }
}

const StyledBattlefield = withStyles(styles)(Battlefield);

export default StyledBattlefield;
