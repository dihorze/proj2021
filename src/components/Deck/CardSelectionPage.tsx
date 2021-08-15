import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import { Card } from "../../model/classes";
import { cHeight, cWidth } from "../../data/ADeckOfCards";
import { CardStaticComponent } from "../Cards/Card";
import { Point } from "../../model/positioning";
import { getRandomCard, getRandomCards } from "../../data/deck";

const useStyles = makeStyles({
  backdrop: {
    position: "fixed",
    opacity: ({ show }: any) => (show ? 1 : 0),
    top: 0,
    left: 0,
    height: "100%",
    width: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    zIndex: 200,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    overflowY: "scroll",
    transition: "opacity 0.2s ease-in",
  },
  cardctn: {
    padding: 25,
  },
});

interface CardSelectionPageProps {
  show?: boolean;
  cards?: Array<Card>;
  onClick?: (card: Card) => (event: React.MouseEvent) => void;
  onContextMenu?: (event?: React.MouseEvent) => void;
}

export const CardSelectionPage: React.FC<CardSelectionPageProps> = ({
  show,
  cards,
  onClick,
  onContextMenu,
}) => {
  const [isDismounted, setIsDismounted] = useState(true);
  const [cardsToChoose, setCardsToChoose] = useState(getRandomCards(3));

  const cardsToShow = cards || cardsToChoose;

  const classes = useStyles({ show });

  useEffect(() => {
    if (show) {
      if (!cards) setCardsToChoose(getRandomCards(3));
      setIsDismounted(false);
    } else {
      setTimeout(() => setIsDismounted(true), 200);
    }
  }, [show, cards]);

  const onRightClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onContextMenu();
  };

  return (
    (!isDismounted || show) && (
      <div className={classes.backdrop} onContextMenu={onRightClick}>
        {cardsToShow.map((card, idx) => (
          <div className={classes.cardctn} onClick={onClick(card)} key={card.key}>
            <CardStaticComponent
              card={card}
              width={cWidth}
              height={cHeight}
              loc={Point.at(0, 0)}
              hasHoverEffect
            />
          </div>
        ))}
      </div>
    )
  );
};
