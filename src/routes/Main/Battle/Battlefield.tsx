import React from "react";

import { withStyles } from "@material-ui/styles";
import Ground from "../Background/Background";
import TopBar from "../TopBar/TopBar";
import CardTable from "./CardTable";
import { MouseContextProvider } from "../../../components/context/withMouseContext";
import MultiProvider from "../../../components/context/MultiProvide";
import { StyleRules } from "@material-ui/core";

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
          <Ground />
          <TopBar />
          <CardTable />
        </div>
      </MultiProvider>
    );
  }
}

const StyledBattlefield = withStyles(styles)(Battlefield);

export default StyledBattlefield;
