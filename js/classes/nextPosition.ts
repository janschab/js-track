import { Point } from './point';

export class NextPosition extends Point{
  public deltaAngle: number;
  public angle: number;

  constructor(x, y, angle, deltaAngle) {
    super(x, y);
    this.deltaAngle = deltaAngle;
    this.angle = angle;
  }
}
