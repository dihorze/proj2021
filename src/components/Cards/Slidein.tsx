import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/styles";
import { StyleRules } from "@material-ui/core";
import { Point } from "../../model/positioning";
import { CardStaticComponent } from "./Card";
import {
  cHeight,
  cTop,
  cWidth,
  degInterval,
  origin,
  sinkCoefficient,
} from "../../data/Battlefield";
import { Card } from "../../model/classes";

const innerHeight = window.innerHeight;
const innerWidth = window.innerWidth;

export const slideInDuration = 100; // only thing matters in this file

const getCardTopLoc = (props: useStyleProps) => {
  const { isMounted, startLoc, endLoc, isToHand, handIdx, noCardsInHand } =
    props;
  // if (!isMounted) return startLoc?.y || innerHeight - 150;
  if (isToHand) {
    const offset = handIdx - (noCardsInHand - 1) / 2;
    const alpha = offset * degInterval;
    const rad_alpha = (alpha / 180) * Math.PI;
    return cTop + sinkCoefficient * origin.y * (1 - Math.cos(rad_alpha));
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
  // if (!isMounted) return startLoc?.x || 50;
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
  if (isToHand) {
    if (!isMounted) {
      if (isExpand) return `scale(0.5) translate(-${innerWidth}px, 50%)`;
      else return "translate(-100%, -100%)";
    }
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
    left: getCardLeftLoc,
    transform: getCardTransform,
    transition: ({ duration }: useStyleProps) => `all ${duration}ms`,
  },
} as StyleRules);

export interface SlideInProps {
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
  card?: Card;

  callback: Function;
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

const SlideIn: React.FC<SlideInProps> = ({
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

  card,
  callback,
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
    width: width || cWidth,
    height,
  } as useStyleProps);

  return (
    <div className={classes.animation} onTransitionEnd={() => callback()}>
      <CardStaticComponent
        loc={Point.at(0, 0)}
        width={width || cWidth}
        height={height || cHeight}
        card={card}
      />
    </div>
  );
};

export default React.memo(SlideIn, () => true);
