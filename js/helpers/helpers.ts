import { Point } from '../classes/point';
import { DEFAULT_DIMENSION, RADIUS, STICTION_FACTOR } from '../constants/constants';
import { TrackTileSubtype } from '../types/enum';

export function getVelocity(a: number, t: number): number {
  return a * t;
}

export function getMove(a: number, t: number, v: number): number {
  return ((t * t * a) / 2) + (v * t);
}

export function getAngle(s: number, r: number): number {
  return (s * 180) / (Math.PI * r);
}

export function getFurtherPointFromMove(prevPoint: Point, point: Point, move: Point): Point {
  const firstPoint = Point.copy({
    x: point.x - move.x,
    y: point.y - move.y,
  });
  const secondPoint = Point.copy({
    x: point.x + move.x,
    y: point.y + move.y,
  });
  return getFurtherPoint(prevPoint, firstPoint, secondPoint);
}

export function getFurtherPoint(prevPoint: Point, firstPoint: Point, secondPoint: Point): Point {
  const firstDistance = Math.sqrt(Math.pow(firstPoint.x - prevPoint.x, 2) + Math.pow(firstPoint.y - prevPoint.y, 2));
  const secondDistance = Math.sqrt(Math.pow(secondPoint.x - prevPoint.x, 2) + Math.pow(secondPoint.y - prevPoint.y, 2));

  if (firstDistance > secondDistance) {
    return firstPoint;
  } else {
    return secondPoint;
  }
}

export function getCenterPosition(subtype: TrackTileSubtype): Point {
  switch (subtype) {
    case TrackTileSubtype.NE: {
      return Point.from(DEFAULT_DIMENSION, 0);
    }
    case TrackTileSubtype.SE: {
      return Point.from(DEFAULT_DIMENSION, DEFAULT_DIMENSION);
    }
    case TrackTileSubtype.SW: {
      return Point.from(0, DEFAULT_DIMENSION);
    }
    case TrackTileSubtype.NW: {
      return Point.from(0, 0);
    }
  }
  return Point.from(0, 0);
}

export function degrees2radians(degrees: number): number {
  return degrees * (Math.PI / 180);
}

export function calculateCentrifugalForce(deltaAngle: number, time: number, weight: number): number {
  return weight * ((deltaAngle / time) ** 2) * RADIUS;
}

export function calculateStiction(weight: number): number {
  return weight * STICTION_FACTOR;
}
