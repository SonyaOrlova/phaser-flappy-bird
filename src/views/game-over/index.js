import GameOver from 'components/game-over';

export default class GameOverView extends Phaser.Scene {
  constructor(props = {}) {
    const id = 'gameOverView';

    super({ key: id });

    this.id = id;
    this.props = props;

    this.GameOver = new GameOver(this);

    this.state = {
      score: 0,
    };
  }

  init({ score }) {
    this.state.score = score;
  }

  preload() {
    this.GameOver.load();
  }

  create() {
    const gameOver = this.GameOver.create();

    const { displayWidth, displayHeight } = gameOver;

    this.scoreText = this.add.text(displayWidth / 2, displayHeight / 2 + 20, `SCORE: ${this.state.score}`).setOrigin(0.5).setDepth(1);

    this.input.on('pointerdown', this.props.onGameRestart);
  }
}
