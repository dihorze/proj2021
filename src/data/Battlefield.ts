import { Point } from "../model/positioning";


export const innerWidth = window.innerWidth;
export const degInterval = 4; // card spacings
export const cWidth = 140;
export const cHeight = 198;

export const cWidthL = 182;
export const cHeightL = 257;

export const cTop = 427;
export const origin = Point.at(0, 1500);
export const activeZoneBottomLineY = 400;
export const activeAttackZoneBottomLineY = 450;
export const activeCardTableZoneBottomLineY = 550;
export const cardShiftSigma = 2;
export const cardShiftMagnitude = 300;

export const sinkCoefficient = 1.5;

export const getCardPos = (mousePos: Point) =>
  mousePos.subtract(Point.at(cWidth / 2, cHeight / 2)).add(Point.at(10, 0));
