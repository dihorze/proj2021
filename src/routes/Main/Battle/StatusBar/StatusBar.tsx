import { makeStyles } from "@material-ui/core";
import React, { useState } from "react";
import { connect } from "react-redux";
import { withScreenContext } from "../../../../components/context/withScreenContext";
import {
  getSTop,
  sDegInterval,
  sHeight,
  sOrigin,
  sWidth,
} from "../../../../data/Battlefield";
import { Point } from "../../../../model/positioning";
import { Status } from "./Status";

interface StatusBarProps {
  mot: number;
  met: number;
  res: number;
  screenSize: number[];
}

const useStyles = makeStyles({});

const StatusBar: React.FC<StatusBarProps> = ({ mot, met, res, screenSize }) => {
  const classes = useStyles({});
  const statuses = {
    mot,
    met,
    res,
  };

  const locs = getStatusLoc(statuses, screenSize);

  return (
    <>
      {locs.map((s, idx) => (
        <Status key={s.key} statusKey={s.key} loc={s.loc} value={s.val} />
      ))}
    </>
  );
};

const getStatusLoc = (statuses: any, screenSize: number[]) => {
  const len = Object.keys(statuses).length;
  return Object.keys(statuses).map((key, idx) => {
    const offset = idx - (len - 1) / 2;
    const alpha = offset * sDegInterval;
    const rad_alpha = (alpha / 180) * Math.PI;

    const [innerWidth, innerHeight] = screenSize;

    return {
      key,
      loc: Point.at(
        (innerWidth - sWidth) / 2 + sOrigin.y * Math.sin(rad_alpha),
        getSTop(innerHeight) + sOrigin.y * (1 - Math.cos(rad_alpha))
      ),
      val: statuses[key],
    };
  });
};

const mapStateToProps = ({ battle, player }) => {
  return {
    mot: player.player.mot,
    met: player.player.met,
    res: player.player.res,
  };
};

const screenContextStatusBar = withScreenContext(StatusBar);

export default connect(mapStateToProps)(screenContextStatusBar);
