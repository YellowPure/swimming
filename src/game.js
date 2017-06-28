/**
 * game游戏主类 extends Phaser.State
 */
export default class Game{
	constructor(game) {
		this.end = false;
	}

	create() {
		console.log('Game create');
		// 创建游戏背景、玩家、敌人、子弹、文字、音频等
		this.setupBackground();
		this.setupPlayer();
		this.setupEnemies();
		this.setupText();
		this.setupAudio();
	}

	update() {
		// 检测碰撞、生成敌人、开火、响应玩家输入，任何东西都可以放在这里
		this.checkCollisions();
		this.spawnEnemies();
		this.processPlayserInput();
		// this.time++;
		if(this.end == true) {
			this.showEndPanel();
			this.quitGame();
		}
	}

	showEndPanel() {

	}

	quitGame() {
		this.player.destory();
		this.enemyPool.destory();
		this.scoreText.destory();
		this.returnText.destory();

		this.state.start('MainMenu');
	}

}

