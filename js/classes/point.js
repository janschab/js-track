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
}
