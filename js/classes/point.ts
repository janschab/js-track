export class Point {
  public x: number;
  public y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  static from(x: number, y: number): Point {
    return new Point(x, y);
  }

  static copy(point: Point): Point {
    return new Point(point.x, point.y);
  }

  equals(point: Point): boolean {
    return this.x === point.x && this.y === point.y;
  }
}
