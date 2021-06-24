import React from "react";
import { makeStyles } from "@material-ui/styles";
import { StyleRules } from "@material-ui/core";
import { Point } from "../../../model/positioning";

const useStyles = makeStyles({
  img: {
    width: 96,
    height: 96,
    position: "fixed",
    right: 50,
    bottom: 50,
  },
  cap: {
    width: 96,
    height: 96,
    position: "fixed",
    right: 50,
    bottom: 50,
    transition: "transform 300ms ease-in",
    transformOrigin: "70px 20px",
    "&:hover": {
      transform: "rotate3d(1, 0, 1, 45deg)",
    },
  },
} as StyleRules);

interface TrashbinProps {
  locs?: Point;
  onClick?: (event: React.MouseEvent) => void;
}

export const Trashbin: React.FC<TrashbinProps> = ({ locs }) => {
  const classes = useStyles({});

  return (
    <>
      <img
        className={classes.img}
        src="https://user-images.githubusercontent.com/42278106/122674246-d62f6880-d206-11eb-863b-6b97ee65aaff.png"
        alt="trashbin"
        draggable={false}
      ></img>
      <img
        className={classes.cap}
        src="https://user-images.githubusercontent.com/42278106/122674385-7d140480-d207-11eb-9970-5f384563e1ea.png"
        alt="cap"
        draggable={false}
      ></img>
    </>
  );
};
