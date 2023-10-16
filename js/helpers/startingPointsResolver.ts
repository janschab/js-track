import { Point } from '../classes/point';
import { DEFAULT_DIMENSION } from '../constants/constants';
import { TrackTileSubtype } from '../types/enum';

export function getBoundingPoints(subtype: TrackTileSubtype): [Point, Point] {
  switch (subtype) {
    case TrackTileSubtype.HORIZONTAL:
      return [
        Point.from(-1, DEFAULT_DIMENSION / 2),
        Point.from(DEFAULT_DIMENSION + 1, DEFAULT_DIMENSION / 2),
      ];
    case TrackTileSubtype.VERTICAL:
      return [
        Point.from(DEFAULT_DIMENSION / 2, -1),
        Point.from(DEFAULT_DIMENSION / 2, DEFAULT_DIMENSION + 1),
      ];
    case TrackTileSubtype.NE:
      return [
        Point.from(DEFAULT_DIMENSION / 2, -1),
        Point.from(DEFAULT_DIMENSION + 1, DEFAULT_DIMENSION / 2),
      ];
    case TrackTileSubtype.SE:
      return [
        Point.from(DEFAULT_DIMENSION / 2, DEFAULT_DIMENSION + 1),
        Point.from(DEFAULT_DIMENSION + 1, DEFAULT_DIMENSION / 2),
      ];
    case TrackTileSubtype.SW:
      return [
        Point.from(DEFAULT_DIMENSION / 2, DEFAULT_DIMENSION + 1),
        Point.from(-1, DEFAULT_DIMENSION / 2),
      ];
    case TrackTileSubtype.NW:
      return [
        Point.from(DEFAULT_DIMENSION / 2, -1),
        Point.from(-1, DEFAULT_DIMENSION / 2),
      ];
  }
}
