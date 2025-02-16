export class Game {
  public keys: Record<string, boolean>;
  public time: number;
  public timeDiff: number;
  public touchThrottle: Record<string, boolean> = {};

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

  getKey(key: string): boolean {
    return this.keys[key] ?? this.touchThrottle[key];
  }

  tick(): void {
    this.timeDiff = Date.now() - this.time;
    this.time = Date.now();
  }
}
