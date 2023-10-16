import { Track } from './track';

export interface ConfigCar {
  key: string;
  color: string;
}

export interface Config {
  cars: ConfigCar[];
  track: Track[];
}
