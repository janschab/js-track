import { DEFAULT_DIMENSION } from '../constants/constants';
import { getFurtherPoint } from '../helpers/helpers';
import { getCoordinatesFromPositionAndRelativePoint } from '../helpers/positionCalculator';
import { getBoundingPoints } from '../helpers/startingPointsResolver';
import { state } from '../state/state';
import { Direction, TrackTileSubtype, TrackTileType } from '../types/enum';
import { Point } from './point';

export type TrackTileCopy = Pick<TrackTile, 'id' | 'type' | 'subtype' | 'size' | 'position' | 'startCoordinates' | 'endCoordinates'>

export class TrackTile {
  public id: string | null;
  public element: HTMLElement | null;
  public type: TrackTileType | null;
  public subtype: TrackTileSubtype | null;
  public size: Point | null;
  public position: Point | null;
  public startCoordinates: Point | null;
  public endCoordinates: Point | null;
  public startPointElement?: HTMLElement;

  constructor(tile: Partial<TrackTileCopy> = {}) {
    this.id = tile.id ?? null;
    this.element = null;
    this.subtype = tile.subtype ?? null;
    this.size = tile.size ?? Point.from(DEFAULT_DIMENSION, DEFAULT_DIMENSION);
    this.position = tile.position ?? null;
    this.startCoordinates = tile.startCoordinates ?? null;
    this.endCoordinates = tile.endCoordinates ?? null;

    this.setType(tile.type ?? null);
  }

  setId(id: string): void {
    this.id = id;
  }

  setType(trackType: TrackTileType): void {
    this.type = trackType;
  }

  setPosition(x: number, y: number): void {
    this.position = Point.from(x, y);
  }

  drawTile(trackElement?: HTMLElement) {
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

  handleClick(): void {
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

  isStartTile(): boolean {
    return this.position.x === state.startTile$.value.x && this.position.y === state.startTile$.value.y;
  }

  setStartCoordinates(direction: Direction): TrackTile {
    if (direction === Direction.NORMAL) {
      this.startCoordinates = this.getCoordinatesPoint(getBoundingPoints(this.subtype)[0]);
      this.endCoordinates = this.getCoordinatesPoint(getBoundingPoints(this.subtype)[1]);
    } else {
      this.startCoordinates = this.getCoordinatesPoint(getBoundingPoints(this.subtype)[1]);
      this.endCoordinates = this.getCoordinatesPoint(getBoundingPoints(this.subtype)[0]);
    }

    return this;
  }

  setStartCoordinatesFromPrevious(prevEndCoordinated: Point): void {
    const possiblePoints = [
      this.getCoordinatesPoint(getBoundingPoints(this.subtype)[0]),
      this.getCoordinatesPoint(getBoundingPoints(this.subtype)[1]),
    ];

    this.endCoordinates = getFurtherPoint(prevEndCoordinated, possiblePoints[0], possiblePoints[1]);

    if (this.endCoordinates.equals(possiblePoints[0])) {
      this.startCoordinates = possiblePoints[1];
    } else {
      this.startCoordinates = possiblePoints[0];
    }
  }

  getCoordinatesPoint(point: Point): Point {
    return getCoordinatesFromPositionAndRelativePoint(this.position, point);
  }

  getCopy(): TrackTileCopy {
    return {
      id: this.id,
      type: this.type,
      endCoordinates: this.endCoordinates,
      startCoordinates: this.startCoordinates,
      position: this.position,
      size: this.size,
      subtype: this.subtype,
    };
  }
}
