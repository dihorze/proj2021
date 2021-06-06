import React from "react";

import styles from "./styles";
import { withStyles } from "@material-ui/styles";

interface CanvasProps {
  classes: Record<string, string>;
}

class Canvas extends React.Component<CanvasProps> {
  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <div>This is the Main page</div>
        
      </React.Fragment>
    );
  }
}

const StyledCanvas = withStyles(styles)(Canvas);

export default StyledCanvas;
