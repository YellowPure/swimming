

/**
 * game游戏主类 extends Phaser.State
 */
export default class Game{
	constructor(game) {
		this.end = false;
		/**
		 * 玩家
		 */
		this.player = null;
		/**
		 * 障碍物
		 */
		this.enemys = [];
		/**
		 * 游戏是否开始
		 */
		this.isstart = false;
		/**
		 * 开始倒计时
		 */
		this.count = 0;
		/**
		 * 楼币
		 */
		this.score = 0;
		this.scoreText = null;
		/**
		 * 米数
		 */
		this.point = 0;
		this.pointText = null;
		/**
		 * 游戏倒计时
		 */
		this.timenum = 60;
		this.timeText = null;
		this.BAR_WIDTH = 1050;
		this.BAR_HEIGHT = 1290;
		/**
		 * 倒计时遮罩
		 */
		this.mask = null;

		this.leftBtn = null;

		this.rightBtn = null;

		this.upBtn = null;
	}

	create() {
		console.log('Game create');
		// 创建游戏背景、玩家、敌人、子弹、文字、音频等
		this.setupBackground();
		this.setupPlayer();
		this.setupEnemies();
		this.setupText();
		this.setupCtrl();
		this.countDonw();
		// this.setupAudio();
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
	/**
	 * 倒计时
	 */
	countDonw() {
		let bmd = this.add.bitmapData(this.game.width, this.game.height);
		bmd.ctx.beginPath();
		bmd.ctx.rect(0, 0, this.game.width, this.game.height);
		bmd.ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
		bmd.ctx.fill();
		this.mask = this.add.sprite(0, 0, bmd);
		let bar = this.add.sprite(0, this.game.height - this.BAR_HEIGHT, 'bar');
		bar.width = this.BAR_WIDTH;
		bar.height = this.BAR_HEIGHT;
		this.bar = bar;
		this.countdownSp = this.add.sprite(this.game.width / 2, this.game.height / 2, 'three');
		this.countEvent = this.game.time.events.loop(Phaser.Timer.SECOND, this.updateCount, this);
	}

	updateCount() {
		this.count ++;
		if(this.count == 1) {
			this.countdownSp.destroy();
			this.countdownSp = this.add.sprite(this.game.width / 2, this.game.height / 2, 'two');
		} else if(this.count == 2) {
			this.countdownSp.destroy();
			this.countdownSp = this.add.sprite(this.game.width / 2, this.game.height / 2, 'one');
		} else if(this.count ==3) {
			console.log('start');
			this.countdownSp.destroy();
			this.countdownSp = this.add.sprite(this.game.width / 2, this.game.height / 2, 'go');
			
		} else if(this.count > 3) {
			this.mask.destroy();
			this.countdownSp.destroy();
			this.countEvent && this.game.time.events.remove(this.countEvent);
			this.bar && this.bar.destroy();
			this.isstart = true;
			// this.start();
		}
	}


	checkCollisions() {

	}

	spawnEnemies() {

	}

	processPlayserInput() {
		
	}

	showEndPanel() {

	}

	setupBackground() {
		let bg = this.add.sprite(0, 0,  'bg_1');
		bg.width = window.innerWidth;
		bg.height = window.innerHeight;
	}

	setupCtrl() {
		this.leftBtn = this.add.button(100, this.game.height - 200, 'btn_left', this.onLeftHandler, this, 0, 0, 1);
		this.rightBtn = this.add.button(this.game.width - 233, this.game.height - 200, 'btn_right', this.onRightHandler, this, 0, 0, 1);
		this.upBtn = this.add.button(this.game.world.centerX - 65 , this.game.height - 230, 'btn_up', this.onUpHandler, this, 0, 0, 1);
		
	}

	onLeftHandler() {
		console.log('to left');
	}

	onRightHandler() {
		console.log('to right');
	}

	onUpHandler() {
		console.log('to up');
	}

	setupPlayer() {
		let bmd = this.add.bitmapData(128,256);
		bmd.ctx.beginPath();
		bmd.ctx.rect(0,0,128,256);
		bmd.ctx.fillStyle = '#ff0000';
		bmd.ctx.fill();

		this.player = this.add.sprite(this.game.width / 2 - bmd.width / 2, this.game.height - 500, bmd);
	}

	setupEnemies() {

	}

	setupText() {
		this.add.sprite(0, 0, 'time');
		let bgW = 180;
		let lineH = 8;
		let lineW = 60;
		this.timeText = this.add.text(lineW, lineH, this.timenum + 's', {font: '40px', fill: '#fff'});
		// this.timeText.anchor.set(0.5, 0.5);
		this.add.sprite(bgW, 0, 'score');
		this.scoreText = this.add.text(bgW + lineW, lineH, this.score + '楼币', {font: '40px', fill: '#fff'});
		this.add.sprite(bgW * 2, 0, 'point');
		this.pointText = this.add.text( bgW  * 2 + lineW, lineH, this.point + 'm', {font: '40px', fill: '#fff'});
	}

	setupAudio() {

	}

	quitGame() {
		this.player.destroy();
		this.enemyPool.destroy();
		this.scoreText.destroy();
		this.returnText.destroy();

		this.state.start('MainMenu');
	}

}

// class Player extends Phaser.Sprite{
// 	constructor() {
// 		let cir = new Phaser.Circle(0, 0, 30);
// 	}
// }
