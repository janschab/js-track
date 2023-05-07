export class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  /**
   * @static
   * @param {number} x
   * @param {number} y
   * @return {Point}
   */
  static from(x, y) {
    return new Point(x, y);
  }

  /**
   * @static
   * @param {Point} point
   * @return {Point}
   */
  static copy(point) {
    return new Point(point.x, point.y);
  }

  /**
   * @param {Point} point
   * @return {boolean}
   */
  equals(point) {
    return this.x === point.x && this.y === point.y;
  }
}
