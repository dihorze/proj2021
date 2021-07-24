import React from "react";

import { withStyles } from "@material-ui/styles";
import CardTable from "./CardTable";
import { MouseContextProvider } from "../../../components/context/withMouseContext";
import MultiProvider from "../../../components/context/MultiProvide";
import { StyleRules } from "@material-ui/core";
import Interaction from "./Interaction";
import AimingArrow from "./AimingArrow";
import BattleUI from "./BattleUI/BattleUI";


interface BattlefieldProps {
  classes: Record<string, string>;
}

const contextProviders = [MouseContextProvider];

const styles: StyleRules = {
  canvasContainer: {
    width: "100vw",
    height: "100vh",
    overflow: "hidden",
  },
};

class Battlefield extends React.Component<BattlefieldProps> {
  render() {
    const { classes } = this.props;

    return (
      <MultiProvider providers={contextProviders}>
        <div
          id="map-area"
          className={classes.canvasContainer}
          onContextMenu={(e: React.MouseEvent) => e.preventDefault()}
        >
          <CardTable />
          <AimingArrow />
          <BattleUI />
        </div>
        <Interaction />
      </MultiProvider>
    );
  }
}

const StyledBattlefield = withStyles(styles)(Battlefield);

export default StyledBattlefield;
