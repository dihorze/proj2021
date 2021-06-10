/**
 * Point (x,y coordinate) on the canvas
 */
export class Point {
  constructor(public x: number, public y: number) {}

  /**
   * Factory method for creating a point at (x,y). Alternative to using the
   * standard constructor.
   * @param x x coordinate
   * @param y y coordinate
   */
  static at(x: number, y: number) {
    return new Point(x, y);
  }

  /**
   * Returns a new point p1 - p2, i.e.
   * newPoint = {p1.x - p2.x, p1.y - p2.y}
   * @param p1 First point
   * @param p2 Second point to subtract from first point
   */
  static subtract(p1: Point, p2: Point) {
    return new Point(p1.x - p2.x, p1.y - p2.y);
  }

  /**
   * Returns a new point p1 + p2, i.e.
   * newPoint = {p1.x + p2.x, p1.y + p2.y}
   * @param p1 First point
   * @param p2 Second point to add to first point
   */
  static add(p1: Point, p2: Point) {
    return new Point(p1.x + p2.x, p1.y + p2.y);
  }

  /**
   * Instance method to vector-add the current point to another point p.
   * Returns a new Point and operator methods can be chained.
   */
  add = (p: Point) => {
    return new Point(this.x + p.x, this.y + p.y);
  };

  /**
   * Instance method to vector-subtract a point p from the current point.
   * Returns a new Point and operator methods can be chained.
   */
  subtract = (p: Point) => {
    return new Point(this.x - p.x, this.y - p.y);
  };
}
