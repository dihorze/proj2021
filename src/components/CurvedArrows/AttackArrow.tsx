import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Point } from "../../model/positioning";

const useStyles = makeStyles({});

interface AttackArrowProps {
  p1: Point;
  p2: Point;
  cp1: Point;
  cp2: Point;
}

export const AttackArrow: React.FC<AttackArrowProps> = ({
  p1,
  p2,
  cp1,
  cp2,
}) => {
  const classes = useStyles({});

  return (
    <svg
      d={`M ${p1.x} ${p1.y} C ${cp1.x} ${cp1.y}, ${cp2.x} ${cp2.y}, ${p2.x} ${p2.y}`}
      strokeDasharray="4 2"
      stroke="maroon"
    />
  );
};
