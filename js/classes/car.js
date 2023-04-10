import { getMove, getVelocity } from '../helpers/helpers';

export class Car {
  constructor(key) {
    this.key = key;
    this.element = null;
    this.position = {
      x: 50,
      y: 50
    };
    this.weight = 100;
    this.velocity = 0;
    this.acceleration = 0.0005;
    this.deceleration = 0.0009;
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

  setPosition(x, y) {
    this.position = {
      x,
      y
    };
  }

  checkThrottle(isKeyPressed, time) {
    if (isKeyPressed) {
      this.calculatePosition(this.acceleration, time);
    } else {
      if (this.velocity > 0) {
        this.calculatePosition(-this.deceleration, time);
      } else {
        this.velocity = 0;
      }
    }
  }

  calculatePosition(acceleration, time) {
    const move = getMove(acceleration, time, this.velocity);
    this.velocity = this.velocity + getVelocity(acceleration, time);

    this.setPosition(this.position.x + move, this.position.y);
    this.appendPosition();
  }
}
