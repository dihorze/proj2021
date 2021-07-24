import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/styles";
import { StyleRules } from "@material-ui/core";
import { Point } from "../../model/positioning";
import { CardStaticComponent } from "./Card";
import { cTop, degInterval, origin } from "../../data/Battlefield";

const innerHeight = window.innerHeight;
const innerWidth = window.innerWidth;

const getCardTopLoc = (props: useStyleProps) => {
  const { isMounted, startLoc, endLoc, isToHand, handIdx, noCardsInHand } =
    props;
  if (!isMounted) return startLoc?.y || innerHeight - 150;
  if (isToHand) {
    const offset = handIdx - (noCardsInHand - 1) / 2;
    const alpha = offset * degInterval;
    const rad_alpha = (alpha / 180) * Math.PI;
    return cTop + origin.y * (1 - Math.cos(rad_alpha));
  }
  return endLoc?.y || innerHeight - 150;
};

const getCardLeftLoc = (props: useStyleProps) => {
  const {
    isMounted,
    startLoc,
    endLoc,
    isToHand,
    handIdx,
    noCardsInHand,
    width,
  } = props;
  if (!isMounted) return startLoc?.x || 50;
  if (isToHand) {
    const offset = handIdx - (noCardsInHand - 1) / 2;
    const alpha = offset * degInterval;
    const rad_alpha = (alpha / 180) * Math.PI;
    return (innerWidth - width) / 2 + origin.y * Math.sin(rad_alpha);
  }
  return endLoc?.x || 50;
};

const getCardTransform = (props: useStyleProps) => {
  const { isMounted, isToHand, isExpand, handIdx, noCardsInHand } = props;
  if (!isMounted) {
    if (isExpand) return `scale(0.1)`;
    else return "";
  }
  if (isToHand) {
    const offset = handIdx - (noCardsInHand - 1) / 2;
    const deg = offset * degInterval;
    return `rotate(${deg}deg)`;
  }
  return "";
};

const useStyles = makeStyles({
  animation: {
    opacity: ({ isMounted }: useStyleProps) => (isMounted ? 1 : 0),
    position: "fixed",
    top: getCardTopLoc,
    Left: getCardLeftLoc,
    transform: getCardTransform,
    transition: ({ duration }: useStyleProps) => `all ${duration}ms ease-in`,
  },
} as StyleRules);

interface CardProps {
  startLoc?: Point;
  endLoc?: Point;
  isToHand?: boolean;
  handIdx?: number;
  noCardsInHand?: number;
  isExpand?: boolean;
  duration?: number;
  delay?: number;

  width?: number;
  height?: number;
}

interface useStyleProps {
  isMounted?: boolean;
  startLoc?: Point;
  endLoc?: Point;
  isToHand?: boolean;
  handIdx?: number;
  noCardsInHand?: number;
  isExpand?: boolean;
  duration?: number;
  delay?: number;

  width?: number;
  height?: number;
}

const Card: React.FC<CardProps> = ({
  children,
  startLoc,
  endLoc,
  isToHand,
  handIdx,
  noCardsInHand,
  isExpand,
  duration,

  width,
  height,
  delay,
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    let tid: NodeJS.Timeout;
    if (delay && delay > 0) {
      tid = setTimeout(() => setIsMounted(true), delay);
    } else setIsMounted(true);

    return () => {
      clearTimeout(tid);
    };
  }, [delay]);

  const classes = useStyles({
    isMounted,
    children,
    startLoc,
    endLoc,
    isToHand,
    handIdx,
    noCardsInHand,
    isExpand,
    duration,
    width,
    height,
  } as useStyleProps);

  return (
    <div className={classes.animation}>
      <CardStaticComponent loc={Point.at(0, 0)} width={width} height={height} />
    </div>
  );
};

export default React.memo(Card, () => true);
