const pipeTopImage = require('./pipe-top.png').default;
const pipeBottomImage = require('./pipe-bottom.png').default;

export default class Pipes {
  constructor(view) {
    this.view = view;

    this.pipeTopId = 'pipeTop';
    this.pipeBottomId = 'pipeBottom';

    this.WIDTH = 52;
    this.HEIGHT = 320;

    this.GAP = 100;
  }

  load() {
    this.view.load.image(this.pipeTopId, pipeTopImage);
    this.view.load.image(this.pipeBottomId, pipeBottomImage);
  }

  create({ x, y }) {
    const group = this.view.add.group();

    const pipeTop = group.create(x, y, this.pipeTopId).setOrigin(0.5, 1);
    const pipeBottom = group.create(x, pipeTop.y + this.GAP, this.pipeBottomId).setOrigin(0.5, 0);

    group.getChildren().forEach(pipe => {
      pipe.displayWidth = this.WIDTH;
      pipe.displayHeight = this.HEIGHT;
    });

    return { group, pipeTop, pipeBottom };
  }
}
