import { NextPosition } from '../classes/nextPosition';
import { Point } from '../classes/point';
import { TrackTile } from '../classes/track-element';
import { DEFAULT_DIMENSION, RADIUS } from '../constants/constants';
import { TrackTileSubtype, TrackTileType } from '../types/enum';
import { degrees2radians, getAngle, getCenterPosition, getFurtherPoint, getFurtherPointFromMove } from './helpers';

export function getNextPosition(position: Point,
  prevPosition: Point,
  move: number,
  currentTile: TrackTile,
  isSlipping: boolean,
): NextPosition {
  if (isSlipping) {
    return calculateSlippingPosition(position, prevPosition, move);
  }

  if (currentTile.type === TrackTileType.STRAIGHT) {
    return calculateStraightPosition(currentTile, position, currentTile.startCoordinates, move);
  } else {
    return calculateTurnPosition(currentTile, position, currentTile.startCoordinates, move);
  }
}

function calculateSlippingPosition(position: Point, prevPosition: Point, move: number): NextPosition {
  let delta = Point.from(position.x - prevPosition.x, position.y - prevPosition.y);
  let angle = Math.atan2(delta.y, delta.x);
  let x = Math.cos(angle) * move;
  let y = Math.sin(angle) * move;

  let point = getFurtherPointFromMove(prevPosition, position, Point.from(x, y));

  return NextPosition.fromPosition({
    x: point.x,
    y: point.y,
    deltaAngle: 0,
    angle: 0,
  });
}


function calculateStraightPosition(
  currentTile: TrackTile,
  position: Point,
  prevPosition: Point,
  move: number,
): NextPosition {
  if (currentTile.subtype === TrackTileSubtype.HORIZONTAL) {
    let point = getFurtherPointFromMove(prevPosition, position, Point.from(move, 0));

    return NextPosition.fromPosition({
      x: point.x,
      y: point.y,
      deltaAngle: 0,
      angle: 0,
    });
  }
  if (currentTile.subtype === TrackTileSubtype.VERTICAL) {
    let point = getFurtherPointFromMove(prevPosition, position, Point.from(0, move));
    return NextPosition.fromPosition({
      x: point.x,
      y: point.y,
      deltaAngle: 0,
      angle: 90,
    });
  }
}

function calculateTurnPosition(currentTile: TrackTile,
  position: Point,
  prevPosition: Point,
  move: number,
): NextPosition {
  const relativePosition = {
    x: position.x - currentTile.position.x * DEFAULT_DIMENSION,
    y: position.y - currentTile.position.y * DEFAULT_DIMENSION,
  };

  const relativePrevPosition = {
    x: prevPosition.x - currentTile.position.x * DEFAULT_DIMENSION,
    y: prevPosition.y - currentTile.position.y * DEFAULT_DIMENSION,
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

  const firstDegree = currentAngle + getAngle(move, RADIUS);
  const secondDegree = currentAngle - getAngle(move, RADIUS);

  const firstPoint = Point.from(
    Math.cos(degrees2radians(firstDegree)) * RADIUS,
    Math.sin(degrees2radians(firstDegree)) * RADIUS,
  );

  const secondPoint = Point.from(
    Math.cos(degrees2radians(secondDegree)) * RADIUS,
    Math.sin(degrees2radians(secondDegree)) * RADIUS,
  );
  const point = getFurtherPoint(cartesianPrevPosition, firstPoint, secondPoint);

  let angle: number;

  if (firstPoint === point) {
    angle = firstDegree;
  } else {
    angle = secondDegree;
  }

  return NextPosition.fromPosition({
    x: (point.x + centerPosition.x) + currentTile.position.x * DEFAULT_DIMENSION,
    y: (-point.y + centerPosition.y) + currentTile.position.y * DEFAULT_DIMENSION,
    deltaAngle: Math.abs(currentAngle - angle),
    angle: 90 - angle,
  });
}

export function getCoordinatesFromPositionAndRelativePoint(position: Point, relativePoint: Point): Point {
  return Point.from(position.x * DEFAULT_DIMENSION + relativePoint.x, position.y * DEFAULT_DIMENSION + relativePoint.y);
}
