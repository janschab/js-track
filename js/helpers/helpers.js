export function getVelocity(a, t) {
  return a * t;
}

export function getMove(a, t, v) {
  return ((t * t * a) / 2) + (v * t);
}
