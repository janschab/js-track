import { DEFAULT_DIMENSION, RADIUS } from '../constants/constants';

class State {
  constructor() {
    /**
     * @private
     * @type {{x: number, y: number}}
     */
    this.startTile = {
      x: 0,
      y: 0,
    }
    /**
     * @type {{x: number, y: number}}
     */
    this.size = {
      x: 8,
      y: 4,
    }
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
