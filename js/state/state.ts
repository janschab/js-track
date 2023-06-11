import { BehaviorSubject } from 'rxjs';
import { DEFAULT_DIMENSION, DEFAULT_X_SIZE, DEFAULT_Y_SIZE, RADIUS } from '../constants/constants';
import { Direction } from '../types/enum';
import {Point} from "../classes/point";

class State {
  public startTile$: BehaviorSubject<Point>;
  public direction$: BehaviorSubject<Direction>;
  public directionMode: boolean;
  public size: Point;

  constructor() {
    this.startTile$ = new BehaviorSubject(Point.from(0, 0));
    this.direction$ = new BehaviorSubject(Direction.NORMAL);
    this.directionMode = false;
    this.size = Point.from(DEFAULT_X_SIZE, DEFAULT_Y_SIZE);
  }

  setStartTile(x, y) {
    this.startTile$.next(Point.from(x, y));
  }

  getStartPosition() {
    return {
      x: (this.startTile$.value.x + 1) * DEFAULT_DIMENSION - RADIUS,
      y: (this.startTile$.value.y + 1) * DEFAULT_DIMENSION - RADIUS,
    };
  }

  toggleDirectionMode(state: boolean) {
    this.directionMode = state;
  }

  toggleDirection() {
    this.direction$.next(this.direction$.value === Direction.NORMAL ? Direction.OPPOSITE : Direction.NORMAL);
  }
}

export const state = new State();
