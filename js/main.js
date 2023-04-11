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

const track = fromStorage ? Track.fromStorage(fromStorage) : Track.fromDefaults(state.size.x, state.size.y);

const car = new Car('f', 'd', '#ff3e3e');
const car2 = new Car('k', 'l', '#3c5aff');


game.initStorage(track);

const fc = () => {
  requestAnimationFrame(() => {
    game.tick();

    car.handleThrottle(game.getKey(car.key), game.timeDiff, track, game.getKey(car.reverseKey));
    car2.handleThrottle(game.getKey(car2.key), game.timeDiff, track, game.getKey(car2.reverseKey));

    fc();
  });
}

fc();


