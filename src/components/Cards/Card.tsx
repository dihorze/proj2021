import React, { useEffect, useState } from "react";
import { Point } from "../../model/positioning";
import { Card } from "../../model/classes";
import { SlideInProps } from "./SlideIn";
import { cHeight, cWidth, getCTop } from "../../data/Battlefield";
import { useScreenSize } from "../util/useScreenSize";
import { SlideOutProps } from "./Slideout";

import "../GlowingBorders/GlowingBorder.css";
import { CardContentStyle, CardStyle } from "./CardStyle";

const cardStyle = CardStyle.init();

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

  const classes = cardStyle
    .withCardLocation(
      loc,
      Point.at((innerWidth - width) / 2, getCTop(innerHeight))
    )
    .withRotateAngle(deg)
    .withSymmetryOrigin(origin)
    .withOffsets(hoverOffsets, offsets)
    .withSize(cWidth, cHeight)
    .withScreenSize(innerWidth, innerHeight)
    .withAnimationStates(
      isSelected,
      isHovered,
      isMoving,
      isEntered,
      isExiting,
      isOnCards,
      isAiming
    )
    .withAnimationDuration(
      slideInProps?.duration || 400,
      slideOutProps?.duration || 400
    )
    .generateClasses();

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
  const classes = cardStyle.withSize(width, height).generateClasses();
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

const cardContentStyle = CardContentStyle.init();

const CardContent: React.FC<CardContentProps> = ({ card, width }) => {
  const title = card.getTitle(),
    description = card.getDiscription(),
    type = card.getType(),
    cost = card.getCost();

  const classes = cardContentStyle
    .withContent(title, description)
    .withViewportWidth(width)
    .generateClasses();

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
