import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/styles";
import { StyleRules } from "@material-ui/core";
import { Point } from "../../model/positioning";

const useStyles = makeStyles({
  card: {
    position: "fixed",
    top: ({ loc }: any) => loc.y,
    left: ({ loc }: any) => loc.x,
    height: ({ height }: any) => height,
    width: ({ width }: any) => width,
    backgroundColor: "tomato",
    border: "1px black solid",
    borderRadius: 2,
    padding: 10,
    fontSize: 24,
    fontWeight: "bold",
    transition: ({ isSelected, isMoving, isHovered }: any) =>
      isMoving
        ? "all 0ms"
        : isHovered
        ? "all 30ms"
        : isSelected
        ? "all 50ms"
        : "all 200ms",
    transformOrigin: ({ origin }: any) =>
      `${origin ? origin.x : 0}px ${origin ? origin.y : 0}px`,
    transform: ({ deg, offsetX, offsetY, isHovered, isSelected }: any) =>
      isSelected
        ? `translateY(-${offsetY}px) scale(1.3)`
        : isHovered
        ? `translateY(-${offsetY + 30}px) scale(1.3)`
        : `rotate(${deg}deg) translateX(${offsetX}px)`,
    zIndex: ({ isHovered, isSelected }: any) =>
      isHovered || isSelected ? "100" : "auto",
  },
  text: {},
} as StyleRules);

interface CardProps {
  onClick?: (e: React.MouseEvent) => void;
  onMouseEnter?: (e: React.MouseEvent) => void;
  onMouseLeave?: (e: React.MouseEvent) => void;
  onMouseDown?: (e: React.MouseEvent) => void;
  onMouseUp?: (e: React.MouseEvent) => void;
  loc: Point;
  src: string;
  alt?: string;
  duration?: number;
  width?: number;
  height?: number;
  deg?: number;
  origin?: Point;
  hoverOffsets?: Point;
  offsets?: Point;
  isSelected: boolean;
  isHovered: boolean;
}

export const CardComponent: React.FC<CardProps> = ({
  onClick,
  onMouseEnter,
  onMouseLeave,
  onMouseDown,
  onMouseUp,
  loc,
  src,
  alt,
  duration,
  width,
  height,
  deg,
  origin,
  hoverOffsets,
  offsets,
  isSelected,
  isHovered,
  children,
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const [isMoving, setIsMoving] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsMounted(true), duration ? duration : 300);
    if (isSelected) setTimeout(() => setIsMoving(true), 100);
    else setIsMoving(false);
  }, [duration, isSelected]);

  const classes = useStyles({
    loc,
    origin,
    width,
    height,
    deg,
    offsetY: hoverOffsets ? hoverOffsets.y : 0,
    offsetX: offsets ? offsets.x : 0,
    isSelected,
    isHovered,
    isMoving,
  });

  return (
    isMounted && (
      <div
        className={classes.card}
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
      >
        {children}
      </div>
    )
  );
};
