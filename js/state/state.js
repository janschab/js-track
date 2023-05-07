import { BehaviorSubject } from 'rxjs';
import { DEFAULT_DIMENSION, DEFAULT_X_SIZE, DEFAULT_Y_SIZE, RADIUS } from '../constants/constants';
import { Direction } from '../types/enum';

class State {
  constructor() {
    /**
     * @type BehaviorSubject
     */
    this.startTile$ = new BehaviorSubject({x: 0, y: 0});
    /**
     * @type BehaviorSubject
     */
    this.direction$ = new BehaviorSubject(Direction.NORMAL);
    /**
     * @type {boolean}
     */
    this.directionMode = false;
    /**
     * @type {{x: number, y: number}}
     */
    this.size = {
      x: DEFAULT_X_SIZE,
      y: DEFAULT_Y_SIZE,
    };
  }

  setStartTile(x, y) {
    this.startTile$.next({ x, y });
  }

  getStartPosition() {
    return {
      x: (this.startTile$.value.x + 1) * DEFAULT_DIMENSION - RADIUS,
      y: (this.startTile$.value.y + 1) * DEFAULT_DIMENSION - RADIUS,
    };
  }

  toggleDirectionMode() {
    this.directionMode = !this.directionMode;
  }

  toggleDirection() {
    this.direction$.next(this.direction$.value === Direction.NORMAL ? Direction.OPPOSITE : Direction.NORMAL);
  }
}

export const state = new State();
