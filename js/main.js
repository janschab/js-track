import { Car } from './classes/car';
import { Game } from './classes/game';
import { Track } from './classes/track';

let fromStorage = null;

try {
  fromStorage = JSON.parse(localStorage.getItem('track'))
} catch (e) {
}

const game = new Game();

const car = new Car('f');

const track = fromStorage ? Track.fromStorage(fromStorage) : Track.fromDefaults(4, 2);

game.initStorage(track);

const fc = () => {
  requestAnimationFrame(() => {
    game.tick();

    car.checkThrottle(game.getKey(car.key), game.timeDiff);

    fc();
  });
}

fc();


