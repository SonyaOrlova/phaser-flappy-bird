const image = require('./platform.png').default;

export default class Platform {
  constructor(view) {
    this.view = view;

    this.id = 'platform';

    this.HEIGHT = 100;
  }

  load() {
    this.view.load.image(this.id, image);
  }

  create() {
    const { width, height } = this.view.game.config;

    const y = height - this.HEIGHT;

    const group = this.view.add.group();

    const base = group.create(0, y, this.id).setOrigin(0);
    const duplicate = group.create(width, y, this.id).setOrigin(0);

    group.getChildren().forEach(platform => {
      platform.displayWidth = width;
      platform.displayHeight = this.HEIGHT;
    });

    return { group, base, duplicate };
  }
}
