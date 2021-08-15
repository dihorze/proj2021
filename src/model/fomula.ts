import { Point } from "./positioning";

export const norm = (x: number, mui: number, sigma: number, A: number) => {
  return A / (sigma * Math.sqrt(2 * Math.PI)) * Math.exp(- 1 / 2 * ((x - mui) / sigma) ** 2);
};

export const inverse = (x: number, mui: number, A: number) => A / Math.abs(x - mui);

export const getDistance = (p1: Point, p2: Point) => {
  return Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2);
}