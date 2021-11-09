import { makeStyles } from "@material-ui/core";
import React from "react";
import { sHeight, sWidth } from "../../../../data/Battlefield";
import { Point } from "../../../../model/positioning";

interface StatusProps {
  statusKey: string;
  value: number;
  loc: Point;
}

const useStyles = makeStyles({
  img: {
    width: "100%",
    height: "100%",
  },
  ctn: {
    position: "fixed",
    left: (props: StatusProps) => props.loc.x,
    top: (props: StatusProps) => props.loc.y,
    width: sWidth,
    height: sHeight,
  },
  val: {
    opacity: 0,
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    "&:hover": {
      opacity: 1,
    },
    transition: "200ms ease-out"
  },
  txt: {
    fontSize: 28,
    color: "white",
    // textShadow: "-2px 0 #333, 0 2px #333, 2px 0 #333, 0 -2px #333",
    WebkitTextStroke: "2px #333",
    margin: "auto",
    fontFamily: "Friz"
  },
});

export const Status: React.FC<StatusProps> = (props) => {
  const classes = useStyles(props);

  const { statusKey } = props;

  return (
    <div className={classes.ctn}>
      <img
        src={statusDict[statusKey].uri}
        alt={statusDict[statusKey].title}
        draggable={false}
        className={classes.img}
      />
      <div className={classes.val}>
        <div className={classes.txt}>{props.value}</div>
      </div>
    </div>
  );
};

const statusDict = {
  mot: {
    title: "Motivation",
    uri: "./assets/motivation.png",
  },
  met: {
    title: "methodology",
    uri: "./assets/methodology.png",
  },
  res: {
    title: "results",
    uri: "./assets/results.png",
  },
};
