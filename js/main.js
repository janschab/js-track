import { Car } from './classes/car';
import { Game } from './classes/game';
import { Track } from './classes/track';

const game = new Game();

const car = new Car('f');

const track = new Track();

const fc = () => {
  requestAnimationFrame(() => {
    game.tick();

    car.checkThrottle(game.getKey(car.key), game.timeDiff);

    fc();
  });
}

fc();


