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
      console.log('position', position);
      console.log('prevPosition', prevPosition);
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
    // console.log('relativePosition', relativePosition);
    const relativePrevPosition = {
      x: prevPosition.x - currentTile.position.x * DEFAULT_DIMENSION,
      y: prevPosition.y - currentTile.position.y * DEFAULT_DIMENSION
    };
    // console.log('relativePrevPosition', relativePrevPosition);

    let centerPosition = getCenterPosition(currentTile.subtype);

    let zeroPosition = {
      x: relativePosition.x - centerPosition.x,
      y: -(relativePosition.y - centerPosition.y)
    };

    let center = document.createElement('div');
    center.style.width = '10px';
    center.style.height = '10px';
    center.id = 'center';
    center.style.top = centerPosition.y + 'px';
    center.style.left = centerPosition.x + 'px';
    center.style.position = 'absolute';
    center.style.background = 'red';
    currentTile.element.appendChild(center);

    let element = document.createElement('div');
    element.style.width = '10px';
    element.style.height = '10px';
    element.style.top = zeroPosition.y + 'px';
    element.style.left = zeroPosition.x + 'px';
    element.style.position = 'absolute';
    element.style.background = 'red';
    element.style.zIndex = '99';
    center.appendChild(element);

    // console.log('zeroPosition', zeroPosition);

    // let contactPointX = Math.sqrt(((DEFAULT_DIMENSION / 2) ** 2) / (1 + ((zeroPosition.x / zeroPosition.y) ** 2)));
    // let contactPointY = zeroPosition.x * contactPointX / zeroPosition.y;
    //
    // let contactPoint = {
    //   x: contactPointX,
    //   y: contactPointY,
    // }

    let currentAngle = Math.atan(zeroPosition.x / zeroPosition.y) * 180 / Math.PI;
    if (zeroPosition.x > 0) {
      if (zeroPosition.y < 0) {
        currentAngle += 180;
      }
    }
    if (zeroPosition.x <= 0) {
      if (zeroPosition.y < 0) {
        currentAngle = -currentAngle + 180;
      }
    }
    console.log(currentAngle);

    const firstDegree = currentAngle + getAngle(move, DEFAULT_DIMENSION / 2);
    const secondDegree = currentAngle - getAngle(move, DEFAULT_DIMENSION / 2);

    const firstPoint = {
      x: Math.sin(degrees2radians(firstDegree)) * 100,
      y: Math.cos(degrees2radians(firstDegree)) * 100
    };
    // console.log('firstPoint', firstPoint);

    const secondPoint = {
      x: Math.sin(degrees2radians(secondDegree)) * 100,
      y: Math.cos(degrees2radians(secondDegree)) * 100
    };
    const point = getFurtherPoint(relativePrevPosition, relativePosition, firstPoint, secondPoint);

    if (zeroPosition.x <= 0) {
      if (zeroPosition.y < 0) {
        point.x = -point.x;
      }
    }

    // console.log('point', point);
    const resPoint = {
      x: point.x + currentTile.position.x * DEFAULT_DIMENSION,
      y: (-point.y + centerPosition.y) + currentTile.position.y * DEFAULT_DIMENSION,
    };

    // console.log(resPoint);
    return resPoint;

  }
}
