import React from "react";
import { makeStyles } from "@material-ui/styles";
import { StyleRules } from "@material-ui/core";
import { Point } from "../../../../model/positioning";

const useStyles = makeStyles({
  img: {
    width: 80,
    height: 80,
    position: "fixed",
    right: 25,
    bottom: 120,
  },
  cap: {
    width: 80,
    height: 80,
    position: "fixed",
    right: 25,
    bottom: 120,
    transition: "transform 300ms ease-in",
    transformOrigin: "58px 17px",
    "&:hover": {
      transform: "rotate3d(1, 0, 1, 45deg)",
    },
  },
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
      <img
        className={classes.cap}
        src="./assets/trashbincap.png"
        alt="cap"
        draggable={false}
        onClick={onClick}
      ></img>
    </>
  );
};
