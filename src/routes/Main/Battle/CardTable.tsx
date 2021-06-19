import React, { Component } from "react";
import { Button1 } from "../../../components/Buttons/Buttons";
import { Card } from "../../../components/Cards/Card";
import SlideoutCard from "../../../components/Cards/Slideout";
import FadeoutCard from "../../../components/Cards/Fadeout";
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
import SlideinCard from "../../../components/Cards/Slidein";

const innerWidth = window.innerWidth;

interface CardTableProps {
  mousePos: Point;
}

interface CardTableStates {
  cards: Array<number>;
  exitingCards: Array<number>;
  enteringCards: Array<number>;
  discardingCards: Array<Array<number>>;
  hoveredCard: number;
  selectedCard: number;
}

export class CardTable extends Component<CardTableProps, CardTableStates> {
  state = {
    cards: [0, 1, 2, 3, 4, 5],
    exitingCards: [],
    discardingCards: [], // from hand
    enteringCards: [],
    hoveredCard: -1,
    selectedCard: -1,
  };

  shouldComponentUpdate(nextProps: CardTableProps, nextState: CardTableStates) {
    if (this.state === nextState && this.state.selectedCard === -1)
      return false;
    return true;
  }

  addOne = () => {
    this.setState((state: CardTableStates) => {
      const newCard = Math.floor(Math.random() * 1000);
      const newCards = state.cards.concat(newCard);
      return {
        cards: newCards,
        enteringCards: [...state.enteringCards, newCard],
      };
    });
  };

  addMany = () => {
    const noToAdd = 5;
    const cards = new Array(noToAdd)
      .fill(0)
      .map(() => Math.floor(Math.random() * 1000));
    this.setState((state: CardTableStates) => {
      const newCards = state.cards.concat(...cards);
      const newEnteringCards = state.enteringCards.concat(...cards);
      return {
        cards: newCards,
        enteringCards: newEnteringCards,
      };
    });
  };

  deleteAll = () => {
    this.setState((state: CardTableStates) => {
      return {
        cards: [],
        enteringCards: [],
        exitingCards: [],
        discardingCards: state.cards.map((key, idx) => [key, idx]),
        hoveredCard: -1,
        selectedCard: -1,
      };
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
        const newEnteringCards = state.enteringCards.filter((c) => c !== key);
        return {
          cards: newCards,
          selectedCard: -1,
          hoveredCard: -1,
          exitingCards: newExitingCards,
          enteringCards: newEnteringCards,
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

    const cards = getCardLocs(this.state, this.props);
    const dCards =
      this.state.discardingCards.length > 0
        ? getDiscardedCardLocs(this.state, this.props)
        : [];

    return (
      <div>
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
        {this.state.enteringCards.map((key) => {
          const c = cards.find((card) => card.key === key);

          return (
            <SlideinCard
              loc={c.loc}
              offsets={c.offsets}
              deg={c.deg}
              key={c.key + "-slidein"}
              width={cWidth}
              height={cHeight}
              src="test"
              alt="test"
            >
              {key}
            </SlideinCard>
          );
        })}
        {this.state.exitingCards.map((key) => (
          <SlideoutCard
            key={key + "-slideout"}
            src="test"
            alt="test"
            loc={getCardCenter(this.props.mousePos)}
            width={cWidth}
            height={cHeight}
          >
            {key}
          </SlideoutCard>
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
      </div>
    );
  }
}

export default withMouseContext(CardTable);

const getCardLocs = (state: CardTableStates, props: CardTableProps) =>
  state.cards.map((x, idx) => {
    const offset = idx - (state.cards.length - 1) / 2;
    const degInterval = 2;
    const alpha = offset * degInterval;
    const rad_alpha = (alpha / 180) * Math.PI;

    const p = Point.at(
      (innerWidth - cWidth) / 2 + origin.y * Math.sin(rad_alpha),
      cTop + origin.y * (1 - Math.cos(rad_alpha))
    );

    const targetCard =
      state.selectedCard < 0
        ? state.hoveredCard < 0
          ? -1
          : state.hoveredCard
        : state.selectedCard;

    const sign =
      idx === targetCard || targetCard < 0 ? 0 : idx < targetCard ? -1 : 1;

    if (state.selectedCard === idx) {
      return {
        loc: getCardCenter(props.mousePos),
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

const getDiscardedCardLocs = (
  state: CardTableStates,
  props: CardTableProps
) => {
  const n = state.discardingCards.length + state.cards.length;

  return state.discardingCards.map((x) => {
    const [key, idx] = x;
    const offset = idx - (n - 1) / 2;
    const degInterval = 2;
    const alpha = offset * degInterval;
    const rad_alpha = (alpha / 180) * Math.PI;

    const p = Point.at(
      (innerWidth - cWidth) / 2 + origin.y * Math.sin(rad_alpha),
      cTop + origin.y * (1 - Math.cos(rad_alpha))
    );

    const targetCard =
      state.selectedCard < 0
        ? state.hoveredCard < 0
          ? -1
          : state.hoveredCard
        : state.selectedCard;

    const sign =
      idx === targetCard || targetCard < 0 ? 0 : idx < targetCard ? -1 : 1;

    return {
      loc: p,
      o: Point.at(cWidth / 2, cHeight / 2),
      deg: offset * degInterval,
      key,
      offsets: Point.at(sign * norm(idx, targetCard, 1.5, 200), 0),
    };
  });
};
