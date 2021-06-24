import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/styles";
import { StyleRules } from "@material-ui/core";
import { Point } from "../../model/positioning";

const useStyles = makeStyles({
  ctn: {
    opacity: ({ isMounted }: any) => (isMounted ? "1" : "0"),
    position: "fixed",
    top: ({ loc }: any) => loc.y,
    left: ({ loc }: any) => loc.x,
    height: ({ height }: any) => 0.5 * height,
    width: ({ width }: any) => width,
    transition: ({ duration }: any) =>
      `opacity ${duration ? duration : 300}ms ease-in`,
    border: "2px black solid",
    borderRadius: 2,
    transformOrigin: ({ height, width }: any) =>
      `${0.5 * width}px ${0.5 * height}px`,
    transform: ({ isMounted }: any) => `translateY(-30px) scale(1.3)${isMounted ? "" : " rotate(1, 1, 1, -90deg)"}`,
    overflow: "hidden",
    zIndex: -1,
  },
  ctn2: {
    opacity: ({ isMounted }: any) => (isMounted ? "1" : "0"),
    position: "fixed",
    top: ({ loc, height }: any) => loc.y + 0.5 * height,
    left: ({ loc }: any) => loc.x,
    height: ({ height }: any) => 0.5 * height,
    width: ({ width }: any) => width,
    transition: ({ duration }: any) =>
      `opacity ${duration ? duration : 300}ms ease-in`,
    border: "2px black solid",
    borderRadius: 2,
    transformOrigin: ({ width }: any) => `${0.5 * width}px 0px`,
    transform: ({ isMounted }: any) => `translateY(-30px) scale(1.3)${isMounted ? "" : " rotate(1, 1, 1, 90deg)"}`,
    overflow: "hidden",
    zIndex: -1,
  },
  card: {
    position: "relative",
    height: ({ height }: any) => height,
    width: ({ width }: any) => width,
    backgroundColor: "tomato",
    padding: 10,
    fontSize: 24,
    fontWeight: "bold",
  },
  card2: {
    position: "relative",
    top: ({ height }: any) => -0.5 * height,
    height: ({ height }: any) => height,
    width: ({ width }: any) => width,
    backgroundColor: "tomato",
    padding: 10,
    fontSize: 24,
    fontWeight: "bold",
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

  return (
    !isDismounted && (
      <>
        <div className={classes.ctn}>
          <div className={classes.card}>{children}</div>
        </div>
        <div className={classes.ctn2}>
          <div className={classes.card2}>{children}</div>
        </div>
      </>
    )
  );
};

export default React.memo(Card, () => true);
