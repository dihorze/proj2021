import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/styles";
import { StyleRules } from "@material-ui/core";
import { Point } from "../../model/positioning";
import { Card } from "../../model/classes";
import { SlideInProps } from "./SlideIn";
import { cWidth, getCTop } from "../../data/Battlefield";
import { useScreenSize } from "../util/useScreenSize";
import { SlideOutProps } from "./Slideout";

import "../GlowingBorders/GlowingBorder.css";

const getCardTransform = (props: StyleProps) => {
  const { deg, offsetX, offsetY, isHovered, isSelected, isEntered, isExiting } =
    props;
  if (!isEntered) {
    return `scale(0.3) rotate(${-deg}deg)`;
  }
  if (isExiting) {
    return "scale(0.01) rotate(0.4turn)";
  }
  if (isSelected) return `scale(1.3)`;
  else if (isHovered) return `translateY(${-offsetY - 30}px) scale(1.3)`;
  else return `translateX(${offsetX}px) rotate(${deg}deg)`;
};

const getOffsetPath = (props: StyleProps) => {
  if (props.isExiting) {
    const { loc, refLoc, width, height, innerWidth } = props;

    const baseTransform = Point.at(loc?.x - refLoc?.x, loc?.y - refLoc?.y);
    const offset = Point.at(width / 2, height / 2);
    const p1 = baseTransform.add(offset);
    const p2 = Point.at(innerWidth / 2, 50).add(offset);
    const cp1 = Point.at(
      baseTransform.x,
      -0.2 * baseTransform.x + baseTransform.y
    ).add(offset);
    const cp2 = Point.at(0, 0.1 * baseTransform.x - 50).add(offset);

    return `path('M ${p2.x} ${p2.y} C ${cp2.x} ${cp2.y}, ${cp1.x} ${cp1.y}, ${p1.x} ${p1.y}')`;
  }

  const { loc, refLoc, width, height, innerWidth } = props;
  const baseTransform = Point.at(loc?.x - refLoc?.x, loc?.y - refLoc?.y);
  const offset = Point.at(width / 2, height / 2);
  const p1 = Point.at(-innerWidth / 2, 50).add(offset);
  const p2 = baseTransform.add(offset);
  const cp1 = Point.at(0, -0.1 * baseTransform.x).add(offset);
  const cp2 = Point.at(0, 0.1 * baseTransform.x + baseTransform.y).add(offset);

  return `path('M ${p1.x} ${p1.y} C ${cp1.x} ${cp1.y}, ${cp2.x} ${cp2.y}, ${p2.x} ${p2.y}')`;
};

const getTransition = (props: StyleProps) => {
  if (props.isExiting) {
    return `offset-distance ${props.slideOutDuration}ms ease-in, transform ${props.slideOutDuration}ms ease-out, opacity ${props.slideOutDuration}ms ease-in`;
  }

  const {
    isSelected,
    isMoving,
    isHovered,
    isOnCards,
    isAiming,
    isEntered,
    duration,
  } = props;

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
      : isEntered
      ? `${duration}ms ease-out`
      : "100ms linear")
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
  isExiting: boolean;
  isOnCards: boolean;
  isAiming: boolean;
  refLoc: Point;
  duration: number;
  slideOutDuration: number;
  innerWidth: number;
}

const useStyles = makeStyles({
  card: {
    opacity: ({ isEntered, isExiting }: StyleProps) =>
      isEntered && !isExiting ? "1" : "0",
    position: "fixed",
    top: ({ refLoc }: StyleProps) => refLoc?.y,
    left: ({ refLoc }: StyleProps) => refLoc?.x,
    transition: getTransition,
    transformOrigin: "center",
    transform: getCardTransform,

    zIndex: ({ isHovered, isSelected }: any) =>
      isHovered || isSelected ? "100" : "auto",

    offsetPath: getOffsetPath,
    offsetDistance: ({ isEntered, isExiting }: any) =>
      isEntered && !isExiting ? "100%" : "0%",
    offsetRotate: "0deg",

    // willChange: "transform"
  },

  cardStatic: {
    borderRadius: 2,
    width: ({ width }: any) => width,
    height: ({ height }: any) => height,
    padding: 7,
    fontSize: 24,
    fontWeight: "bold",
    backgroundImage: "url('./assets/card2.png')",
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
    padding: 7,
    fontSize: 24,
    fontWeight: "bold",
    backgroundImage: "url('./assets/card2.png')",
    backgroundSize: "cover",
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
  card?: Card;
  slideInProps?: SlideInProps;
  slideOutProps?: SlideOutProps;
}

export const CardComponent: React.FC<CardProps> = ({
  onClick,
  onMouseEnter,
  onMouseMove,
  onMouseLeave,
  onMouseDown,
  onMouseUp,
  loc,
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
  card,

  slideInProps,
  slideOutProps,

  children,
}) => {
  const [isEntered, setIsEntered] = useState(false); // for entrance animation
  const [isExiting, setIsExiting] = useState(false); // for exit animation
  const [isMoving, setIsMoving] = useState(false);

  const duration = slideInProps?.duration || 400;

  useEffect(() => {
    let tid1: NodeJS.Timeout, tid2: NodeJS.Timeout, tid3: NodeJS.Timeout;

    if (slideInProps)
      tid1 = setTimeout(() => {
        setIsEntered(true);
      }, slideInProps.delay);

    if (slideOutProps)
      tid2 = setTimeout(() => {
        setIsExiting(true);
      }, slideOutProps.delay);
    else if (isSelected) tid3 = setTimeout(() => setIsMoving(true), 50);
    else setIsMoving(false);
    return () => {
      clearTimeout(tid1);
      clearTimeout(tid2);
      clearTimeout(tid3);
    };
  }, [isSelected, slideInProps, slideOutProps]);

  const [innerWidth, innerHeight] = useScreenSize();

  const refLoc = Point.at((innerWidth - width) / 2, getCTop(innerHeight));

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
    isExiting,
    isOnCards,
    isAiming,
    refLoc,
    duration,
    slideOutDuration: slideOutProps?.duration,
    innerWidth,
  });

  return (
    <div
      className={classes.card + " glow-ctn"}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
    >
      {card ? (
        <CardStaticComponent
          loc={Point.at(0, 0)}
          width={width}
          height={height}
          card={card}
        />
      ) : (
        children
      )}
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
  const className = hasHoverEffect
    ? classes.cardStatic
    : classes.cardStaticNoHover;

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
      {card ? <CardContent card={card} width={width} /> : children}
    </div>
  );
};

interface CardContentProps {
  card: Card;
  width: number;
}

const getCostFontSize = (props) => {
  const { width } = props;
  return `${(15 * width) / cWidth}pt`;
};

const getTitleFontSize = (props) => {
  const { title, width } = props;
  const n = title.length;
  return `${Math.min((width / n) * 0.85, (9 * width) / cWidth)}pt`;
};

const getTypeFontSize = (props) => {
  const { width } = props;
  return `${(5 * width) / cWidth}pt`;
};

const getTextFontSize = (props) => {
  const { description, width } = props;
  const n = description.length;
  return `${Math.min((4.1 * width) / n, (8 * width) / cWidth)}pt`;
};

const useStylesCardContent = makeStyles({
  // card content
  ctn: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  firstRow: {
    width: "100%",
    height: "13%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start"
  },
  cost: {
    fontSize: getCostFontSize,
    marginLeft: "0%",
    width: "20%",
    textAlign: "center",
    fontWeight: "bolder",
    color: "darkgreen"
  },
  title: {
    fontSize: getTitleFontSize,
    textAlign: "center",
    height: "100%",
    width: "74%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  type: {
    fontSize: getTypeFontSize,
    width: "40%",
    margin: "2% 25% 1% 0",
    fontWeight: "bolder",
    textAlign: "center",
  },
  img: {
    width: "85%",
    margin: "0 0 9% 0",
    borderRadius: "1px",
    border: "1px solid #6e5d3c",
  },
  text: {
    fontSize: getTextFontSize,
    padding: "5px",
    width: "91%",
    margin: "0 5%",
    textAlign: "justify",
  },
});

const CardContent: React.FC<CardContentProps> = ({ card, width }) => {
  const title = card.getTitle(),
    description = card.getDiscription(),
    type = card.getType(),
    cost = card.getCost();

  const classes = useStylesCardContent({
    title,
    description,
    width,
  });

  return (
    <div className={classes.ctn}>
      <div className={classes.firstRow}>
        {" "}
        <div className={classes.cost}>{cost < 0 ? "X" : cost}</div>
        <div className={classes.title}>{title}</div>
      </div>

      <div className={classes.type}>{type}</div>
      <img
        src={card.getUri()}
        alt={title}
        className={classes.img}
        draggable={false}
      />
      <div className={classes.text}>{card.getDiscription()}</div>
    </div>
  );
};
