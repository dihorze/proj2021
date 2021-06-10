import React from "react";

import styles from "../styles";
import { withStyles } from "@material-ui/styles";
import Ground from "../Background/Background";
import TopBar from "../TopBar/TopBar";

interface BattlefieldProps {
  classes: Record<string, string>;
}

class Battlefield extends React.Component<BattlefieldProps> {
  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <Ground />
        <TopBar />
      </React.Fragment>
    );
  }
}

const StyledBattlefield = withStyles(styles)(Battlefield);

export default StyledBattlefield;
