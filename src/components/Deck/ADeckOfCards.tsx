import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import { Card } from "../../model/classes";
import {
  cHeight,
  cWidth,
  hSpacing,
  leftMargin,
  noCardsPerRow,
  topMargin,
  wSpacing,
} from "../../data/ADeckOfCards";
import { CardComponent, CardStaticComponent } from "../Cards/Card";
import { Point } from "../../model/positioning";

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

interface ADeckOfCardsProps {
  show?: boolean;
  cards?: Array<Card>;
  onContextMenu?: (event?: React.MouseEvent) => void;
}

export const ADeckOfCards: React.FC<ADeckOfCardsProps> = ({
  show,
  cards,
  onContextMenu,
}) => {
  const [isDismounted, setIsDismounted] = useState(true);

  const classes = useStyles({ show });

  useEffect(() => {
    if (show) setIsDismounted(false);
    else {
      setTimeout(() => setIsDismounted(true), 200)
    }
  }, [show]);

  const onRightClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onContextMenu();
  };

  return (
    (!isDismounted || show) && (
      <div className={classes.backdrop} onContextMenu={onRightClick}>
        {cards.map((card, idx) => (
          <div className={classes.cardctn} key={card.key}>
            <CardStaticComponent
              card={card}
              width={cWidth}
              height={cHeight}
              loc={Point.at(0, 0)}
            />
          </div>
        ))}
      </div>
    )
  );
};
