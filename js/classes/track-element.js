import { DEFAULT_DIMENSION } from '../constants/constants';
import { getFurtherPoint } from '../helpers/helpers';
import { getCoordinatesFromPositionAndRelativePoint } from '../helpers/positionCalculator';
import { getBoundingPoints } from '../helpers/startingPointsResolver';
import { state } from '../state/state';
import { Direction, TrackTileSubtype, TrackTileType } from '../types/enum';
import { Point } from './point';

export class TrackTile {

  constructor(tile = {}) {
    this.id = tile.id ?? null;
    this.element = null;
    /**
     * @type {TrackTileType | null}
     */
    this.type = tile.type ?? null;
    /**
     * @type {TrackTileSubtype | null}
     */
    this.subtype = tile.subtype ?? null;
    this.size = tile.size ?? {
      x: DEFAULT_DIMENSION,
      y: DEFAULT_DIMENSION
    };
    this.position = tile.position ?? null;
    /**
     * @type {Point | null}
     */
    this.startCoordinates = tile.startCoordinates ?? null;
    /**
     * @type {Point | null}
     */
    this.endCoordinates = tile.endCoordinates ?? null;
  }

  setId(id) {
    this.id = id;
  }

  /**
   * @param {TrackTileType} trackType
   */
  setType(trackType) {
    this.type = trackType;
  }

  setPosition(x, y) {
    this.position = {
      x,
      y
    };
  }

  drawTile(trackElement) {
    if (!this.element) {
      this.element = document.createElement('div');
      this.element.classList.add('track-tile');
      this.element.style.width = this.size.x + 'px';
      this.element.style.height = this.size.y + 'px';
      this.element.style.top = this.position.y * DEFAULT_DIMENSION + 'px';
      this.element.style.left = this.position.x * DEFAULT_DIMENSION + 'px';

      trackElement.appendChild(this.element);

      this.element.addEventListener('click', () => {
        this.handleClick();
      });
    }
    if (this.type != null && this.subtype != null) {
      this.element.className = 'track-tile track-tile--' + this.type + this.subtype;
    }
    if (this.endCoordinates && this.isStartTile()) {
      if (!this.startPointElement) {
        this.startPointElement = document.createElement('div');
        this.startPointElement.className = 'start-point';
        trackElement.appendChild(this.startPointElement);
      }
      this.startPointElement.style.top = this.endCoordinates.y + 'px';
      this.startPointElement.style.left = this.endCoordinates.x + 'px';
    }

    this.element.style.backgroundColor = this.isStartTile() ? '#ff7e7e' : 'white';
  }

  handleClick() {
    if (state.directionMode) {
      if (this.isStartTile()) {
        state.toggleDirection();
      } else {
        state.setStartTile(this.position.x, this.position.y);
      }
      return;
    }

    if (this.type === TrackTileType.STRAIGHT && this.subtype === TrackTileSubtype.HORIZONTAL) {
      this.subtype = TrackTileSubtype.VERTICAL;
    } else if (this.type === TrackTileType.STRAIGHT && this.subtype === TrackTileSubtype.VERTICAL) {
      this.type = TrackTileType.BEND;
      this.subtype = TrackTileSubtype.NE;
    } else if (this.type === TrackTileType.BEND && this.subtype < TrackTileSubtype.NW) {
      this.subtype++;
    } else {
      this.type = TrackTileType.STRAIGHT;
      this.subtype = TrackTileSubtype.HORIZONTAL;
    }

    this.drawTile();
  }

  isStartTile() {
    return this.position.x === state.startTile$.value.x && this.position.y === state.startTile$.value.y;
  }

  /**
   * @param {Direction} direction
   * @return {TrackTile}
   */
  setStartCoordinates(direction) {
    if (direction === Direction.NORMAL) {
      this.startCoordinates = this.getCoordinatesPoint(getBoundingPoints(this.subtype)[0]);
      this.endCoordinates = this.getCoordinatesPoint(getBoundingPoints(this.subtype)[1]);
    } else {
      this.startCoordinates = this.getCoordinatesPoint(getBoundingPoints(this.subtype)[1]);
      this.endCoordinates = this.getCoordinatesPoint(getBoundingPoints(this.subtype)[0]);
    }

    return this;
  }

  setStartCoordinatesFromPrevious(prevEndCoordinated) {
    const possiblePoints = [
      this.getCoordinatesPoint(getBoundingPoints(this.subtype)[0]),
      this.getCoordinatesPoint(getBoundingPoints(this.subtype)[1])
    ];

    this.endCoordinates = getFurtherPoint(prevEndCoordinated, possiblePoints[0], possiblePoints[1]);

    if (this.endCoordinates.equals(possiblePoints[0])) {
      this.startCoordinates = possiblePoints[1];
    } else {
      this.startCoordinates = possiblePoints[0];
    }
  }

  getCoordinatesPoint(point) {
    return getCoordinatesFromPositionAndRelativePoint(this.position, point);
  }
}
