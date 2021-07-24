import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/styles";
import { StyleRules } from "@material-ui/core";
import { ADeckOfCards } from "../../../../components/Deck/ADeckOfCards";
import { Point } from "../../../../model/positioning";
import { Card } from "../../../../model/classes";
import { shuffle } from "../../../../components/util/functions";

const useStyles = makeStyles({
  img: {
    width: 80,
    position: "fixed",
    left: 50,
    bottom: 40,
    transition: "transform 300ms ease-in",
    zIndex: ({ show }: any) => (show ? 201 : "auto"),
    "&:hover": {
      transform: "scale(1.15)",
    },
    "&:active": {
      transform: "rotate(-0.4turn)",
    },
  },
} as StyleRules);

interface DrawStackProps {
  locs?: Point;
  cards?: Array<Card>;
  showDrawDeck?: boolean;
  onClick?: (event: React.MouseEvent) => void;
  onContextMenu?: (event: React.MouseEvent) => void;
}

export const DrawStack: React.FC<DrawStackProps> = ({
  locs,
  cards,
  showDrawDeck,
  onClick,
  onContextMenu,
}) => {
  const classes = useStyles({ show: showDrawDeck });

  const [shuffledCards, setShuffledCards] = useState(shuffle(cards));

  useEffect(() => {
    setShuffledCards(shuffle(cards));
    console.log("effect");
  }, [cards]);

  return (
    <>
      <img
        className={classes.img}
        src="./assets/draw_stack.png"
        alt="draw_stack"
        draggable={false}
        onClick={onClick}
      ></img>
      <ADeckOfCards
        cards={shuffledCards}
        show={showDrawDeck}
        onContextMenu={onContextMenu}
      />
    </>
  );
};
