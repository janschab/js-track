import { Point } from '../classes/point';
import { DEFAULT_DIMENSION } from '../constants/constants';
import { TrackTileSubtype, TrackTileType } from '../types/enum';
import { degrees2radians, getAngle, getCenterPosition, getFurtherPoint, getFurtherPointFromMove } from './helpers';

/**
 * @param {{x: number, y: number}} position
 * @param {{x: number, y: number}} prevPosition
 * @param {number} move
 * @param {TrackTile} currentTile
 * @return {NextPosition}
 */
export function getNextPosition(position, prevPosition, move, currentTile) {
  /**
   * @type {NextPosition}
   */
  let res = {
    x: position.x,
    y: position.y,
    out: false
  };

  if (currentTile.type === TrackTileType.STRAIGHT) {
    return calculateStraightPosition(currentTile, position, prevPosition, move, res);
  } else {
    return calculateTurnPosition(currentTile, position, prevPosition, move, res);
  }
}

/**
 * @param {TrackTile} currentTile
 * @param {Point} position
 * @param {Point} prevPosition
 * @param {number} move
 * @param {NextPosition} res
 * @return {NextPosition}
 */
function calculateStraightPosition(currentTile, position, prevPosition, move, res) {
  if (currentTile.subtype === TrackTileSubtype.HORIZONTAL) {
    let point = getFurtherPointFromMove(prevPosition, position, Point.from(move, 0));

    return {
      x: point.x,
      y: point.y,
      out: false,
      angle: 0,
    };
  }
  if (currentTile.subtype === TrackTileSubtype.VERTICAL) {
    let point = getFurtherPointFromMove(prevPosition, position, Point.from(0, move));
    return {
      x: point.x,
      y: point.y,
      out: false,
      angle: 90,
    };
  }
}

/**
 * @param {TrackTile} currentTile
 * @param {Point} position
 * @param {Point} prevPosition
 * @param {number} move
 * @param {NextPosition} res
 * @return {NextPosition}
 */
function calculateTurnPosition(currentTile, position, prevPosition, move, res) {
  const relativePosition = {
    x: position.x - currentTile.position.x * DEFAULT_DIMENSION,
    y: position.y - currentTile.position.y * DEFAULT_DIMENSION
  };

  const relativePrevPosition = {
    x: prevPosition.x - currentTile.position.x * DEFAULT_DIMENSION,
    y: prevPosition.y - currentTile.position.y * DEFAULT_DIMENSION
  };

  let centerPosition = getCenterPosition(currentTile.subtype);

  let cartesianPosition = Point.from(
    relativePosition.x - centerPosition.x,
    centerPosition.y - relativePosition.y,
  );
  let cartesianPrevPosition = Point.from(
    relativePrevPosition.x - centerPosition.x,
    centerPosition.y - relativePrevPosition.y,
  );

  let currentAngle = Math.atan2(cartesianPosition.y, cartesianPosition.x) * 180 / Math.PI;

  const firstDegree = currentAngle + getAngle(move, DEFAULT_DIMENSION / 2);
  const secondDegree = currentAngle - getAngle(move, DEFAULT_DIMENSION / 2);

  const firstPoint = Point.from(
    Math.cos(degrees2radians(firstDegree)) * 100,
    Math.sin(degrees2radians(firstDegree)) * 100
  );

  const secondPoint = Point.from(
    Math.cos(degrees2radians(secondDegree)) * 100,
    Math.sin(degrees2radians(secondDegree)) * 100
  );

  const point = getFurtherPoint(cartesianPrevPosition, cartesianPosition, firstPoint, secondPoint);

  let angle;

  if (firstPoint === point) {
    angle = firstDegree;
  } else {
    angle = secondDegree;
  }

  res = {
    x: (point.x + centerPosition.x) + currentTile.position.x * DEFAULT_DIMENSION,
    y: (-point.y + centerPosition.y) + currentTile.position.y * DEFAULT_DIMENSION,
    out: false,
    angle: 90 - angle
  };

  return res;
}
