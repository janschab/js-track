import { TrackTileSubtype } from '../types/enum';

export function getVelocity(a, t) {
  return a * t;
}

export function getMove(a, t, v) {
  return ((t * t * a) / 2) + (v * t);
}

export function getAngle(s, r) {
  return (s * 180) / (Math.PI * r);
}

export function getFurtherPointFromMove(prevPoint, point, move) {
  let firstPoint = {
    x: point.x - move.x,
    y: point.y - move.y
  };
  let secondPoint = {
    x: point.x + move.x,
    y: point.y + move.y
  };
  return getFurtherPoint(prevPoint, point, firstPoint, secondPoint);
}

export function getFurtherPoint(prevPoint, point, firstPoint, secondPoint) {
  let firstDistance;
  let secondDistance;

  firstDistance = Math.sqrt(Math.pow(firstPoint.x - prevPoint.x, 2) + Math.pow(firstPoint.y - prevPoint.y, 2));
  secondDistance = Math.sqrt(Math.pow(secondPoint.x - prevPoint.x, 2) + Math.pow(secondPoint.y - prevPoint.y, 2));
  console.log('firstDistance', firstDistance, firstPoint);
  console.log('secondDistance', secondDistance, secondPoint);
  if (firstDistance > secondDistance) {
    return firstPoint;
  } else {
    return secondPoint;
  }
}

export function getCenterPosition(subtype) {
  switch (subtype) {
    case TrackTileSubtype.NE: {
      return {
        x: 200,
        y: 0
      };
    }
    case TrackTileSubtype.SE: {
      return {
        x: 200,
        y: 200
      };
    }
    case TrackTileSubtype.SW: {
      return {
        x: 0,
        y: 200
      };
    }
    case TrackTileSubtype.NW: {
      return {
        x: 0,
        y: 0
      };
    }
  }
}

export function degrees2radians(degrees) {
  return degrees * (Math.PI / 180);
}
