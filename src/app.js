import GameIntroView from 'views/game-intro';
import GameView from 'views/game';
import GameOver from 'views/game-over';

import 'components/document';

const VIEWPORT_WIDTH = 288;
const VIEWPORT_HEIGHT = 512;

const game = new Phaser.Game({
  width: VIEWPORT_WIDTH,
  height: VIEWPORT_HEIGHT,
  physics: { default: 'arcade', arcade: { debug: false } },
});

const gameIntroView = new GameIntroView({ onGameStart });
const gameView = new GameView({ onGameOver });
const gameOverView = new GameOver({ onGameRestart });

game.scene.add(gameIntroView.id, gameIntroView, false);
game.scene.add(gameView.id, gameView, false);
game.scene.add(gameOverView.id, gameOverView, false);

game.scene.start(gameIntroView.id);

function onGameStart() {
  game.scene.stop(gameIntroView.id);
  game.scene.start(gameView.id, { score: 0 });
}

function onGameOver(score) {
  game.scene.stop(gameView.id);
  game.scene.start(gameOverView.id, { score });
}

function onGameRestart() {
  game.scene.stop(gameOverView.id);
  game.scene.start(gameIntroView.id);
}
