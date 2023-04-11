import { DEFAULT_DIMENSION } from '../constants/constants';
import { generateUUID } from '../helpers/generateUUID';
import { degrees2radians, getAngle, getCenterPosition, getFurtherPoint, getFurtherPointFromMove } from '../helpers/helpers';
import { TrackTileSubtype, TrackTileType } from '../types/enum';
import { TrackTile } from './track-element';

export class Track {
  constructor(sizeX, sizeY, tiles) {
    this.size = {
      x: sizeX,
      y: sizeY
    };
    /**
     * @private
     * @type {Record<string, TrackTile>}
     */
    this.tiles = {};

    this.init(tiles);
    this.drawTrack();
  }

  /**
   * @param track {Track}
   * @returns {Track}
   */
  static fromStorage(track) {
    return new Track(track.size.x, track.size.y, track.tiles);
  }

  /**
   *
   * @param sizeX {number}
   * @param sizeY {number}
   * @returns {Track}
   */
  static fromDefaults(sizeX, sizeY) {
    return new Track(sizeX, sizeY);
  }

  /**
   * @param {TrackTile} trackTile
   */
  addTile(trackTile) {
    if (!trackTile.id) {
      trackTile.setId(generateUUID());
    }

    this.tiles[trackTile.id] = trackTile;
  }

  /**
   * @param {Record<string, TrackTile>} tiles
   */
  init(tiles) {
    if (!tiles) {
      for (let i = 0; i < this.size.x; i++) {
        for (let j = 0; j < this.size.y; j++) {
          const tile = new TrackTile();

          tile.setPosition(i, j);

          this.addTile(tile);
        }
      }
    } else {
      Object.values(tiles).forEach((tile) => {
        const tileObject = new TrackTile(tile);

        this.addTile(tileObject);
      });
    }
  }

  drawTrack() {
    this.trackElement = document.createElement('div');
    this.trackElement.classList.add('track');
    this.trackElement.style.width = this.size.x * DEFAULT_DIMENSION + 'px';
    document.body.appendChild(this.trackElement);

    Object.values(this.tiles).forEach((tile) => {
      tile.drawTile(this.trackElement);
    });
  }

  /**
   * @param {{x: number, y: number}} position
   * @param {{x: number, y: number}} prevPosition
   * @param {number} move
   */
  getNextPosition(position, prevPosition, move) {
    let res = {
      x: position.x,
      y: position.y
    };
    const currentTile = Object.values(this.tiles).find((tile) => {
      return (position.x < ((tile.position.x + 1) * DEFAULT_DIMENSION) && position.x >= (tile.position.x * DEFAULT_DIMENSION)) &&
             (position.y < ((tile.position.y + 1) * DEFAULT_DIMENSION) && position.y >= (tile.position.y * DEFAULT_DIMENSION));
    });

    if (currentTile.type === TrackTileType.STRAIGHT) {
      return this.calculateStraightPosition(currentTile, position, prevPosition, move, res);
    } else {
      return this.calculateTurnPosition(currentTile, position, prevPosition, move, res);
    }
  }

  getCopy() {
    return {
      size: this.size,
      tiles: this.tiles
    };
  }

  calculateStraightPosition(currentTile, position, prevPosition, move, res) {
    if (currentTile.subtype === TrackTileSubtype.HORIZONTAL) {
      res = getFurtherPointFromMove(
        prevPosition,
        position,
        {
          x: move,
          y: 0
        });
      return res;
    }
    if (currentTile.subtype === TrackTileSubtype.VERTICAL) {
      res = getFurtherPointFromMove(
        prevPosition,
        position,
        {
          x: 0,
          y: move
        });
      return res;
    }

    return res;
  }

  calculateTurnPosition(currentTile, position, prevPosition, move, res) {
    const relativePosition = {
      x: position.x - currentTile.position.x * DEFAULT_DIMENSION,
      y: position.y - currentTile.position.y * DEFAULT_DIMENSION
    };

    const relativePrevPosition = {
      x: prevPosition.x - currentTile.position.x * DEFAULT_DIMENSION,
      y: prevPosition.y - currentTile.position.y * DEFAULT_DIMENSION
    };

    let centerPosition = getCenterPosition(currentTile.subtype);

    let cartesianPosition = {
      x: relativePosition.x - centerPosition.x,
      y: -(relativePosition.y - centerPosition.y)
    };
    let cartesianPrevPosition = {
      x: relativePrevPosition.x - centerPosition.x,
      y: -(relativePrevPosition.y - centerPosition.y)
    };

    let currentAngle = Math.atan2(cartesianPosition.y, cartesianPosition.x) * 180 / Math.PI;

    const firstDegree = currentAngle + getAngle(move, DEFAULT_DIMENSION / 2);
    const secondDegree = currentAngle - getAngle(move, DEFAULT_DIMENSION / 2);

    const firstPoint = {
      x: Math.cos(degrees2radians(firstDegree)) * 100,
      y: Math.sin(degrees2radians(firstDegree)) * 100
    };

    const secondPoint = {
      x: Math.cos(degrees2radians(secondDegree)) * 100,
      y: Math.sin(degrees2radians(secondDegree)) * 100
    };

    const point = getFurtherPoint(cartesianPrevPosition, cartesianPosition, firstPoint, secondPoint);

    res = {
      x: (point.x + centerPosition.x) + currentTile.position.x * DEFAULT_DIMENSION,
      y: (-point.y + centerPosition.y) + currentTile.position.y * DEFAULT_DIMENSION,
    };

    return res;

  }
}
