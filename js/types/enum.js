/**
 * @readonly
 * @enum {{BEND: number, STRAIGHT: number}}
 */
export const TrackTileType = {
  STRAIGHT: 0,
  BEND: 1,
}

/**
 * @readonly
 * @enum {{SE: number, VERTICAL: number, SW: number, NE: number, NW: number, HORIZONTAL: number}}
 */
export const TrackTileSubtype = {
  VERTICAL: 0,
  HORIZONTAL: 1,
  NE: 2,
  SE: 3,
  SW: 4,
  NW: 5,
}

/**
 * @readonly
 * @enum {{OPPOSITE: number, NORMAL: number}}
 */
export const Direction = {
  NORMAL: 1,
  OPPOSITE: -1,
}
