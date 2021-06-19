import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/styles";
import { StyleRules } from "@material-ui/core";
import { Point } from "../../model/positioning";

const useStyles = makeStyles({
  card: {
    opacity: ({ isMounted }: any) => isMounted ? "1" : "0",
    position: "fixed",
    top: ({ loc }: any) => loc.y,
    left: ({ loc }: any) => loc.x,
    height: ({ height }: any) => height,
    width: ({ width }: any) => width,
    backgroundColor: "pink",
    border: "2px black solid",
    borderRadius: 2,
    padding: 10,
    fontSize: 24,
    fontWeight: "bold",
    transition: "opacity 500ms ease-in",
    transform: "translateY(-30px) scale(1.3)",
    zIndex: -1
  },
  text: {},
} as StyleRules);

interface ExitingCardProps {
  loc: Point;
  src: string;
  alt?: string;
  width?: number;
  height?: number;
  children?: any;
}

const Card: React.FC<ExitingCardProps> = ({
  loc,
  src,
  alt,
  width,
  height,
  children,
}) => {
  const [isMounted, setIsMounted] = useState(true);

  useEffect(() => {
    setIsMounted(false);
  }, [])

  const classes = useStyles({
    loc,
    origin,
    width,
    height,
    isMounted
  });

  return <div className={classes.card}>{children}</div>;
};

export default React.memo(Card, () => true);
