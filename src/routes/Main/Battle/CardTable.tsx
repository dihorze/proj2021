import React, { Component } from "react";
import { Button1 } from "../../../components/Buttons/Buttons";
import { Card } from "../../../components/Cards/Card";
import ExitingCard from "../../../components/Cards/ExitingCard";
import { withMouseContext } from "../../../components/context/withMouseContext";
import {
  activeZoneBottomLineY,
  cHeight,
  cTop,
  cWidth,
  getCardCenter,
  origin,
} from "../../../data/Battlefield";
import { norm } from "../../../model/fomula";
import { Point } from "../../../model/positioning";

const innerWidth = window.innerWidth;

interface CardTableProps {
  mousePos: Point;
}

interface CardTableStates {
  cards: Array<number>;
  exitingCards: Array<number>;
  hoveredCard: number;
  selectedCard: number;
}

export class CardTable extends Component<CardTableProps, CardTableStates> {
  state = {
    cards: [0, 1, 2, 3, 4, 5],
    exitingCards: [],
    hoveredCard: -1,
    selectedCard: -1,
  };

  shouldComponentUpdate(nextProps: CardTableProps, nextState: CardTableStates) {
    if (this.state === nextState && this.state.selectedCard === -1)
      return false;
    return true;
  }

  btnClick = () => {
    this.setState((state: any) => {
      const newCards = state.cards.concat(Math.floor(Math.random() * 1000));
      return { cards: newCards };
    });
  };

  cardClick = (idx: number) => () => {
    console.log("card click");
    // this.cardLeave();
    // this.setState((state: any) => {
    //   console.log(state);
    //   const newCards = [...state.cards];
    //   newCards.splice(idx, 1);
    //   return { cards: newCards };
    // });
  };

  cardEnter = (idx: number) => () => {
    this.setState({ hoveredCard: idx });
  };

  cardLeave = () => {
    this.setState({ hoveredCard: -1 });
  };

  cardMouseUp = (event: React.MouseEvent) => {
    if (
      event.button === 0 &&
      getCardCenter(this.props.mousePos).y < activeZoneBottomLineY
    ) {
      this.setState((state: CardTableStates) => {
        console.log(state);
        const newCards = [...state.cards];
        const key = state.cards[state.selectedCard];
        newCards.splice(state.selectedCard, 1);
        const n = state.exitingCards.length;
        const newExitingCards =
          n > 0 ? [state.exitingCards[n - 1], key] : [key];
        return {
          cards: newCards,
          selectedCard: -1,
          hoveredCard: -1,
          exitingCards: newExitingCards,
        };
      });
    }
  };

  cardMouseDown = (idx: number) => (event: React.MouseEvent) => {
    if (event.button === 0) {
      this.setState({
        selectedCard: idx,
      });
    } else {
      event.preventDefault();
      this.setState({
        selectedCard: -1,
      });
    }
  };

  render() {
    // console.log(this.state.hoveredCard);
    // console.log(this.state.selectedCard);

    const n = this.state.cards.length;
    const cards = this.state.cards.map((x, idx) => {
      const offset = idx - (n - 1) / 2;
      const degInterval = 2;
      const alpha = offset * degInterval;
      const rad_alpha = (alpha / 180) * Math.PI;

      const p = Point.at(
        (innerWidth - cWidth) / 2 + origin.y * Math.sin(rad_alpha),
        cTop + origin.y * (1 - Math.cos(rad_alpha))
      );

      const targetCard =
        this.state.selectedCard < 0
          ? this.state.hoveredCard < 0
            ? -1
            : this.state.hoveredCard
          : this.state.selectedCard;

      const sign =
        idx === targetCard || targetCard < 0 ? 0 : idx < targetCard ? -1 : 1;

      if (this.state.selectedCard === idx) {
        return {
          loc: getCardCenter(this.props.mousePos),
          o: Point.at(cWidth / 2, cHeight / 2),
          deg: 0,
          key: x,
          hoverOffsets: Point.at(0, 0),
          offsets: Point.at(0, 0),
        };
      }

      return {
        loc: p,
        o: Point.at(cWidth / 2, cHeight / 2),
        deg: offset * degInterval,
        key: x,
        hoverOffsets: Point.at(0, origin.y * (1 - Math.cos(rad_alpha))),
        offsets: Point.at(sign * norm(idx, targetCard, 1.5, 200), 0),
      };
    });
    // console.log(cards);
    return (
      <div>
        <Button1
          btnStyle={{ position: "fixed", top: 300, left: 300, width: 150 }}
          onClick={this.btnClick}
        >
          Add Cards
        </Button1>
        {cards.map(({ loc, o, deg, key, hoverOffsets, offsets }, idx) => (
          <Card
            src="test"
            alt="test"
            loc={loc}
            origin={o}
            deg={deg}
            key={key}
            isSelected={this.state.selectedCard === idx}
            isHovered={
              this.state.hoveredCard === idx && this.state.selectedCard < 0
            }
            hoverOffsets={hoverOffsets}
            offsets={offsets}
            width={cWidth}
            height={cHeight}
            onClick={this.cardClick(idx)}
            onMouseEnter={this.cardEnter(idx)}
            onMouseLeave={this.cardLeave}
            onMouseDown={this.cardMouseDown(idx)}
            onMouseUp={this.cardMouseUp}
          >
            {key}
          </Card>
        ))}
        {this.state.exitingCards.map((key) => (
          <ExitingCard
            key={key}
            src="test"
            alt="test"
            loc={getCardCenter(this.props.mousePos)}
            width={cWidth}
            height={cHeight}
          >
            {key}
          </ExitingCard>
        ))}
      </div>
    );
  }
}

export default withMouseContext(CardTable);
