import Background from 'components/background';
import Platform from 'components/platform';
import Bird from 'components/bird';

import Pipes from 'components/pipes';

import random from 'lodash.random';

const ENVIROMENT_SPEED = -75;

const BIRD = {
  GRAVITY: 200,
  SPEED: -100,
};

const PIPES_TIMER = {
  MIN: 1000,
  MAX: 2000,
};

const MIN_PIPE_HEIGHT = 32;

export default class GameView extends Phaser.Scene {
  constructor(props = {}) {
    const id = 'gameView';

    super({ key: id });

    this.id = id;
    this.props = props;

    this.Bird = new Bird(this);
    this.Background = new Background(this);
    this.Platform = new Platform(this);
    this.Pipes = new Pipes(this);

    this.state = {
      pipesList: [],
      score: 0,
    };

    this.onGameOver = this.onGameOver.bind(this);
  }

  init({ score }) {
    this.state.score = score;
  }

  preload() {
    this.Background.load();
    this.Platform.load();
    this.Bird.load();
    this.Pipes.load();
  }

  create() {
    this.addBird();

    this.addBackground();
    this.addPlatform();

    this.createPipesTimer = this.time.addEvent({
      delay: random(PIPES_TIMER.MIN, PIPES_TIMER.MAX),
      callback: this.createPipes,
      callbackScope: this,
      loop: true,
    });

    this.scoreText = this.add.text(20, 20, `SCORE: ${this.state.score}`).setOrigin(0).setDepth(1);
  }

  update() {
    this.loopBackgroundAndPlatform();
    this.updateScore();
  }

  addBird() {
    this.bird = this.Bird.create({ x: 20, y: (this.game.config.height - this.Platform.HEIGHT) / 2 });

    this.physics.add.existing(this.bird, false);

    this.bird.body.setGravityY(BIRD.GRAVITY);

    this.bird.setDepth(1);

    this.input.on('pointerdown', () => {
      this.bird.body.setVelocityY(BIRD.SPEED);
    });

    this.bird.body.setCollideWorldBounds(true);
    this.bird.body.onWorldBounds = true;
    this.bird.body.world.on('worldbounds', this.onGameOver);
  }

  addBackground() {
    this.background = this.Background.create();

    const backgroundPhysics = this.physics.add.group(this.background.group.getChildren());

    backgroundPhysics.setVelocityX(ENVIROMENT_SPEED);
  }

  addPlatform() {
    this.platform = this.Platform.create();

    const platformPhysics = this.physics.add.group(this.platform.group.getChildren());

    platformPhysics.setVelocityX(ENVIROMENT_SPEED);

    this.platform.group.setDepth(1);

    this.physics.add.collider(this.bird, platformPhysics, this.onGameOver);
  }

  loopBackgroundAndPlatform() {
    const isOutOfXBound = data => data.duplicate.x <= 0;

    const resetXPosition = data => {
      data.base.x = 0;
      data.duplicate.x = data.base.displayWidth;
    };

    if (isOutOfXBound(this.background)) resetXPosition(this.background);
    if (isOutOfXBound(this.platform)) resetXPosition(this.platform);
  }

  createPipes() {
    const pipesData = this.Pipes.create({
      x: this.game.config.width + this.Pipes.WIDTH,
      y: random(MIN_PIPE_HEIGHT, this.Pipes.HEIGHT - this.Pipes.GAP - MIN_PIPE_HEIGHT),
    });

    const pipesPhysics = this.physics.add.group(pipesData.group.getChildren());

    pipesPhysics.setVelocityX(ENVIROMENT_SPEED);

    this.physics.add.collider(this.bird, pipesPhysics, this.onGameOver);

    this.state.pipesList.push(pipesData);
  }

  updateScore() {
    const isOutOfXBound = data => data.pipeTop.x + this.Pipes.WIDTH / 2 <= 0;
    const isOutOfXBird = data => data.pipeTop.x + this.Pipes.WIDTH / 2 <= this.bird.x;

    this.state.pipesList = this.state.pipesList.filter(pipesData_ => {
      if (isOutOfXBound(pipesData_)) {
        pipesData_.group.destroy();

        return false;
      }

      if (isOutOfXBird(pipesData_) && !pipesData_.scored) {
        pipesData_.scored = true;

        this.state.score += 1;
        this.scoreText.text = `SCORE: ${this.state.score}`;
      }

      return true;
    });
  }

  onGameOver() {
    this.createPipesTimer.remove();

    this.props.onGameOver(this.state.score);
  }
}
