import { Car } from './classes/car';
import { Game } from './classes/game';
import { Track } from './classes/track';
import { state } from './state/state';

let fromStorage = null;

try {
  fromStorage = JSON.parse(localStorage.getItem('track'))
} catch (e) {
}

const game = new Game();

const track = fromStorage ? Track.fromStorage(fromStorage) : Track.fromDefaults(4, 2);

const car = new Car('f');


game.initStorage(track);

const fc = () => {
  requestAnimationFrame(() => {
    game.tick();

    car.handleThrottle(game.getKey(car.key), game.timeDiff, track);

    fc();
  });
}

fc();


