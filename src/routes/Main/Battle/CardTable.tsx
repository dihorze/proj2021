import React, { Component } from "react";
import { Button1 } from "../../../components/Buttons/Buttons";
import { CardComponent } from "../../../components/Cards/Card";
import SlideinCard from "../../../components/Cards/Slidein";
import SlideoutCard from "../../../components/Cards/Slideout";
import FadeoutCard from "../../../components/Cards/Fadeout";
import TearoffCard from "../../../components/Cards/Tearoff";
import { withMouseContext } from "../../../components/context/withMouseContext";
import {
  activeZoneBottomLineY,
  cardShiftMagnitude,
  cardShiftSigma,
  cHeight,
  cTop,
  cWidth,
  degInterval,
  getCardPos,
  origin,
  innerWidth,
} from "../../../data/Battlefield";
import { inverse, norm } from "../../../model/fomula";
import { Point } from "../../../model/positioning";
import { withStyles } from "@material-ui/core";
import { styles } from "./styles";
import { CardTypes, getCardType, getRandomCard } from "../../../data/deck";
import { connect } from "react-redux";
import {
  CardTableProps,
  CardTableStates,
  cardTableActions,
  CardTableMapStateToProps,
} from "./CardTableProps";
import { Card } from "../../../model/classes";

export class CardTable extends Component<CardTableProps, CardTableStates> {
  state = {
    exitingCards: [],
    discardingCards: {}, // from hand
    // enteringCards: [],
  };

  shouldComponentUpdate(nextProps: CardTableProps, nextState: CardTableStates) {
    if (
      this.state === nextState &&
      this.props.selectedCard === CardTypes.NONE &&
      nextProps.selectedCard === CardTypes.NONE &&
      this.props.hoveredCard === nextProps.hoveredCard &&
      this.props.aimingCard === nextProps.aimingCard &&
      this.props.cards === nextProps.cards
    )
      return false;
    return true;
  }

  addOne = () => {
    const id = getRandomCard();
    this.props.addOneCard(id);
  };

  addMany = () => {
    const noToAdd = 5;
    const cards = new Array(noToAdd)
      .fill(0)
      .map(() => getRandomCard());
    this.props.addManyCards(cards);
  };

  deleteAll = () => {
    const oldCards = [...this.props.cards];
    this.props.deleteAllCards();
    const discardingCards = {};
    oldCards.forEach((card, idx) => {
      discardingCards[card.key] = idx;
    });
    this.setState({
      // enteringCards: [],
      exitingCards: [],
      discardingCards,
    });
  };

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
    if (event.button === 0 && this.props.mousePos.y < activeZoneBottomLineY) {
      this.props.playACard(Card.getCardFromKey(this.props.selectedCard));
      this.setState((state: CardTableStates) => {
        // console.log(state);
        const key = this.props.selectedCard;
        const n = state.exitingCards.length;
        const newExitingCards =
          n > 0 ? [state.exitingCards[n - 1], key] : [key];
        // const newEnteringCards = state.enteringCards.filter((c) => c !== key);
        this.props.deleteOneCard(key);
        return {
          exitingCards: newExitingCards,
          // enteringCards: newEnteringCards,
        };
      });
    }
  };

  cardMouseDown = (key: string) => (event: React.MouseEvent) => {
    if (this.props.aimingCard === CardTypes.NONE)
      if (event.button === 0) {
        this.props.selectCard(key);
      } else {
        event.preventDefault();
        this.props.unselectCard();
      }
  };

  render() {
    const cards = getCardLocs(this.state, this.props);
    const dCards = getDiscardedCardLocs(this.state, this.props);

    const { classes } = this.props;

    return (
      <>
        <Button1
          btnStyle={{ position: "fixed", top: 300, left: 300, width: 150 }}
          onClick={this.addOne}
        >
          Add a Card
        </Button1>
        <Button1
          btnStyle={{ position: "fixed", top: 300, left: 500, width: 150 }}
          onClick={this.addMany}
        >
          Add Many
        </Button1>
        <Button1
          btnStyle={{ position: "fixed", top: 300, left: 700, width: 150 }}
          onClick={this.deleteAll}
        >
          Delete All
        </Button1>
        <Button1
          btnStyle={{ position: "fixed", top: 300, left: 900, width: 150 }}
          onClick={this.props.startBattle}
        >
          Discussion Start
        </Button1>
        <Button1
          btnStyle={{ position: "fixed", top: 350, left: 900, width: 150 }}
          onClick={() => this.props.drawCards()}
        >
          Start Turn
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
            hoverOffsets={hoverOffsets}
            offsets={offsets}
            width={cWidth}
            height={cHeight}
            onMouseEnter={this.cardEnter(idx)}
            onMouseMove={this.cardMove(idx)}
            onMouseLeave={this.cardLeave}
            onMouseDown={this.cardMouseDown(key)}
            onMouseUp={this.cardMouseUp}
          >
            {key}
          </CardComponent>
        ))}
        {/* {this.state.enteringCards.map((key) => {
          const c = cards.find((card) => card.key === key);
          if (!c) return null; // in case of key duplication
          return (
            <SlideinCard
              loc={c.loc}
              offsets={c.offsets}
              deg={c.deg}
              key={c.key + "-slidein"}
              origin={c.o}
              width={cWidth}
              height={cHeight}
              src="test"
              alt="test"
            >
              {key}
            </SlideinCard>
          );
        })} */}
        {this.state.exitingCards.map((key) => (
          <FadeoutCard
            key={key + "-out"}
            src="test"
            alt="test"
            loc={getCardPos(this.props.mousePos)}
            width={cWidth}
            height={cHeight}
          >
            {key}
          </FadeoutCard>
        ))}
        {dCards.map(({ loc, o, deg, key, offsets }) => (
          <SlideoutCard
            key={key + "-slideout-hand"}
            src="test"
            alt="test"
            isHand
            loc={loc}
            origin={o}
            deg={deg}
            offsets={offsets}
            width={cWidth}
            height={cHeight}
          >
            {key}
          </SlideoutCard>
        ))}
      </>
    );
  }
}

const styledCardTable = withStyles(styles)(CardTable);
const mouseContextCardTable = withMouseContext(styledCardTable);

export default connect(
  CardTableMapStateToProps,
  cardTableActions
)(mouseContextCardTable);

const getCardLocs = (state: CardTableStates, props: CardTableProps) =>
  props.cards.map((card, idx) => {
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
      cTop + origin.y * (1 - Math.cos(rad_alpha))
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
        loc: Point.at(p.x, activeZoneBottomLineY),
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
      hoverOffsets: Point.at(0, origin.y * (1 - Math.cos(rad_alpha))), // card being hoverd => offset Y
      offsets: Point.at(
        sign * norm(idx, targetCardIndex, cardShiftSigma, cardShiftMagnitude),
        0
      ), // card give way to selected card => offset X
      card,
    };
  });

const getDiscardedCardLocs = (
  state: CardTableStates,
  props: CardTableProps
) => {
  const keys = Object.keys(state.discardingCards);
  if (keys.length === 0) return [];
  const n = keys.length + props.cards.length;

  return Object.keys(state.discardingCards).map((key: string) => {
    const idx = state.discardingCards[key];
    const offset = idx - (n - 1) / 2;
    const alpha = offset * degInterval;
    const rad_alpha = (alpha / 180) * Math.PI;

    const p = Point.at(
      (innerWidth - cWidth) / 2 + origin.y * Math.sin(rad_alpha),
      cTop + origin.y * (1 - Math.cos(rad_alpha))
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

    return {
      loc: p,
      o: Point.at(cWidth / 2, cHeight / 2),
      deg: offset * degInterval,
      key,
      offsets: Point.at(
        sign * norm(idx, targetCardIndex, cardShiftSigma, cardShiftMagnitude),
        0
      ),
    };
  });
};
