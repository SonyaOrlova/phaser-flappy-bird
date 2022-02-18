const image = require('./game-intro.png').default;

export default class GameIntro {
  constructor(view) {
    this.view = view;

    this.id = 'gameIntro';
  }

  load() {
    this.view.load.image(this.id, image);
  }

  create() {
    const { width, height } = this.view.game.config;

    const gameIntro = this.view.add.image(0, 0, this.id).setOrigin(0);

    gameIntro.displayWidth = width;
    gameIntro.displayHeight = height;

    return gameIntro;
  }
}
