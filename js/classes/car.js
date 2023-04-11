import { SLIPPING_DECELERATION } from '../constants/constants';
import { calculateCentrifugalForce, calculateStiction, getMove, getVelocity } from '../helpers/helpers';
import { getNextPosition } from '../helpers/positionCalculator';
import { state } from '../state/state';
import { Point } from './point';

export class Car {
  constructor(key, reverseKey, color) {
    this.key = key;
    this.reverseKey = reverseKey;
    this.element = null;

    this.position = new Point(state.getStartPosition().x, state.getStartPosition().y);
    this.prevPosition = new Point(state.getStartPosition().x, state.getStartPosition().y);
    this.outPosition = null;
    this.outPrevPosition = null;

    this.isSlipping = false;

    this.weight = 100;
    this.stiction = calculateStiction(this.weight);
    this.velocity = 0;
    this.acceleration = 0.0007;
    this.deceleration = 0.0014;
    this.angle = 0;
    this.color = color;

    this.init();
    this.drawCar();
  }

  init() {
    this.element = document.createElement('div');
    this.element.classList.add('car');
    this.element.style.setProperty('--car-color', this.color);
    document.body.appendChild(this.element);
  }

  drawCar() {
    this.element.style.top = this.position.y + 'px';
    this.element.style.left = this.position.x + 'px';
    this.element.style.rotate = this.angle + 'deg';
  }

  /**
   * @param {NextPosition} nextPosition
   */
  setPosition(nextPosition) {

    this.prevPosition.x = this.position.x;
    this.prevPosition.y = this.position.y;

    this.position = {
      x: nextPosition.x,
      y: nextPosition.y,
    };

    this.angle = nextPosition.angle;
  }

  handleThrottle(isKeyPressed, time, track) {
    if (this.isSlipping) {
      if (this.velocity <= 0) {
        this.isSlipping = false;
        this.position = Point.copy(this.outPosition);
        this.prevPosition = Point.copy(this.outPrevPosition);
        this.outPosition = null;
        this.outPrevPosition = null;
        isKeyPressed = true;
      } else {
        this.calculateSlippingPosition(time);
        return;
      }
    }
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
    const nextPosition = getNextPosition(this.position, this.prevPosition, move, track.getTileFromPosition(this.position), false);
    const centrifugalForce = calculateCentrifugalForce(nextPosition.deltaAngle, time, this.weight);

    this.stictionDelta = this.stiction - centrifugalForce;
    const isSlipping = this.stictionDelta < 0;

    if (isSlipping) {
      this.handleSlipping(time);
      return;
    }

    this.velocity += getVelocity(acceleration, time);
    this.setPosition(nextPosition);
    this.drawCar();
  }

  handleSlipping(time) {
    this.isSlipping = true;
    this.outPosition = Point.copy(this.position);
    this.outPrevPosition = Point.copy(this.prevPosition);

    this.calculateSlippingPosition(time)
  }

  calculateSlippingPosition(time) {
    const move = getMove(SLIPPING_DECELERATION, time, this.velocity);
    const nextPosition = getNextPosition(this.position, this.prevPosition, move, null, true);
    nextPosition.angle = this.angle;

    this.velocity += getVelocity(SLIPPING_DECELERATION, time);

    this.setPosition(nextPosition);
    this.drawCar();
  }
}
