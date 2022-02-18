const sprite = require('./bird.png').default;

const WIDTH = 37;
const HEIGHT = 27;

export default class Bird {
  constructor(view) {
    this.view = view;

    this.id = 'bird';
  }

  load() {
    this.view.load.spritesheet(this.id, sprite, {
      frameWidth: 50,
      frameHeight: 36,
    });
  }

  create({ x, y }) {
    const bird = this.view.add.sprite(x, y, this.id).setOrigin(0);

    bird.displayWidth = WIDTH;
    bird.displayHeight = HEIGHT;

    const animationId = 'fly';

    this.view.anims.create({
      key: animationId,
      frameRate: 7,
      frames: this.view.anims.generateFrameNumbers(this.id, { start: 1, end: 3 }),
      repeat: -1,
    });

    bird.play(animationId);

    return bird;
  }
}
