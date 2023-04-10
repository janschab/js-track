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
    const button = document.createElement('button');

    button.innerText = 'Save track';
    button.classList.add('save-button');
    button.addEventListener('click', () => {
      localStorage.setItem('track', JSON.stringify(track.getCopy()));
    });

    document.body.appendChild(button);
  }
}
