export class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  static from(x, y) {
    return new Point(x, y);
  }
}
