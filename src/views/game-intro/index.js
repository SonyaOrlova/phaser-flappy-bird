import GameIntro from 'components/game-intro';

export default class gameIntroView extends Phaser.Scene {
  constructor(props = {}) {
    const id = 'gameIntroView';

    super({ key: id });

    this.id = id;
    this.props = props;

    this.GameIntro = new GameIntro(this);
  }

  preload() {
    this.GameIntro.load();
  }

  create() {
    this.GameIntro.create();

    this.input.on('pointerdown', this.props.onGameStart);
  }
}
