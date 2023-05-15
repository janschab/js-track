import { createElement } from '../helpers/$';
import { state } from '../state/state';

export class Game {
  constructor() {
    this.keys = {};

    this.time = Date.now();
    this.timeDiff = 1000;

    document.body.addEventListener('keydown', (e) => {
      this.keys[e.key] = true;
    });
    document.body.addEventListener('keyup', (e) => {
      this.keys[e.key] = false;
    });
  }

  getKey(key) {
    return this.keys[key];
  }

  tick() {
    this.timeDiff = Date.now() - this.time;
    this.time = Date.now();
  }

  initStorage(track) {
    createElement('button', document.body, 'save-button', {
      innerText: 'Save track'
    }).addEventListener('click', () => {
      localStorage.setItem('track', JSON.stringify(track.getCopy()));
    });

    createElement('button', document.body, 'reset-button', {
      innerText: 'Reset'
    }).addEventListener('click', () => {
      localStorage.removeItem('track');
    });

    createElement('button', document.body, 'start-button', {
      innerText: 'Set start and direction'
    }).addEventListener('click', () => {
      state.toggleDirectionMode();
    });

    createElement('div', document.body, 'time-wrapper');
  }
}
