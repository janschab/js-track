import { getMove, getVelocity } from '../helpers/helpers';
import { state } from '../state/state';

export class Car {
  constructor(key, reverseKey) {
    this.key = key;
    this.reverseKey = reverseKey;
    this.element = null;
    this.position = {
      x: state.getStartPosition().x,
      y: state.getStartPosition().y
    };
    this.prevPosition = {
      x: state.getStartPosition().x,
      y: state.getStartPosition().y
    };
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

  setPosition(move, track) {
    const nextPosition = track.getNextPosition(this.position, this.prevPosition, move);

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
