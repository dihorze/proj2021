import { Point } from "../model/positioning";

export const getFakeCards = (
  nCards: number,
  innerWidth: number,
  cWidth: number,
  cHeight: number,
  top: number,
  origin: Point
) =>
  new Array(nCards).fill(0).map((x, idx) => {
    // const p = Point.at(margin + idx * (spacing + cWidth), top);
    const p = Point.at((innerWidth - cWidth) / 2, top);
    return {
      loc: p,
      o: Point.at(cWidth / 2, top + cHeight / 2 + origin.y),
      deg: (idx - (nCards - 1) / 2) * 2,
    };
  });

export const getCard = (
  nCards: number,
  index: number,
  innerWidth: number,
  cWidth: number,
  cHeight: number,
  top: number,
  origin: Point
) => {
  const p = Point.at((innerWidth - cWidth) / 2, top);
  return {
    loc: p,
    o: Point.at(cWidth / 2, top + cHeight / 2 + origin.y),
    deg: (index - (nCards - 1) / 2) * 2,
  };
}
