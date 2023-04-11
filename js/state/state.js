import { DEFAULT_DIMENSION, DEFAULT_X_SIZE, DEFAULT_Y_SIZE, RADIUS } from '../constants/constants';
import { Direction } from '../types/enum';

class State {
  constructor() {
    /**
     * @private
     * @type {{x: number, y: number}}
     */
    this.startTile = {
      x: 0,
      y: 0,
    };
    /**
     * @type {Direction}
     */
    this.direction = Direction.NORMAL;
    /**
     * @type {{x: number, y: number}}
     */
    this.size = {
      x: DEFAULT_X_SIZE,
      y: DEFAULT_Y_SIZE,
    };
  }

  setStartTile(x, y) {
    this.startTile = { x, y };
  }

  getStartPosition() {
    return {
      x: (this.startTile.x + 1) * DEFAULT_DIMENSION - RADIUS,
      y: (this.startTile.y + 1) * DEFAULT_DIMENSION - RADIUS,
    };
  }
}

export const state = new State();
