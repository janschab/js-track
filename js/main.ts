import {Car} from './classes/car';
import {Game} from './classes/game';
import {Track, TrackCopy} from './classes/track';
import {state as gameState} from './state/state';
import {Config, ConfigCar} from "./classes/config";

export class TrackMania {
  private config: Config;
  private game: Game | null = null;
  private track: Track | null = null;
  private cars: Car[] = [];
  private isStarted: boolean = false;
  private elementHTML: HTMLElement;
  private timeCallback: (time: number, times: Array<number>) => void;

  constructor(config: Config) {
    this.config = config;
  }

  public init(elementHTML, timeCallback: (time: number, times: Array<number>) => void = () => {}) {
    this.elementHTML = elementHTML;
    this.game = new Game();
    this.timeCallback = timeCallback;
  }

  public race() {
    this.isStarted = true;
    this.fc();
  }

  public stop() {
    this.isStarted = false;
  }

  public setTrack(track: TrackCopy): Track {
    if (this.track) {
      this.track.destroy()
    }
    this.track = Track.fromStorage(track, this.elementHTML);

    return this.track;
  }

  public newTrack(sizeX: number, sizeY: number): Track {
    if (this.track) {
      this.track.destroy()
    }
    this.track = Track.fromDefaults(sizeX, sizeY, this.elementHTML);

    return this.track;
  }

  public setCars(cars: ConfigCar[]) {
    this.cars = cars.map((carConfig) => new Car(carConfig.key, null, carConfig.color, this.elementHTML))
  }

  public toggleDirectionMode(state: boolean): void {
    gameState.toggleDirectionMode(state);
  }

  private fc() {
    requestAnimationFrame(() => {
      this.game.tick();

      this.cars.forEach(car => {
        car.handleThrottle(this.game.getKey(car.key), this.game.timeDiff, this.track, this.timeCallback);
      });

      if (this.isStarted) {
        this.fc();
      }
    });
  }
}
