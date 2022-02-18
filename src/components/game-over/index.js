const image = require('./game-over.png').default;

export default class GameOver {
  constructor(view) {
    this.view = view;

    this.id = 'gameOver';
  }

  load() {
    this.view.load.image(this.id, image);
  }

  create() {
    const gameOver = this.view.add.image(0, 0, this.id).setOrigin(0);

    const { width, height } = this.view.game.config;

    gameOver.displayWidth = width;
    gameOver.displayHeight = height;

    return gameOver;
  }
}
