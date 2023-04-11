import { DEFAULT_DIMENSION } from '../constants/constants';
import { state } from '../state/state';
import { TrackTileSubtype, TrackTileType } from '../types/enum';

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
      y: DEFAULT_DIMENSION,
    }
    this.position = tile.position ?? null;
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
    this.position = { x, y };
  }

  drawTile(trackElement) {
    if (!this.element) {
      this.element = document.createElement('div');
      this.element.classList.add('track-tile');
      this.element.style.width = this.size.x + 'px'
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
  }

  handleClick() {
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
}
