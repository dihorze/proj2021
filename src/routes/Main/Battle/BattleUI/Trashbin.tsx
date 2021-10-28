import React from "react";
import { makeStyles } from "@material-ui/styles";
import { StyleRules } from "@material-ui/core";
import { Point } from "../../../../model/positioning";

const useStyles = makeStyles({
  img: {
    width: 50,
    height: 50,
    position: "fixed",
    right: 50,
    bottom: 120,
  }
} as StyleRules);

interface TrashbinProps {
  locs?: Point;
  onClick?: (event?: React.MouseEvent) => void;
}

export const Trashbin: React.FC<TrashbinProps> = ({ locs, onClick }) => {
  const classes = useStyles({});

  return (
    <>
      <img
        className={classes.img}
        src="./assets/trashbin.png"
        alt="trashbin"
        draggable={false}
        onClick={onClick}
      ></img>
    </>
  );
};
