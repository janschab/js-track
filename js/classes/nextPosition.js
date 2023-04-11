import { Point } from './point';

export class NextPosition extends Point{
  constructor(x, y, angle, deltaAngle) {
    super(x, y);
    this.deltaAngle = deltaAngle;
    this.angle = angle;
  }
}
