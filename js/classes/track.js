import { DEFAULT_DIMENSION } from '../constants/constants';
import { generateUUID } from '../helpers/generateUUID';
import { state } from '../state/state';
import { TrackTile } from './track-element';

export class Track {
  constructor(sizeX, sizeY, tiles, startTile, direction) {
    this.startTile = startTile;
    this.direction = direction;
    this.trackElement = null;
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
    return new Track(track.size.x, track.size.y, track.tiles, track.startTile, track.direction);
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

  drawTrack() {
    this.trackElement = document.createElement('div');
    this.trackElement.classList.add('track');
    this.trackElement.style.width = this.size.x * DEFAULT_DIMENSION + 'px';
    document.body.appendChild(this.trackElement);

    Object.values(this.tiles).forEach((tile) => {
      tile.drawTile(this.trackElement);
    });

    console.log('draw track');
  }

  getCopy() {
    return {
      startTile: this.startTile,
      direction: this.direction,
      size: this.size,
      tiles: this.tiles
    };
  }

  /**
   *
   * @param {Point} coordinates
   * @return {TrackTile}
   */
  getTileFromCoordinates(coordinates) {
    return Object.values(this.tiles).find((tile) => {
      return (coordinates.x < ((tile.position.x + 1) * DEFAULT_DIMENSION) && coordinates.x >= (tile.position.x * DEFAULT_DIMENSION)) &&
             (coordinates.y < ((tile.position.y + 1) * DEFAULT_DIMENSION) && coordinates.y >= (tile.position.y * DEFAULT_DIMENSION));
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
}
