import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/styles";
import { StyleRules } from "@material-ui/core";
import { Point } from "../../model/positioning";

const useStyles = makeStyles({
  card: {
    opacity: ({ isMounted }: any) => (isMounted ? "1" : "0"),
    position: "fixed",
    top: ({ loc }: any) => loc.y,
    left: ({ loc }: any) => loc.x,
    height: ({ height }: any) => height,
    width: ({ width }: any) => width,
    backgroundColor: "tomato",
    border: "2px black solid",
    borderRadius: 2,
    padding: 10,
    fontSize: 24,
    fontWeight: "bold",
    transition: ({ duration }: any) =>
      `opacity ${duration ? duration : 300}ms ease-in`,
    transform: "scale(1.3)",
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
  children?: any;
}

const Card: React.FC<ExitingCardProps> = ({
  loc,
  src,
  alt,
  width,
  height,
  duration,
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
    width,
    height,
    duration,
    isMounted,
  });

  return !isDismounted && <div className={classes.card}>{children}</div>;
};

export default React.memo(Card, () => true);
