import { Duration } from 'luxon';
import {
  DEFAULT_ACCELERATION,
  DEFAULT_DECELERATION,
  DEFAULT_WEIGHT,
  SLIPPING_DECELERATION,
} from '../constants/constants';
import { createElement } from '../helpers/$';
import { calculateCentrifugalForce, calculateStiction, getMove, getVelocity } from '../helpers/helpers';
import { getNextPosition } from '../helpers/positionCalculator';
import { state } from '../state/state';
import { NextPosition } from './nextPosition';
import { Point } from './point';
import { Track } from './track';
import { TrackTile } from './track-element';

export class Car {
  public key: string;
  public reverseKey: string;
  public element: HTMLElement;
  public coordinates: Point;
  public prevCoordinates: Point;
  public outPosition: Point | null;
  public outPrevPosition: Point | null;
  public isSlipping: boolean;
  public weight: number;
  public stiction: number;
  public velocity: number;
  public acceleration: number;
  public deceleration: number;
  public angle: number;
  public color: string;
  public roundTimestamps: number[];
  public prevTile: TrackTile | null;
  public timeDisplayElement: HTMLElement;

  constructor(key: string, reverseKey: string, color: string, elementHTML: HTMLElement) {
    this.key = key;
    this.reverseKey = reverseKey;
    this.color = color;
    this.element = null;

    this.coordinates = new Point(state.getStartPosition().x, state.getStartPosition().y);
    this.prevCoordinates = new Point(state.getStartPosition().x, state.getStartPosition().y);
    this.outPosition = null;
    this.outPrevPosition = null;

    this.isSlipping = false;

    this.weight = DEFAULT_WEIGHT;
    this.stiction = calculateStiction(this.weight);
    this.velocity = 0;
    this.acceleration = DEFAULT_ACCELERATION;
    this.deceleration = DEFAULT_DECELERATION;
    this.angle = 0;

    this.roundTimestamps = [];
    this.prevTile = null;

    this.init(elementHTML);
    this.drawCar();
  }

  init(elementHTML: HTMLElement): void {
    this.element = document.createElement('div');
    this.element.classList.add('car');
    this.element.style.setProperty('--car-color', this.color);
    elementHTML.appendChild(this.element);

    this.initTimeDisplay();
  }

  drawCar() {
    this.element.style.top = this.coordinates.y + 'px';
    this.element.style.left = this.coordinates.x + 'px';
    this.element.style.rotate = this.angle + 'deg';
  }

  setPosition(nextPosition: NextPosition): void {
    this.prevCoordinates.x = this.coordinates.x;
    this.prevCoordinates.y = this.coordinates.y;

    this.coordinates = Point.from(nextPosition.x, nextPosition.y);

    this.angle = nextPosition.angle;
  }

  handleThrottle(
    isKeyPressed: boolean,
    time: number,
    track: Track,
    timeCallback: (time: number, times: Array<number>) => void,
  ): void {
    this.runTimeCallback(track, timeCallback);

    if (this.isSlipping) {
      if (this.velocity <= 0) {
        this.returnToPositionBeforeSlipping();
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

  calculatePosition(acceleration: number, time: number, track: Track): void {
    const move = getMove(acceleration, time, this.velocity);
    const nextPosition = getNextPosition(
      this.coordinates,
      this.prevCoordinates,
      move,
      track.getTileFromCoordinates(this.coordinates),
      false,
    );
    const centrifugalForce = calculateCentrifugalForce(nextPosition.deltaAngle, time, this.weight);
    const stictionDelta = this.stiction - centrifugalForce;
    const isSlipping = stictionDelta < 0;

    if (isSlipping) {
      this.startSlipping(time);
      return;
    }

    this.velocity += getVelocity(acceleration, time);
    this.setPosition(nextPosition);
    this.drawCar();
  }

  startSlipping(time: number): void {
    this.isSlipping = true;
    this.outPosition = Point.copy(this.coordinates);
    this.outPrevPosition = Point.copy(this.prevCoordinates);

    this.calculateSlippingPosition(time);
  }

  calculateSlippingPosition(time: number): void {
    const move = getMove(SLIPPING_DECELERATION, time, this.velocity);
    const nextPosition = getNextPosition(this.coordinates, this.prevCoordinates, move, null, true);
    nextPosition.angle = this.angle;

    this.velocity += getVelocity(SLIPPING_DECELERATION, time);

    this.setPosition(nextPosition);
    this.drawCar();
  }

  runTimeCallback(track: Track, timeCallback: (time: number, times: Array<number>) => void): void {
    const tile = track.getTileFromCoordinates(this.coordinates);

    if (!this.isSlipping) {
      if (tile && tile.isStartTile()) {
        this.prevTile = tile;
      } else {
        if (this.prevTile && this.prevTile.isStartTile()) {
          this.roundTimestamps.push(Date.now());
          timeCallback(this.roundTimestamps[this.roundTimestamps.length - 1], this.roundTimestamps);
        }
        this.prevTile = null;
      }
    }

    this.drawTimes();
  }

  initTimeDisplay(): void {
    if (document.querySelector('.time-wrapper')) {
      this.timeDisplayElement = createElement('div', document.querySelector('.time-wrapper'), 'time-display');
    }
  }

  drawTimes(): void {
    let text = '';

    if (this.roundTimestamps.length) {
      const time: string = Duration
        .fromMillis(Date.now() - this.roundTimestamps[this.roundTimestamps.length - 1])
        .toFormat('s.S');

      text += `<b style="color:${this.color}">${time}</b>`;
      text += '<br>';
    }

    if (this.roundTimestamps.length > 1) {
      [...this.roundTimestamps].reverse().forEach((time, index, array) => {
        if (index > 0) {
          text += (array.length - index) + ': ' + Duration.fromMillis(array[index - 1] - time).toFormat('s.S');
          text += '<br>';
        }
      });
    }

    if (this.timeDisplayElement) {
      this.timeDisplayElement.innerHTML = text;
    }
  }

  private returnToPositionBeforeSlipping(): void {
    this.isSlipping = false;
    this.coordinates = Point.copy(this.outPosition);
    this.prevCoordinates = Point.copy(this.outPrevPosition);
    this.outPosition = null;
    this.outPrevPosition = null;
  }
}
