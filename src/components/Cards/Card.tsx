import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/styles";
import { StyleRules } from "@material-ui/core";
import { Point } from "../../model/positioning";
import { Card } from "../../model/classes";

const innerHeight = window.innerHeight;
const innerWidth = window.innerWidth;

const getTopValue = ({
  loc,
  isEntered,
  entrance,
}: {
  loc: Point;
  isEntered: boolean;
  entrance: string;
}) => {
  if (isEntered) return loc.y;
  switch (entrance) {
    case "top":
      return -200;
    case "left":
      return loc.y;
    case "right":
      return loc.y;
    case "bottom":
      return innerHeight + 200;
    default:
      return innerHeight - 150;
  }
};

const getLeftValue = ({
  loc,
  isEntered,
  entrance,
}: {
  loc: Point;
  isEntered: boolean;
  entrance: string;
}) => {
  if (isEntered) return loc.x;
  switch (entrance) {
    case "top":
      return loc.x;
    case "left":
      return -200;
    case "right":
      return innerWidth + 200;
    case "bottom":
      return loc.x;
    default:
      return 50;
  }
};

const useStyles = makeStyles({
  card: {
    opacity: ({ isEntered }: any) => (isEntered ? "1" : "0"),
    position: "fixed",
    top: getTopValue,
    left: getLeftValue,
    height: ({ height }: any) => height,
    width: ({ width }: any) => width,
    borderRadius: 2,
    padding: 10,
    fontSize: 24,
    fontWeight: "bold",
    transition: ({ isSelected, isMoving, isHovered }: any) =>
      !isHovered && !isSelected
        ? "all 300ms"
        : isMoving
        ? "all 0ms"
        : isHovered
        ? "all 30ms"
        : isSelected
        ? "all 50ms"
        : "all 300ms",
    transformOrigin: ({ origin }: any) =>
      `${origin ? origin.x : 0}px ${origin ? origin.y : 0}px`,
    transform: ({
      deg,
      offsetX,
      offsetY,
      isHovered,
      isSelected,
      isEntered,
    }: any) =>
      !isEntered
        ? `rotate(${Math.min(deg, -deg)}deg)`
        : isSelected
        ? `translateY(-${offsetY}px) scale(1.3)`
        : isHovered
        ? `translateY(-${offsetY + 30}px) scale(1.3)`
        : `rotate(${deg}deg) translateX(${offsetX}px)`,
    zIndex: ({ isHovered, isSelected }: any) =>
      isHovered || isSelected ? "100" : "auto",
    backgroundImage: "url('./assets/papercard.png')",
    backgroundSize: "cover",
  },
  cardStatic: {
    borderRadius: 2,
    width: ({ width }: any) => width,
    height: ({ height }: any) => height,
    padding: 10,
    fontSize: 24,
    fontWeight: "bold",
    backgroundImage: "url('./assets/papercard.png')",
    backgroundSize: "cover",
    transition: "transform 0.1s",
    "&:hover": {
      transform: "scale(1.1)",
    },
  },
  // card content
  ctn: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: "1.25vw",
  },
  text: {
    fontSize: "0.9vw",
  },
  img: {
    width: "100%",
    borderRadius: "5px",
    border: "1px solid #444",
  },
} as StyleRules);

interface CardProps {
  onClick?: (e: React.MouseEvent) => void;
  onMouseEnter?: (e: React.MouseEvent) => void;
  onMouseMove?: (e: React.MouseEvent) => void;
  onMouseLeave?: (e: React.MouseEvent) => void;
  onMouseDown?: (e: React.MouseEvent) => void;
  onMouseUp?: (e: React.MouseEvent) => void;
  loc: Point;
  duration?: number;
  width?: number;
  height?: number;
  deg?: number;
  origin?: Point;
  hoverOffsets?: Point;
  offsets?: Point;
  isSelected?: boolean;
  isHovered?: boolean;
  entrance?: string;
  card?: Card;
}

export const CardComponent: React.FC<CardProps> = ({
  onClick,
  onMouseEnter,
  onMouseMove,
  onMouseLeave,
  onMouseDown,
  onMouseUp,
  loc,
  duration,
  width,
  height,
  deg,
  origin,
  hoverOffsets,
  offsets,
  isSelected,
  isHovered,
  entrance,
  card,
  children,
}) => {
  const [isEntered, setIsEntered] = useState(false); // for entrance animation
  const [isMoving, setIsMoving] = useState(false);

  useEffect(() => {
    setIsEntered(true);
    let tid: NodeJS.Timeout;
    if (isSelected) tid = setTimeout(() => setIsMoving(true), 100);
    else setIsMoving(false);
    return () => {
      clearTimeout(tid);
    };
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
    isEntered,
    entrance,
  });

  return (
    <div
      className={classes.card}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
    >
      {card ? <CardContent card={card} /> : children}
    </div>
  );
};

export const CardStaticComponent: React.FC<CardProps> = ({
  onClick,
  onMouseEnter,
  onMouseMove,
  onMouseLeave,
  onMouseDown,
  onMouseUp,
  width,
  height,
  card,
  children,
}) => {
  const classes = useStyles({ width, height });

  return (
    <div
      className={classes.cardStatic}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
    >
      {card ? <CardContent card={card} /> : children}
    </div>
  );
};

interface CardContentProps {
  card: Card;
}

const CardContent: React.FC<CardContentProps> = ({ card }) => {
  const classes = useStyles({});

  return (
    <div className={classes.ctn}>
      <div className={classes.title}>{card.getTitle()}</div>
      <div className={classes.text}>{card.getDiscription()}</div>
      <img
        src={card.getUri()}
        alt={card.getTitle()}
        className={classes.img}
        draggable={false}
      />
    </div>
  );
};
