import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/styles";
import { StyleRules } from "@material-ui/core";
import { Point } from "../../model/positioning";
import { Card } from "../../model/classes";
import { SlideInProps } from "./SlideIn";
import { cTop } from "../../data/Battlefield";

const innerWidth = window.innerWidth;

const getCardTransform = (props: StyleProps) => {
  const { deg, offsetX, offsetY, isHovered, isSelected, isEntered } = props;
  if (!isEntered) {
    return `scale(0.3) rotate(${-deg}deg)`;
  }
  if (isSelected) return `scale(1.3)`;
  else if (isHovered) return `translateY(${-offsetY - 30}px) scale(1.3)`;
  else return `translateX(${offsetX}px) rotate(${deg}deg)`;
};

const getOffsetPath = (props: StyleProps) => {
  const { loc, refLoc, width, height } = props;
  const baseTransform = Point.at(loc?.x - refLoc?.x, loc?.y - refLoc?.y);
  const offset = Point.at(width / 2, height / 2);
  const p1 = Point.at(-innerWidth / 2, 50).add(offset);
  const p2 = baseTransform.add(offset);
  const cp1 = Point.at(0, -0.1 * baseTransform.x).add(offset);
  const cp2 = Point.at(0, 0.1 * baseTransform.x + baseTransform.y).add(offset);

  return `path('M ${p1.x} ${p1.y} C ${cp1.x} ${cp1.y}, ${cp2.x} ${cp2.y}, ${p2.x} ${p2.y}')`;
};

const getTransformOrigin = (props: StyleProps) => {
  return "center";
};

const getTransition = (props: StyleProps) => {
  const { isSelected, isMoving, isHovered, isOnCards, isAiming } = props;

  return (
    "all " +
    (isAiming
      ? "300ms"
      : isMoving
      ? "0ms"
      : isHovered
      ? "30ms"
      : isSelected
      ? "100ms"
      : isOnCards
      ? "300ms"
      : "400ms ease-out")
  );
};

interface StyleProps {
  loc: Point;
  origin: Point;
  width: number;
  height: number;
  deg: number;
  offsetY: number;
  offsetX: number;
  isSelected: boolean;
  isHovered: boolean;
  isMoving: boolean;
  isEntered: boolean;
  isOnCards: boolean;
  isAiming: boolean;
  entrance: boolean;
  refLoc: Point;
}

const useStyles = makeStyles({
  card: {
    opacity: ({ isEntered }: any) => (isEntered ? "1" : "0"),
    position: "fixed",
    top: ({ refLoc }: { refLoc: Point }) => refLoc?.y,
    left: ({ refLoc }: { refLoc: Point }) => refLoc?.x,
    height: ({ height }: any) => height,
    width: ({ width }: any) => width,
    borderRadius: 2,
    padding: 10,
    fontSize: 24,
    fontWeight: "bold",
    transition: getTransition,
    transformOrigin: getTransformOrigin,
    transform: getCardTransform,

    zIndex: ({ isHovered, isSelected }: any) =>
      isHovered || isSelected ? "100" : "auto",
    backgroundImage: "url('./assets/papercard.png')",
    backgroundSize: "cover",

    offsetPath: getOffsetPath,
    offsetDistance: ({ isEntered }: any) => (isEntered ? "100%" : "0%"),
    offsetRotate: "0deg",

    // willChange: "transform"
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
  cardStaticNoHover: {
    borderRadius: 2,
    width: ({ width }: any) => width,
    height: ({ height }: any) => height,
    padding: 10,
    fontSize: 24,
    fontWeight: "bold",
    backgroundImage: "url('./assets/papercard.png')",
    backgroundSize: "cover"
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
  isOnCards?: boolean;
  isAiming?: boolean;
  entrance?: string;
  card?: Card;
  slideInProps?: SlideInProps;
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
  isOnCards,
  isAiming,
  entrance,
  card,

  slideInProps,

  children,
}) => {
  const [isEntered, setIsEntered] = useState(false); // for entrance animation
  const [isMoving, setIsMoving] = useState(false);

  useEffect(() => {
    let tid1: NodeJS.Timeout, tid2: NodeJS.Timeout, tid3: NodeJS.Timeout;

    if (slideInProps)
      tid1 = setTimeout(() => {
        setIsEntered(true);
        slideInProps.callback();
      }, slideInProps.delay);

    if (isSelected) tid3 = setTimeout(() => setIsMoving(true), 100);
    else setIsMoving(false);
    return () => {
      clearTimeout(tid1);
      clearTimeout(tid2);
      clearTimeout(tid3);
    };
  }, [duration, isSelected, slideInProps]);

  const refLoc = Point.at((innerWidth - width) / 2, cTop);

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
    isOnCards,
    isAiming,
    entrance,
    refLoc,
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

interface CardStaticProps {
  onClick?: (e: React.MouseEvent) => void;
  onMouseEnter?: (e: React.MouseEvent) => void;
  onMouseMove?: (e: React.MouseEvent) => void;
  onMouseLeave?: (e: React.MouseEvent) => void;
  onMouseDown?: (e: React.MouseEvent) => void;
  onMouseUp?: (e: React.MouseEvent) => void;
  loc: Point;
  width?: number;
  height?: number;
  card?: Card;
  hasHoverEffect?: boolean;
}

export const CardStaticComponent: React.FC<CardStaticProps> = ({
  onClick,
  onMouseEnter,
  onMouseMove,
  onMouseLeave,
  onMouseDown,
  onMouseUp,
  width,
  height,
  card,
  hasHoverEffect,
  children,
}) => {
  const classes = useStyles({ width, height });
  const className = hasHoverEffect ? classes.cardStatic : classes.cardStaticNoHover;
  
  return (
    <div
      className={className}
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
