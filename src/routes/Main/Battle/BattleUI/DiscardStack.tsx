import React from "react";
import { makeStyles } from "@material-ui/styles";
import { StyleRules } from "@material-ui/core";
import { Point } from "../../../../model/positioning";
import { Card } from "../../../../model/classes";
import { ADeckOfCards } from "../../../../components/Deck/ADeckOfCards";

const useStyles = makeStyles({
  img: {
    width: 90,
    position: "fixed",
    right: 30,
    bottom: 24,
    transition: "transform 300ms ease-in",
    zIndex: ({show}: any) => show ? 201 : "auto",
    "&:hover": {
      transform: "scale(1.15)",
    },
    "&:active": {
      transform: "rotate(0.4turn)"
    }
  },
  txt: {
    position: "fixed",
    right: 75,
    bottom: 20,
    fontSize: "1em",
    color: "#fff"
  },
} as StyleRules);

interface DiscardStackProps {
  locs?: Point;
  cards?: Array<Card>;
  showDiscardDeck?: boolean;
  onClick?: (event: React.MouseEvent) => void;
  onContextMenu?: (event: React.MouseEvent) => void;
}

export const DiscardStack: React.FC<DiscardStackProps> = ({
  locs,
  cards,
  showDiscardDeck,
  onClick,
  onContextMenu,
}) => {
  const classes = useStyles({ show: showDiscardDeck });

  return (
    <>
    <div className={classes.txt}>{cards.length}</div>
      <img
        className={classes.img}
        src="./assets/stack.png"
        alt="stack"
        draggable={false}
        onClick={onClick}
      ></img>
      <ADeckOfCards
        cards={cards}
        show={showDiscardDeck}
        onContextMenu={onContextMenu}
      />
    </>
  );
};
