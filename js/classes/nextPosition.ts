import { Point } from './point';

export class NextPosition extends Point {
  public deltaAngle: number;
  public angle: number;

  constructor(x: number, y: number, angle: number, deltaAngle: number) {
    super(x, y);
    this.deltaAngle = deltaAngle;
    this.angle = angle;
  }

  static fromPosition({x, y, angle, deltaAngle}: Pick<NextPosition, 'x' | 'y' | 'angle' | 'deltaAngle'>): NextPosition {
    return new NextPosition(x, y, angle, deltaAngle);
  }
}
