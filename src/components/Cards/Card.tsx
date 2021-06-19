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
    border: "2px black solid",
    borderRadius: 2,
    padding: 10,
    fontSize: 24,
    fontWeight: "bold",
    transition: ({ isSelected }: any) => (isSelected ? "all 0s" : "all 0.2s"),
    transformOrigin: ({ origin }: any) =>
      `${origin ? origin.x : 0}px ${origin ? origin.y : 0}px`,
    transform: ({ deg, offsetX, offsetY, isHovered, isSelected }: any) =>
      isHovered || isSelected
        ? `translateY(-${30 + offsetY}px) scale(1.3)`
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

export const Card: React.FC<CardProps> = ({
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
  });

  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setTimeout(() => setIsMounted(true), duration ? duration : 300);
  }, [duration]);

  return isMounted && (
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
  );
};
