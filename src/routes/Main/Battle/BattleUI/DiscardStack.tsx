import React from "react";
import { makeStyles } from "@material-ui/styles";
import { StyleRules } from "@material-ui/core";
import { Point } from "../../../../model/positioning";
import { Card } from "../../../../model/classes";
import { ADeckOfCards } from "../../../../components/Deck/ADeckOfCards";

const useStyles = makeStyles({
  img: {
    width: 96,
    height: 96,
    position: "fixed",
    right: 50,
    bottom: 20,
    transition: "transform 300ms ease-in",
    zIndex: ({show}: any) => show ? 201 : "auto",
    "&:hover": {
      transform: "scale(1.15)",
    },
    "&:active": {
      transform: "rotate(0.4turn)"
    }
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
