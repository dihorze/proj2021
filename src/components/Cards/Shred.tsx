import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/styles";
import { StyleRules } from "@material-ui/core";
import { Point } from "../../model/positioning";
import { cWidth, cHeight } from "../../data/Battlefield";
import { CardStaticComponent } from "./Card";
import { Card } from "../../model/classes";

interface useStyleProps {
  loc?: Point;

  duration?: number;

  refLoc?: Point;
  width?: number;
  height?: number;
  isExiting?: boolean;
}

const getTransition = (props: useStyleProps) => {
  return `transform ${props.duration}ms ease-out, opacity ${props.duration}ms ease-in`;
};

const getTransform = (props: useStyleProps) => {
  const { isExiting } = props;

  if (!isExiting) {
    return "scale(1.3)";
  }

  return "scale(1.3) translateY(50px)";
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

    backgroundImage: "url('./assets/papercard.png')",
    backgroundSize: "cover",
  },
} as StyleRules);

export interface ShredProps {
  loc?: Point;

  duration?: number;
  delay?: number;

  card?: Card;

  width?: number;
  height?: number;
}

const Shred: React.FC<ShredProps> = ({
  loc,

  duration,
  delay,

  card,

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

    duration,

    isExiting,

    width: w,
    height: h,
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

export default React.memo(Shred, () => true);
