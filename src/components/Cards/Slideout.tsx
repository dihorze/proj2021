import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/styles";
import { StyleRules } from "@material-ui/core";
import { Point } from "../../model/positioning";

const innerWidth = window.innerWidth;
const innerHeight = window.innerHeight;

const useStyles = makeStyles({
  card: {
    opacity: ({ isMounted }: any) => (isMounted ? "1" : "0"),
    position: "fixed",
    top: ({ loc, isMounted }: any) => (isMounted ? loc.y : innerHeight - 50),
    left: ({ loc, isMounted }: any) => (isMounted ? loc.x : innerWidth - 50),
    height: ({ height, isMounted }: any) => (isMounted ? height : 0.1 * height),
    width: ({ width, isMounted }: any) => (isMounted ? width : 0.1 * width),
    backgroundColor: "tomato",
    border: "2px black solid",
    borderRadius: 2,
    padding: 10,
    fontSize: 24,
    fontWeight: "bold",
    transformOrigin: ({ origin }: any) =>
      `${origin ? origin.x : 0}px ${origin ? origin.y : 0}px`,
    transition: ({ duration }: any) =>
      `all ${duration ? duration : 300}ms ease-in`,
    transform: ({ isMounted, isHand, deg, offsetX }: any) =>
      isMounted
        ? isHand
          ? `rotate(${deg}deg) translateX(${offsetX}px)`
          : "scale(1.3)"
        : "rotate(0.5turn) scale(1.3)",
    zIndex: 0,
  },
  text: {},
} as StyleRules);

interface ExitingCardProps {
  loc: Point;
  src: string;
  alt?: string;
  width?: number;
  height?: number;
  duration?: number;
  deg?: number;
  origin?: Point;
  offsets?: Point;
  isHand?: boolean;
  children?: any;
}

const Card: React.FC<ExitingCardProps> = ({
  loc,
  src,
  alt,
  width,
  height,
  deg,
  origin,
  offsets,
  duration,
  isHand,
  children,
}) => {
  const [isMounted, setIsMounted] = useState(true);
  const [isDismounted, setIsDismounted] = useState(false);

  useEffect(() => {
    setIsMounted(false);
    setTimeout(() => setIsDismounted(true), duration ? duration : 300);
  }, [duration]);

  const classes = useStyles({
    loc,
    origin,
    width,
    height,
    duration,
    deg,
    offsetX: offsets ? offsets.x : 0,
    isHand,
    isMounted,
  });

  return !isDismounted && <div className={classes.card}>{children}</div>;
};

export default React.memo(Card, () => true);
