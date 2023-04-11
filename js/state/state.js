import { DEFAULT_DIMENSION } from '../constants/constants';

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
      y: 3,
    }
  }

  setStartTile(x, y) {
    this.startTile = { x, y };
  }

  getStartPosition() {
    return {
      x: (this.startTile.x + 1) * DEFAULT_DIMENSION - DEFAULT_DIMENSION / 2,
      y: (this.startTile.y + 1) * DEFAULT_DIMENSION - DEFAULT_DIMENSION / 2,
    };
  }
}

export const state = new State();
