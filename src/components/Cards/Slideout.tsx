import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/styles";
import { StyleRules } from "@material-ui/core";
import { Point } from "../../model/positioning";
import {
  cTop,
  degInterval,
  sinkCoefficient,
  origin,
  cWidth,
  cHeight,
} from "../../data/Battlefield";
import { CardStaticComponent } from "./Card";
import { Card } from "../../model/classes";

const innerWidth = window.innerWidth;

interface useStyleProps {
  loc?: Point;
  endLoc?: Point;

  isFromHand?: boolean;
  handIdx?: number;
  noCardsInHand?: number;
  isShrink?: boolean;
  duration?: number;

  refLoc?: Point;
  width?: number;
  height?: number;
  isExiting?: boolean;
}

const getTransition = (props: useStyleProps) => {
  // return "all 5000ms ease-in"
  return `all ${props.duration}ms`;
};

const getTransform = (props: useStyleProps) => {
  const { handIdx, noCardsInHand, isExiting, isShrink } = props;

  if (!isExiting) {
    const offset = handIdx - (noCardsInHand - 1) / 2;
    const deg = offset * degInterval;
    return `rotate(${deg}deg)`;
  }

  return isShrink ? "scale(0.01) rotate(0.4turn)" : "rotate(0.4turn)";
};

const getOffsetPath = (props: useStyleProps) => {
  const { loc, refLoc, width, height } = props;

  const baseTransform = Point.at(loc?.x - refLoc?.x, loc?.y - refLoc?.y);
  const offset = Point.at(width / 2, height / 2);
  const p1 = baseTransform.add(offset);
  const p2 = Point.at(innerWidth / 2, 50).add(offset);
  const cp1 = Point.at(baseTransform.x, - 0.2 * baseTransform.x + baseTransform.y).add(offset);
  const cp2 = Point.at(0, 0.1 * baseTransform.x - 50).add(offset);

  return `path('M ${p1.x} ${p1.y} C ${cp1.x} ${cp1.y}, ${cp2.x} ${cp2.y}, ${p2.x} ${p2.y}')`;
};

const useStyles = makeStyles({
  ctn: {
    opacity: ({ isExiting }: useStyleProps) => (isExiting ? "0" : "1"),
    position: "fixed",
    top: ({ refLoc }: useStyleProps) => refLoc.y,
    left: ({ refLoc }: useStyleProps) => refLoc.x,
    transformOrigin: "center",
    transition: getTransition,
    transform: getTransform,

    offsetPath: getOffsetPath,
    offsetDistance: ({ isExiting }: useStyleProps) =>
      isExiting ? "100%" : "0%",
    offsetRotate: "0deg",

    zIndex: 0,
    backgroundImage: "url('./assets/papercard.png')",
    backgroundSize: "cover",
  },
} as StyleRules);

export interface SlideOutProps {
  startLoc?: Point;
  endLoc?: Point;

  isFromHand?: boolean;
  handIdx?: number;
  noCardsInHand?: number;
  isShrink?: boolean;
  duration?: number;
  delay?: number;

  card?: Card;
  callback?: Function;

  width?: number;
  height?: number;
}

const SlideOut: React.FC<SlideOutProps> = ({
  startLoc,
  endLoc,

  isFromHand,
  handIdx,
  noCardsInHand,
  isShrink,
  duration,
  delay,

  card,
  callback,

  width,
  height,
}) => {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    let tid: NodeJS.Timeout;
    if (delay && delay > 0) tid = setTimeout(() => setIsExiting(true), delay);
    else setIsExiting(true);

    return () => {
      clearTimeout(tid);
    };
  }, [delay]);
  const w = width ? width : cWidth;
  const h = height ? height : cHeight;
  const refLoc = Point.at((innerWidth - w) / 2, cTop);

  const classes = useStyles({
    loc: getCardLoc({
      isFromHand,
      startLoc,
      handIdx,
      noCardsInHand,
      width: w,
    }),
    endLoc,
    refLoc,

    duration,
    isFromHand,

    isShrink,
    isExiting,

    width: w,
    height: h,
  });

  return (
    <div className={classes.ctn} onTransitionEnd={() => callback()}>
      <CardStaticComponent
        card={card}
        width={w}
        height={h}
        loc={Point.at(0, 0)}
      />
    </div>
  );
};

const getCardLoc = (props: SlideOutProps) => {
  const { isFromHand, startLoc, handIdx, noCardsInHand, width } = props;
  if (isFromHand) {
    const offset = handIdx - (noCardsInHand - 1) / 2;
    const alpha = offset * degInterval;
    const rad_alpha = (alpha / 180) * Math.PI;
    return Point.at(
      (innerWidth - width) / 2 + origin.y * Math.sin(rad_alpha),
      cTop + sinkCoefficient * origin.y * (1 - Math.cos(rad_alpha))
    );
  }
  return startLoc;
};

export default React.memo(SlideOut, () => true);
