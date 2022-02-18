const image = require('./background.png').default;

export default class Background {
  constructor(view) {
    this.view = view;

    this.id = 'background';
  }

  load() {
    this.view.load.image(this.id, image);
  }

  create() {
    const { width, height } = this.view.game.config;

    const group = this.view.add.group();

    const base = group.create(0, 0, this.id).setOrigin(0);
    const duplicate = group.create(width, 0, this.id).setOrigin(0);

    group.getChildren().forEach(background => {
      background.displayWidth = width;
      background.displayHeight = height;
    });

    return { group, base, duplicate };
  }
}
