import React from "react";
import { makeStyles } from "@material-ui/styles";
import { StyleRules } from "@material-ui/core";
import { Point } from "../../../../model/positioning";
import { Card } from "../../../../model/classes";
import { ADeckOfCards } from "../../../../components/Deck/ADeckOfCards";

const useStyles = makeStyles({
  img: {
    width: 50,
    height: 50,
    position: "fixed",
    right: 50,
    bottom: 120,
    zIndex: ({ show }: any) => (show ? 201 : "auto"),
    transition: "transform 300ms ease-in",
    "&:hover": {
      transform: "scale(1.05)",
    },
  },
  txt: {
    position: "fixed",
    right: 50,
    bottom: 110,
    fontSize: "1em",
    color: "#fff",
  },
} as StyleRules);

interface TrashbinProps {
  locs?: Point;
  cards?: Array<Card>;
  showShredDeck?: boolean;
  onClick?: (event: React.MouseEvent) => void;
  onContextMenu?: (event: React.MouseEvent) => void;
}

export const Trashbin: React.FC<TrashbinProps> = ({
  locs,
  cards,
  showShredDeck,
  onClick,
  onContextMenu,
}) => {
  const classes = useStyles({ show: showShredDeck });

  return (
    <>
      <img
        className={classes.img}
        src="./assets/trashbin.png"
        alt="trashbin"
        draggable={false}
        onClick={onClick}
      ></img>
      <ADeckOfCards
        cards={cards}
        show={showShredDeck}
        onContextMenu={onContextMenu}
      />
    </>
  );
};
