import { Point } from "../model/positioning";

export const degInterval = 4; // card spacings
export const cWidth = 140;
export const cHeight = 198;

export const cWidthL = 182;
export const cHeightL = 257;

export const cWidthXS = 30;
export const cHeightXS = 42;

export const getCTop = (innerHeight: number) => innerHeight - cHeight;
export const origin = Point.at(0, 1500);
export const getActiveZoneBottomLineY = (innerHeight: number) => getCTop(innerHeight) - 75;
export const getActiveAttackZoneBottomLineY = (innerHeight: number) => getCTop(innerHeight) - 25;
export const getActiveCardTableZoneBottomLineY = (innerHeight: number) => getCTop(innerHeight) + 125;
export const cardShiftSigma = 2;
export const cardShiftMagnitude = 300;

export const sinkCoefficient = 1.5;

export const getCardPos = (mousePos: Point) =>
  mousePos.subtract(Point.at(cWidth / 2, cHeight / 2)).add(Point.at(10, 0));


// status bar
export const sWidth = 72;
export const sHeight = 72;
export const getSTop = (innerHeight: number) => innerHeight - cHeight - 1.5 * sHeight;
export const sOrigin = Point.at(0, 2000);
export const sDegInterval = 8;

