import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/styles";
import { StyleRules } from "@material-ui/core";
import { Point } from "../../model/positioning";

const innerHeight = window.innerHeight;

const useStyles = makeStyles({
  card: {
    opacity: ({ isMounted }: any) => (isMounted ? "1" : "0"),
    position: "fixed",
    top: ({ loc, isMounted }: any) => (isMounted ? loc.y : innerHeight - 150),
    left: ({ loc, isMounted }: any) => (isMounted ? loc.x : 50),
    height: ({ height }: any) => height,
    width: ({ width }: any) => width,
    backgroundColor: "tomato",
    border: "2px black solid",
    borderRadius: 2,
    padding: 10,
    fontSize: 24,
    fontWeight: "bold",
    transformOrigin: ({ origin }: any) =>
      `${origin ? origin.x : 0}px ${origin ? origin.y : 0}px`,
    transition: ({ duration }: any) =>
      `all ${duration ? duration : 300}ms ease-out`,
    transform: ({ isMounted, deg, offsetX }: any) =>
      isMounted
        ? `rotate(${deg}deg) translateX(${offsetX}px)`
        : `rotate(${Math.min(deg, -deg)}deg)`,
    zIndex: 99,
  },
  text: {},
} as StyleRules);

interface CardProps {
  loc: Point;
  src: string;
  alt?: string;
  width?: number;
  height?: number;
  duration?: number;
  deg?: number;
  origin?: Point;
  offsets?: Point;
  children?: any;
}

const Card: React.FC<CardProps> = ({
  loc,
  src,
  alt,
  width,
  height,
  deg,
  origin,
  offsets,
  duration,
  children,
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const [isDismounted, setIsDismounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    setTimeout(() => setIsDismounted(true), duration ? duration : 300);
  }, [duration]);

  const classes = useStyles({
    loc,
    origin,
    width,
    height,
    deg,
    offsetX: offsets ? offsets.x : 0,
    duration,
    isMounted,
  });

  return !isDismounted && <div className={classes.card}>{children}</div>;
};

export default React.memo(Card, () => true);
