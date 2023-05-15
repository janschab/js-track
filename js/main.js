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

game.initStorage(track);

const car = new Car('a', 'd', '#ff3e3e');
const car2 = new Car('b', 'l', '#3c5aff');
const car3 = new Car('p', 'l', '#3cff7a');
// const car4 = new Car('f', 'l', '#ecff3c');



const fc = () => {
  requestAnimationFrame(() => {
    game.tick();

    car.handleThrottle(game.getKey(car.key), game.timeDiff, track, game.getKey(car.reverseKey));
    car2.handleThrottle(game.getKey(car2.key), game.timeDiff, track, game.getKey(car2.reverseKey));
    car3.handleThrottle(game.getKey(car3.key), game.timeDiff, track, game.getKey(car3.reverseKey));
    // car4.handleThrottle(game.getKey(car4.key), game.timeDiff, track, game.getKey(car4.reverseKey));

    fc();
  });
}

fc();


