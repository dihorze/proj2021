import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/styles";
import { StyleRules } from "@material-ui/core";
import { Point } from "../../../../model/positioning";
import FlyingCard from "../../../../components/Cards/FlyingCard";
import { cHeightXS, cWidthXS } from "../../../../data/Battlefield";
import { useScreenSize } from "../../../../components/util/useScreenSize";

const useStyles = makeStyles({} as StyleRules);

export interface ShuffleDiscardToDrawProps {
  duration?: number;
  delay?: number;

  noCards?: number;

  width?: number;
  height?: number;
}

const ShuffleDiscardToDraw: React.FC<ShuffleDiscardToDrawProps> = ({
  duration,
  delay,

  noCards,

  width,
  height,
}) => {
  const classes = useStyles();

  const [innerWidth, innerHeight] = useScreenSize();

  return (
    <>
      {new Array(noCards).fill(0).map((x, idx) => {
        const delayRandom = Math.random() * 500;
        return (
          <FlyingCard
            key={idx}
            loc={Point.at(innerWidth - 75, innerHeight - 75)}
            endLoc={Point.at(75, innerHeight - 75)}
            duration={duration - (idx === noCards - 1 ? 500 : delayRandom) + delay}
            delay={(idx === noCards - 1 ? 500 : delayRandom) + delay}
            width={width || cWidthXS}
            height={height || cHeightXS}
            isFading
          />
        );
      })}
    </>
  );
};

export default React.memo(ShuffleDiscardToDraw, () => true);
