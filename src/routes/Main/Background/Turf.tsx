import React from "react";
import { makeStyles } from "@material-ui/styles";
import { StyleRules } from "@material-ui/core";
import { Point } from "../../../model/positioning";

const useStyles = makeStyles({
  turf: {
    width: 120,
    height: 120,
    backgroundColor: "red",
    position: "fixed",
    border: "5px solid black"
  }
} as StyleRules);

interface TurfProps {
  locs: Point;
  // coordinate of top left point of the turf
}

const Turf: React.FC<TurfProps> = ({ locs }) => {
  const classes = useStyles({});

  return (
    <div className={classes.turf} style={{ left: locs.x, top: locs.y }}></div>
  );
};

export default Turf;
