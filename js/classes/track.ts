import { DEFAULT_DIMENSION } from '../constants/constants';
import { generateUUID } from '../helpers/generateUUID';
import { state } from '../state/state';
import { Direction } from '../types/enum';
import { Point } from './point';
import { TrackTile, TrackTileCopy } from './track-element';

export interface TrackCopy {
  startTile: Point | null;
  direction: Direction;
  size: Point;
  tiles: Record<string, TrackTileCopy>;
}

export class Track {
  public startTile: Point | null;
  public direction: Direction;
  public trackElement: null | HTMLElement;
  public size: Point;
  public tiles: Record<string, TrackTile>;

  constructor(
    sizeX: number,
    sizeY: number,
    elementHTML: HTMLElement,
    tiles?: Record<string, TrackTileCopy>,
    startTile?,
    direction?,
  ) {
    this.startTile = startTile;
    this.direction = direction;
    this.trackElement = null;
    this.size = Point.from(sizeX, sizeY);
    this.tiles = {};

    this.init(tiles);
    this.drawTrack(elementHTML);
  }

  static fromStorage(track: TrackCopy, elementHTML: HTMLElement): Track {
    return new Track(track.size.x, track.size.y, elementHTML, track.tiles, track.startTile, track.direction);
  }

  static fromDefaults(sizeX: number, sizeY: number, elementHTML: HTMLElement): Track {
    return new Track(sizeX, sizeY, elementHTML);
  }

  addTile(trackTile: TrackTile): void {
    if (!trackTile.id) {
      trackTile.setId(generateUUID());
    }

    this.tiles[trackTile.id] = trackTile;
  }

  init(tiles: Record<string, TrackTileCopy>): void {
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

    if (this.direction) {
      state.direction$.next(this.direction);
    }
    if (this.startTile) {
      state.startTile$.next(this.startTile);
    }

    state.startTile$.subscribe((point) => {
      this.startTile = point;
      this.calculateDirection();
    });

    state.direction$.subscribe((direction) => {
      this.direction = direction;
      this.calculateDirection();
    });
  }

  drawTrack(elementHTML) {
    this.trackElement = document.createElement('div');
    this.trackElement.classList.add('track');
    this.trackElement.style.width = this.size.x * DEFAULT_DIMENSION + 'px';
    elementHTML.appendChild(this.trackElement);

    Object.values(this.tiles).forEach((tile) => {
      tile.drawTile(this.trackElement);
    });

    console.log('draw track');
  }

  getCopy(): TrackCopy {
    return {
      startTile: this.startTile,
      direction: this.direction,
      size: this.size,
      tiles: Object.entries(this.tiles).reduce((previousValue, [key, value]) => {
        return {
          ...previousValue,
          [key]: value.getCopy(),
        };
      }, {}),
    };
  }

  /**
   *
   * @param {Point} coordinates
   * @return {TrackTile}
   */
  getTileFromCoordinates(coordinates) {
    return Object.values(this.tiles).find((tile) => {
      return (coordinates.x <
             ((tile.position.x + 1) * DEFAULT_DIMENSION) &&
             coordinates.x >=
             (tile.position.x * DEFAULT_DIMENSION)) &&
             (coordinates.y <
             ((tile.position.y + 1) * DEFAULT_DIMENSION) &&
             coordinates.y >=
             (tile.position.y * DEFAULT_DIMENSION));
    });
  }

  /**
   * @return TrackTile
   */
  getTileFromPosition(position) {
    return Object.values(this.tiles).find((tile) => {
      return position.x < (tile.position.x + 1) && position.x >= (tile.position.x) &&
             (position.y < tile.position.y + 1 && position.y >= tile.position.y);
    });
  }

  calculateDirection() {
    if (this.trackElement) {
      const startTile = this.getTileFromPosition(state.startTile$.value).setStartCoordinates(state.direction$.value);

      startTile.drawTile(this.trackElement);

      let prevTile = startTile;
      let tile = this.getTileFromCoordinates(startTile.endCoordinates);

      try {
        while (!tile.isStartTile()) {
          tile.setStartCoordinatesFromPrevious(prevTile.endCoordinates);
          tile.drawTile(this.trackElement);

          prevTile = tile;
          tile = this.getTileFromCoordinates(prevTile.endCoordinates);
        }
      } catch (e) {
        alert('fix the track');
      }
    }
  }

  destroy() {
    this.trackElement.parentElement.removeChild(this.trackElement);
  }
}
