import { Car } from './classes/car';
import { ConfigCar } from './classes/config';
import { Game } from './classes/game';
import { Track, TrackCopy } from './classes/track';
import { state as gameState } from './state/state';

export class TrackMania {
  private game: Game | null = null;
  private track: Track | null = null;
  private cars: Car[] = [];
  private isStarted: boolean = false;
  private elementHTML: HTMLElement;
  private timeCallback: (time: number, times: Array<number>) => void;

  public init(elementHTML: HTMLElement, timeCallback: (time: number, times: Array<number>) => void, editMode: boolean = false): void {
    gameState.editMode = editMode;
    this.elementHTML = elementHTML;
    this.game = new Game();
    this.timeCallback = timeCallback ?? (() => {
    });
  }

  public race(): void {
    this.isStarted = true;
    this.animationLoop();
  }

  public stop(): void {
    this.isStarted = false;
  }

  public setTrack(track: TrackCopy): Track {
    if (this.track) {
      this.track.destroy();
    }
    this.track = Track.fromStorage(track, this.elementHTML);

    return this.track;
  }

  public newTrack(sizeX: number, sizeY: number): Track {
    if (this.track) {
      this.track.destroy();
    }
    this.track = Track.fromDefaults(sizeX, sizeY, this.elementHTML);

    return this.track;
  }

  public setCars(cars: ConfigCar[]): void {
    this.cars = cars.map((carConfig) => new Car(carConfig.key, null, carConfig.color, this.elementHTML));
  }

  public toggleDirectionMode(state: boolean): void {
    gameState.toggleDirectionMode(state);
  }

  private animationLoop(): void {
    requestAnimationFrame(() => {
      this.game.tick();

      this.cars.forEach(car => {
        car.handleThrottle(this.game.getKey(car.key), this.game.timeDiff, this.track, this.timeCallback);
      });

      if (this.isStarted) {
        this.animationLoop();
      }
    });
  }

  setTouchThrottle(values: Record<string, boolean>) {
    this.game.touchThrottle = values;
  }
}
