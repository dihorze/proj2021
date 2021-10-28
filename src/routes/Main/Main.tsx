import React from "react";
import Battlefield from "./Battle/Battlefield";

import { withStyles } from "@material-ui/styles";
import { StyleRules } from "@material-ui/core";
import TopBar from "./TopBar/TopBar";
import Togglable from "./Togglable/Togglable";

interface MainProps {
  classes: Record<string, string>;
}

const styles: StyleRules = {};

class Main extends React.Component<MainProps> {
  render() {
    const { classes } = this.props;

    return (
      <>
        <TopBar />
        <Battlefield />
        <Togglable />
      </>
    );
  }
}

const StyledMain = withStyles(styles)(Main);

export default StyledMain;
