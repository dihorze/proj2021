import React, { Component } from "react";
import { Button1 } from "../../../components/Buttons/Buttons";
import { CardComponent } from "../../../components/Cards/Card";
import { withMouseContext } from "../../../components/context/withMouseContext";
import {
  cardShiftMagnitude,
  cardShiftSigma,
  cHeight,
  cWidth,
  degInterval,
  getActiveZoneBottomLineY,
  getCardPos,
  getCTop,
  origin,
  sinkCoefficient,
} from "../../../data/Battlefield";
import { norm } from "../../../model/fomula";
import { Point } from "../../../model/positioning";
import { withStyles } from "@material-ui/core";
import { styles } from "./styles";
import { CardTypes } from "../../../data/deck";
import { connect } from "react-redux";
import {
  CardTableProps,
  CardTableStates,
  cardTableActions,
  CardTableMapStateToProps,
} from "./CardTableProps";
import { Card } from "../../../model/classes";
import { withScreenContext } from "../../../components/context/withScreenContext";

export class CardTable extends Component<CardTableProps, CardTableStates> {
  shouldComponentUpdate(nextProps: CardTableProps, nextState: CardTableStates) {
    if (
      this.state === nextState &&
      this.props.selectedCard === CardTypes.NONE &&
      nextProps.selectedCard === CardTypes.NONE &&
      this.props.hoveredCard === nextProps.hoveredCard &&
      this.props.aimingCard === nextProps.aimingCard &&
      this.props.cards === nextProps.cards &&
      this.props.slideInAnimation === nextProps.slideInAnimation &&
      this.props.slideOutAnimation === nextProps.slideOutAnimation &&
      this.props.screenSize === nextProps.screenSize
    )
      return false;
    return true;
  }

  componentDidMount() {
    this.props.startBattle();
  }

  cardEnter = (idx: number) => () => {
    if (
      idx !== this.props.hoveredCard &&
      this.props.aimingCard === CardTypes.NONE
    )
      this.props.setHoveredCard(idx); // index
  };

  cardMove = (idx: number) => () => {
    if (
      idx !== this.props.hoveredCard &&
      this.props.aimingCard === CardTypes.NONE
    )
      this.props.setHoveredCard(idx);
  };

  cardLeave = () => {
    if (this.props.aimingCard === CardTypes.NONE) this.props.clearHoveredCard();
  };

  leaveTable = () => {};

  cardMouseUp = (event: React.MouseEvent) => {
    if (
      event.button === 0 &&
      this.props.selectedCard !== CardTypes.NONE &&
      this.props.mousePos.y < getActiveZoneBottomLineY(this.props.screenSize[1]) // innerHeight
    ) {
      this.props.playACard(
        Card.getCardFromKey(this.props.selectedCard),
        this.props.mousePos
      );
    }
  };

  cardMouseDown = (key: string) => (event: React.MouseEvent) => {
    if (this.props.aimingCard === CardTypes.NONE)
      if (event.button === 0) {
        if (
          this.props.mousePos.y >=
          getActiveZoneBottomLineY(this.props.screenSize[1])
        )
          this.props.selectCard(key);
      } else {
        event.preventDefault();
        this.props.unselectCard();
      }
  };

  render() {
    const cards = getCardLocs(this.state, this.props);

    const { classes } = this.props;

    const slideInAnimKeys = this.props.slideInAnimation.map((a) => a.card.key);
    const slideOutAnimKeys = this.props.slideOutAnimation.map(
      (a) => a.card.key
    );

    return (
      <>
        <Button1
          btnStyle={{ position: "fixed", top: 150, right: 100, width: 150 }}
          onClick={this.props.toggleCardSelectionPage}
        >
          Choose A Card
        </Button1>
        <Button1
          btnStyle={{ position: "fixed", top: 200, right: 100, width: 150 }}
          onClick={this.props.startTurn}
        >
          Start Turn
        </Button1>
        <Button1
          btnStyle={{ position: "fixed", top: 250, right: 100, width: 150 }}
          onClick={this.props.endTurn}
        >
          End Turn
        </Button1>
        {cards.map(({ loc, o, deg, key, card, hoverOffsets, offsets }, idx) => (
          <CardComponent
            loc={loc}
            origin={o}
            deg={deg}
            key={key}
            card={card}
            isSelected={this.props.selectedCard === key}
            isHovered={
              this.props.hoveredCard === idx &&
              this.props.selectedCard === CardTypes.NONE
            }
            isOnCards={this.props.hoveredCard >= 0}
            isAiming={this.props.aimingCard === key}
            hoverOffsets={hoverOffsets}
            offsets={offsets}
            width={cWidth}
            height={cHeight}
            slideInProps={
              slideInAnimKeys.includes(key)
                ? this.props.slideInAnimation[
                    slideInAnimKeys.findIndex((k) => k === key)
                  ]
                : null
            }
            slideOutProps={
              slideOutAnimKeys.includes(key)
                ? this.props.slideOutAnimation[
                    slideOutAnimKeys.findIndex((k) => k === key)
                  ]
                : null
            }
            onMouseEnter={this.cardEnter(idx)}
            onMouseMove={this.cardMove(idx)}
            onMouseLeave={this.cardLeave}
            onMouseDown={this.cardMouseDown(key)}
            onMouseUp={this.cardMouseUp}
          >
            {key}
          </CardComponent>
        ))}
      </>
    );
  }
}

const styledCardTable = withStyles(styles)(CardTable);
const mouseContextCardTable = withMouseContext(styledCardTable);
const screenContextCardTable = withScreenContext(mouseContextCardTable);

export default connect(
  CardTableMapStateToProps,
  cardTableActions
)(screenContextCardTable);

const getCardLocs = (state: CardTableStates, props: CardTableProps) => {
  const [innerWidth, innerHeight] = props.screenSize;
  return props.cards.map((card, idx) => {
    const key = card.key;
    if (props.selectedCard === key) {
      return {
        loc: getCardPos(props.mousePos),
        o: Point.at(cWidth / 2, cHeight / 2),
        deg: 0,
        key,
        hoverOffsets: Point.at(0, 0),
        offsets: Point.at(0, 0),
        card,
      };
    }

    const offset = idx - (props.cards.length - 1) / 2;
    const alpha = offset * degInterval;
    const rad_alpha = (alpha / 180) * Math.PI;

    const p = Point.at(
      (innerWidth - cWidth) / 2 + origin.y * Math.sin(rad_alpha),
      getCTop(innerHeight) +
        sinkCoefficient * origin.y * (1 - Math.cos(rad_alpha))
    );

    const targetCardIndex =
      props.selectedCard === CardTypes.NONE
        ? props.hoveredCard < 0
          ? -1
          : props.hoveredCard
        : props.cards.findIndex((c) => c.key === props.selectedCard);

    const sign =
      idx === targetCardIndex || targetCardIndex < 0
        ? 0
        : idx < targetCardIndex
        ? -1
        : 1;

    if (props.aimingCard === key) {
      return {
        loc: Point.at(p.x, getActiveZoneBottomLineY(innerHeight)),
        o: Point.at(cWidth / 2, cHeight / 2),
        deg: 0,
        key,
        hoverOffsets: Point.at(0, 0),
        offsets: Point.at(0, 0),
        card,
      };
    }

    return {
      loc: p,
      o: Point.at(cWidth / 2, cHeight / 2),
      deg: offset * degInterval,
      key,
      hoverOffsets: Point.at(
        0,
        sinkCoefficient * origin.y * (1 - Math.cos(rad_alpha))
      ), // card being hoverd => offset Y
      offsets: Point.at(
        sign * norm(idx, targetCardIndex, cardShiftSigma, cardShiftMagnitude),
        0
      ), // card give way to selected card => offset X
      card,
    };
  });
};
