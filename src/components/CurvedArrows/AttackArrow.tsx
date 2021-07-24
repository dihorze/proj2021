import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Point } from "../../model/positioning";

const useStyles = makeStyles({
  svgContainer: {
    position: "absolute",
    left: 0,
    top: 0,
    width: "100vw",
    height: "100vh",
    overflow: "hidden"
  },
});

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
    <div className={classes.svgContainer}>
      <svg width="100vw" height="100vh">
        <marker
          id="attackArrow"
          markerWidth="10"
          markerHeight="10"
          refX="1"
          refY="2"
          orient="auto"
          markerUnits="strokeWidth"
        >
          <path d="M0,0 L0.5,2 L0,4 L4,2 z" fill="maroon" />
        </marker>
        <path
          d={`M ${p1.x} ${p1.y} C ${cp1.x} ${cp1.y}, ${cp2.x} ${cp2.y}, ${p2.x} ${p2.y}`}
          strokeDasharray="20 5"
          stroke="maroon"
          fill="transparent"
          strokeWidth="10"
          markerEnd="url(#attackArrow)"
        />
      </svg>
    </div>
  );
};
