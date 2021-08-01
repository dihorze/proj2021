import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/styles";
import { StyleRules } from "@material-ui/core";
import { Point } from "../../model/positioning";
import { cWidth, cHeight, cWidthL, cHeightL } from "../../data/Battlefield";
import { CardStaticComponent } from "./Card";
import { Card } from "../../model/classes";

const innerHeight = window.innerHeight;
const innerWidth = window.innerWidth;

interface useStyleProps {
  loc?: Point;
  endLoc?: Point;

  isShrink?: boolean;
  duration?: number;

  refLoc?: Point;
  width?: number;
  height?: number;
  isExiting?: boolean;
}

const getTransition = (props: useStyleProps) => {
  return `offset-distance ${props.duration}ms ease-in, transform ${props.duration}ms ease-out, opacity ${props.duration}ms ease-in`;
};

const getTransform = (props: useStyleProps) => {
  const { isExiting, isShrink } = props;

  if (!isExiting) {
    return "scale(1.3)";
  }

  return isShrink ? "scale(0.01)" : "scale(1.3)";
};

const getOffsetPath = (props: useStyleProps) => {
  const { width, height, loc, endLoc } = props;

  const desLoc = endLoc || Point.at(innerWidth - 25, innerHeight - 25); // absolute
  const baseTransform = Point.at(0, 0);
  const desRelLoc = desLoc.subtract(loc);
  const offset = Point.at(width / 2, height / 2);
  const p1 = baseTransform.add(offset);
  const p2 = desRelLoc.add(offset);
  const cp1 = baseTransform.subtract(Point.at(0, innerHeight / 2)).add(offset);
  const cp2 = Point.at(desRelLoc.x / 2, desRelLoc.y / 2).add(offset);

  return `path('M ${p1.x} ${p1.y} C ${cp1.x} ${cp1.y}, ${cp2.x} ${cp2.y}, ${p2.x} ${p2.y}')`;
};

const useStyles = makeStyles({
  ctn: {
    opacity: ({ isExiting }: useStyleProps) => (isExiting ? "0" : "1"),
    position: "fixed",
    top: ({ loc }: useStyleProps) => loc.y,
    left: ({ loc }: useStyleProps) => loc.x,
    transformOrigin: "center",
    transition: getTransition,
    transform: getTransform,
    offsetPath: getOffsetPath,
    offsetDistance: ({ isExiting }: useStyleProps) =>
      isExiting ? "100%" : "0%",
    offsetRotate: "auto 90deg",

    zIndex: 0,
    backgroundImage: "url('./assets/papercard.png')",
    backgroundSize: "cover",
  },
} as StyleRules);

export interface FlyOutProps {
  loc?: Point;
  endLoc?: Point;

  isShrink?: boolean;
  duration?: number;
  delay?: number;

  card?: Card;
  callback?: Function;

  width?: number;
  height?: number;
}

const FlyOut: React.FC<FlyOutProps> = ({
  loc,
  endLoc,

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

  const classes = useStyles({
    loc: loc.subtract(Point.at(w / 2, h / 2)).add(Point.at(10, 0)),
    endLoc,

    duration,

    isShrink,
    isExiting,

    width: w,
    height: h,
  });
  // onTransitionEnd={() => callback()}
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

export default React.memo(FlyOut, () => true);
