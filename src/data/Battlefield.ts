import { Point } from "../model/positioning";

export const cWidth = 130;
export const cHeight = 180;
export const cTop = 450;
export const origin = Point.at(0, 3000);
export const activeZoneBottomLineY = 350;

export const getCardCenter = (mousePos: Point) =>
  mousePos.subtract(Point.at(cWidth / 2, cHeight / 2)).add(Point.at(10, 30));
