import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/styles";
import { StyleRules } from "@material-ui/core";
import { Point } from "../../model/positioning";
import { cWidth, cHeight, cWidthL, cHeightL } from "../../data/Battlefield";
import { CardStaticComponent } from "./Card";
import { Card } from "../../model/classes";
import { getDistance } from "../../model/fomula";
import { useScreenSize } from "../util/useScreenSize";

interface useStyleProps {
  loc?: Point;
  endLoc?: Point;
  duration?: number;
  width?: number;
  height?: number;
  isExiting?: boolean;
  offsetRotate?: string;
  isFading?: boolean;
  innerWidth?: number;
  innerHeight?: number;
}

const getTransition = (props: useStyleProps) => {
  return `offset-distance ${props.duration}ms ease-in-out, opacity ${props.duration}ms ease-in-out`;
};

const getOffsetPath = (props: useStyleProps) => {
  const { width, height, loc, endLoc, innerWidth, innerHeight } = props;

  const desLoc = endLoc || Point.at(innerWidth - 25, innerHeight - 25); // absolute
  const baseTransform = Point.at(0, 0);
  const desRelLoc = desLoc.subtract(loc);

  const dist = getDistance(desRelLoc, baseTransform);
  const d1 = (Math.random() * dist) / 2,
    d2 = (Math.random() * dist) / 2;
  const t1 = Math.random() * 0.52 - 0.26,
    t2 = Math.random() * 0.52 - 0.26;
  const t = Math.atan2(desRelLoc.y, desRelLoc.x);

  const offset = Point.at(width / 2, height / 2);
  const p1 = baseTransform.add(offset);
  const p2 = desRelLoc.add(offset);
  const cp1 = Point.at(d1 * Math.cos(t1 + t), d1 * Math.sin(t1 + t)).add(
    offset
  );
  const cp2 = Point.at(d2 * Math.cos(t2 + t), d2 * Math.sin(t2 + t)).add(
    offset
  );

  return `path('M ${p1.x} ${p1.y} C ${cp1.x} ${cp1.y}, ${cp2.x} ${cp2.y}, ${p2.x} ${p2.y}')`;
};

const useStyles = makeStyles({
  ctn: {
    opacity: ({ isFading, isExiting }: useStyleProps) =>
      isFading && isExiting ? "0.2" : "1",
    position: "fixed",
    top: ({ loc }: useStyleProps) => loc.y,
    left: ({ loc }: useStyleProps) => loc.x,
    transformOrigin: "center",
    transition: getTransition,
    offsetPath: getOffsetPath,
    offsetDistance: ({ isExiting }: useStyleProps) =>
      isExiting ? "100%" : "0%",
    offsetRotate: ({ offsetRotate }: useStyleProps) => offsetRotate || "auto",
    backgroundImage: "url('./assets/papercard.png')",
    backgroundSize: "cover",
  },
} as StyleRules);

interface FlyingCardProps {
  loc?: Point;
  endLoc?: Point;

  duration?: number;
  delay?: number;

  card?: Card;

  width?: number;
  height?: number;
  offsetRotate?: string;
  isFading?: boolean;
}

const FlyingCard: React.FC<FlyingCardProps> = ({
  loc,
  endLoc,

  duration,
  delay,

  card,

  width,
  height,
  offsetRotate,
  isFading,
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

  const w = width || cWidth;
  const h = height || cHeight;

  const [innerWidth, innerHeight] = useScreenSize();

  const classes = useStyles({
    loc: loc.subtract(Point.at(w / 2, h / 2)).add(Point.at(10, 0)),
    endLoc,

    duration,

    isExiting,

    width: w,
    height: h,
    offsetRotate,
    isFading,
    innerWidth,
    innerHeight,
  });
  // onTransitionEnd={() => callback()}
  return (
    <div className={classes.ctn}>
      <CardStaticComponent
        card={card}
        width={w}
        height={h}
        loc={Point.at(0, 0)}
      />
    </div>
  );
};

export default React.memo(FlyingCard, () => true);
