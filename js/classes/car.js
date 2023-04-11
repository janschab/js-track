import { getMove, getVelocity } from '../helpers/helpers';
import { getNextPosition } from '../helpers/positionCalculator';
import { state } from '../state/state';
import { Point } from './point';

export class Car {
  constructor(key, reverseKey) {
    this.key = key;
    this.reverseKey = reverseKey;
    this.element = null;

    this.position = new Point(state.getStartPosition().x, state.getStartPosition().y);
    this.prevPosition = new Point(state.getStartPosition().x, state.getStartPosition().y);
    this.outPosition = null;

    this.weight = 100;
    this.velocity = 0;
    this.acceleration = 0.0007;
    this.deceleration = 0.0012;
    this.angle = 0;

    this.init();
    this.appendPosition();
  }

  init() {
    this.element = document.createElement('div');
    this.element.classList.add('car');
    document.body.appendChild(this.element);
  }

  appendPosition() {
    this.element.style.top = this.position.y + 'px';
    this.element.style.left = this.position.x + 'px';
  }

  /**
   * @param {number} move
   * @param {Track} track
   */
  setPosition(move, track) {
    const nextPosition = getNextPosition(this.position, this.prevPosition, move, track.getTileFromPosition(this.position));

    this.prevPosition.x = this.position.x;
    this.prevPosition.y = this.position.y;

    this.position = {
      x: nextPosition.x,
      y: nextPosition.y,
    };
  }

  handleThrottle(isKeyPressed, time, track) {
    if (isKeyPressed) {
      this.calculatePosition(this.acceleration, time, track);
    } else {
      if (this.velocity > 0) {
        this.calculatePosition(-this.deceleration, time, track);
      } else {
        this.velocity = 0;
      }
    }
  }

  calculatePosition(acceleration, time, track) {
    const move = getMove(acceleration, time, this.velocity);
    this.velocity = this.velocity + getVelocity(acceleration, time);

    this.setPosition(move, track);
    this.appendPosition();
  }
}
