import { Point } from './point';

export class NextPosition extends Point{
  constructor(x, y, out, angle) {
    super(x, y);
    this.out = out;
    this.angle = angle;
  }
}
