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

      if (state.editMode) {
        this.element.addEventListener('click', () => {
          this.handleClick();
        });
      }
    }
    if (this.type != null && this.subtype != null) {
      this.element.className = 'track-tile track-tile--' + this.type + this.subtype;
    } else {
      this.element.className = 'track-tile';
    }
    if (this.endCoordinates && this.isStartTile()) {
      let startPointElement = document.querySelector('.start-point') as HTMLElement;
      if (!startPointElement) {
        startPointElement = document.createElement('div');
        startPointElement.className = 'start-point';
        trackElement.appendChild(startPointElement);
      }
      startPointElement.style.top = this.endCoordinates.y + 'px';
      startPointElement.style.left = this.endCoordinates.x + 'px';

      const sx = this.startCoordinates.x;
      const sy = this.startCoordinates.y;
      const ex = this.endCoordinates.x;
      const ey = this.endCoordinates.y;
      let direction = this.getStartingPointDirection(
        sx, sy, ex, ey
      );

      startPointElement.className = `start-point start-point--${direction}`;
    }
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
    } else if (this.type === null) {
      this.type = TrackTileType.STRAIGHT;
      this.subtype = TrackTileSubtype.HORIZONTAL;
    } else {
      this.type = null;
      this.subtype = null;
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

  private getStartingPointDirection(sx: number, sy: number, ex: number, ey: number) {
    switch (this.subtype) {
      case TrackTileSubtype.HORIZONTAL: {
        if (ex > sx) {
          return 'right';
        }
        return 'left';
      }
      case TrackTileSubtype.VERTICAL: {
        if (ey > sy) {
          return 'down';
        }
        return 'up';
      }
      case TrackTileSubtype.NE: {
        if (ex > sx) {
          return 'right';
        }
        return 'up';
      }
      case TrackTileSubtype.SE: {
        if (ex > sx) {
          return 'right';
        }
        return 'down';
      }
      case TrackTileSubtype.NW: {
        if (ex < sx) {
          return 'left';
        }
        return 'up';
      }
      case TrackTileSubtype.SW: {
        if (ex < sx) {
          return 'left';
        }
        return 'down';
      }
    }
  }
}
