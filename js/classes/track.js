import { DEFAULT_DIMENSION } from '../constants/constants';
import { generateUUID } from '../helpers/generateUUID';
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

  getCopy() {
    return {
      size: this.size,
      tiles: this.tiles
    };
  }

  getTileFromPosition(position) {
    return Object.values(this.tiles).find((tile) => {
      return (position.x < ((tile.position.x + 1) * DEFAULT_DIMENSION) && position.x >= (tile.position.x * DEFAULT_DIMENSION)) &&
             (position.y < ((tile.position.y + 1) * DEFAULT_DIMENSION) && position.y >= (tile.position.y * DEFAULT_DIMENSION));
    });
  }
}
