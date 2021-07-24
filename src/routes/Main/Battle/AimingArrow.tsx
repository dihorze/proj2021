import { makeStyles } from "@material-ui/core";
import React from "react";
import { connect } from "react-redux";
import { withMouseContext } from "../../../components/context/withMouseContext";
import { AttackArrow } from "../../../components/CurvedArrows/AttackArrow";
import {
  cWidth,
  degInterval,
  origin,
  innerWidth,
  activeZoneBottomLineY,
  cHeight,
} from "../../../data/Battlefield";
import { CardTypes } from "../../../data/deck";
import { Card } from "../../../model/classes";
import { Point } from "../../../model/positioning";

interface AimingArrowProps {
  cards: Array<Card>;
  aimingCard: string;
  mousePos: Point;
}

const useStyles = makeStyles({
  arrow: {
    width: "100%"
  },
});

const AimingArrow: React.FC<AimingArrowProps> = ({
  cards,
  aimingCard,
  mousePos,
}) => {
  const classes = useStyles({});

  if (aimingCard === CardTypes.NONE)
    return aimingCard !== CardTypes.NONE && <div />;

  const index = cards.findIndex((c) => c.key === aimingCard);
  const offset = index - (cards.length - 1) / 2;
  const alpha = offset * degInterval;
  const rad_alpha = (alpha / 180) * Math.PI;
  const p = Point.at(
    (innerWidth - cWidth) / 2 + origin.y * Math.sin(rad_alpha) + cWidth / 2,
    activeZoneBottomLineY + cHeight / 2
  );

  return (
    <div className={classes.arrow}>
      <AttackArrow
        p1={p}
        p2={mousePos}
        cp1={p.subtract(Point.at(0.25 * (mousePos.x - p.x), 200))}
        cp2={mousePos.subtract(Point.at(mousePos.x - p.x, 20))}
      />
    </div>
  );
};

const mapStateToProps = ({ battle }) => {
  return {
    cards: battle.card.cards,
    aimingCard: battle.card.aimingCard,
  };
};

const mouseContextAimingArrow = withMouseContext(AimingArrow);

export default connect(mapStateToProps)(mouseContextAimingArrow);
