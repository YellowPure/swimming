import {getX, getY} from './util.js';

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
		this.enemyPool = null;
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
		this.timenum = 5;
		this.timeText = null;
		this.BAR_WIDTH = 350;
		this.BAR_HEIGHT = 430;
		/**
		 * 倒计时遮罩
		 */
		this.mask = null;

		this.leftBtn = null;

		this.rightBtn = null;

		this.upBtn = null;
		/**
		 * 总距离
		 */
		this.total = window.gamedata.total;

		this.cursors = null;
		/**
		 * 当前所在泳道 1 left 2 center 3 right
		 */
		this.curload = 2;
		/**
		 * 加速度
		 */
		this.acceleration = 0;
		/**
		 * 点击次数
		 * @type {Number}
		 */
		this.clickcount = 0;

		this.curtime = Date.now();
		/**
		 * 切换泳道时 是否在缓动中
		 */
		this.istween = false;

		this.isCollisions = false;
		/**
		 * 是否通关
		 */
		this.completeSwim = false;

		this.endPanel = null;

		this.BASIC_SPEED = 100;

		this.load1 = getX(20);

		this.load2 = getX(375 / 2 - 50);

		this.load3 = getX(375 - 100);
	}

	create() {
		console.log('Game create');
		// 创建游戏背景、玩家、敌人、子弹、文字、音频等
		this.setupBackground();
		this.setupEnemies();
		this.setupPlayer();
		this.setupText();
		this.setupCtrl();
		this.countDown();
		// this.setupAudio();
	}

	update() {
		if(this.end == true) {
			if(!this.endPanel) {
				this.showEndPanel();
			}
		}
		if(!this.isstart) return;
		this.movePlayer();
		this.moveEnemies();
		// 检测碰撞、生成敌人、开火、响应玩家输入，任何东西都可以放在这里
		this.checkCollisions();
		this.checkOverEnemy();
		// this.time++;
	}

	moveEnemies() {
		if (!this.isstart) return;
		this.enemyPool.forEachAlive((child) => {
			child.body.velocity.y = -this.BASIC_SPEED;
			// console.log(child.y, child.body.y);
			if(child.y < 200) {
				child.alive = false;
				child.destroy();
			}
			// debugger;
		});
		// this.enemyPool.y -=2;
	}

	/**
	 * 超过一个障碍物
	 */
	checkOverEnemy() {
		this.enemyPool.forEachAlive((child) => {
			if(this.player.body.y < child.body.y) {
				this.score += window.initGame.exceedCount;
				this.scoreText.text = this.score + '楼币';
				child.alive = false;
			}
		}, this, true);
	}
	/**
	 * 每秒更新米数
	 */
	updatePoint() {
		this.point = Math.floor((this.game.world.height - this.player.body.y) / this.game.world.height * window.gamedata.total);
		this.pointText.text = this.point + '米';
	}

	movePlayer() {
		if (!this.isstart) return;
		// this.player.body.setZeroVelocity();
		let speed = this.acceleration + this.BASIC_SPEED;
		if(Math.abs(this.curtime - Date.now()) > 1000) {
			this.curtime = Date.now();
			// this.acceleration = 0;
			this.updatePoint();
		}
		// this.game.physics.arcade.moveToXY(this.player, 0, this.player.body.y - this.game.world.height / 60, 60, 1000 );

		if(this.isCollisions == true) {
			this.player.body.velocity.y = 0;
		} else {
			this.player.body.velocity.y = -speed;
		}

		if(this.player.body.y <= getY(200) ) {
			this.score = 88;
			this.point = window.gamedata.total;
			this.completeSwim = true;
			this.end = true;
			this.isstart = false;
		}

		// if (this.cursors.up.isDown)
		// {
		// 	this.player.body.moveUp(3000)
		// }
		// else if (this.cursors.down.isDown)
		// {
		// 	this.player.body.moveDown(3000);
		// }

		// if (this.cursors.left.isDown)
		// {
		// 	this.player.body.velocity.x = -3000;
		// }
		// else if (this.cursors.right.isDown)
		// {
		// 	this.player.body.moveRight(3000);
		// }
	}

	render() {

	}
	/**
	 * 倒计时
	 */
	countDown() {
		let bmd = this.add.bitmapData(this.game.width, this.game.height);
		bmd.ctx.beginPath();
		bmd.ctx.rect(0, 0, this.game.width, this.game.height);
		bmd.ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
		bmd.ctx.fill();
		bmd.fixedToCamera = true;
		this.mask = this.add.sprite(0, 0, bmd);
		this.mask.fixedToCamera = true;
		let bar = this.add.sprite(0, this.game.height - getY(this.BAR_HEIGHT), 'bar');
		bar.width = this.BAR_WIDTH;
		bar.height = this.BAR_HEIGHT;
		bar.scale.setTo(2, 2);
		this.bar = bar;
		this.bar.fixedToCamera = true;
		this.countdownSp = this.add.sprite(this.game.width / 2 - getX(61), this.game.height / 2 - 146, 'three');
		this.countdownSp.fixedToCamera = true;
		// this.countdownSp.anchor.setTo(.5, .5);
		// this.countdownSp.scale.setTo(.5, .5);
		this.countEvent = this.game.time.events.loop(Phaser.Timer.SECOND, this.updateCount, this);
	}

	updateTime() {
		this.timenum--;
		this.timeText.text = this.timenum + 's';
		if(this.timenum <= 0) {
			this.end = true;
			this.isstart = false;
		}
	}

	updateCount() {
		this.count ++;
		if(this.count == 1) {
			this.countdownSp.destroy();
			this.countdownSp = this.add.sprite(this.game.width / 2 - getX(70), this.game.height / 2 - getY(69), 'two');
			this.countdownSp.scale.setTo(2, 2);
			this.countdownSp.fixedToCamera = true;
		} else if(this.count == 2) {
			this.countdownSp.destroy();
			this.countdownSp = this.add.sprite(this.game.width / 2 - getX(36), this.game.height / 2 - getY(72), 'one');
			this.countdownSp.scale.setTo(2, 2);
			this.countdownSp.fixedToCamera = true;			
		} else if(this.count ==3) {
			console.log('start');
			this.countdownSp.destroy();
			this.countdownSp = this.add.sprite(this.game.width / 2 - getX(100), this.game.height / 2 - getY(65), 'go');
			this.countdownSp.scale.setTo(2, 2);
			this.countdownSp.fixedToCamera = true;
		} else if(this.count > 3) {
			this.mask.destroy();
			this.countdownSp.destroy();
			this.countEvent && this.game.time.events.remove(this.countEvent);
			// this.countdownSp.scale.setTo(.5, .5);
			this.bar && this.bar.destroy();
			this.isstart = true;
			// 开始游戏倒计时
			this.timeEvent = this.game.time.events.repeat(Phaser.Timer.SECOND, this.timenum,  this.updateTime, this);
			
			this.start();
		}
	}

	createEnemy() {

	}


	checkCollisions() {
		if(this.isCollisions == false) {
			this.game.physics.arcade.collide(this.player, this.enemyPool, this.collisions, null, this);
		}
	}

	collisions(player, enemy) {
		console.log('collisions');
		this.isCollisions = true;
		// enemy.alive = false;
		enemy.body.enable = false;
		this.player.loadTexture('hit');
		this.player.animations.add('hit');
		this.player.animations.play('hit', 5, true);
		// this.player.body.velocity.y = 0;
		this.acceleration = 0;
		setTimeout(() => {
			this.isCollisions = false;
			this.player.loadTexture('person');
			this.player.animations.play('run', 5, true);
			// this.player.body.velocity.y = -this.BASIC_SPEED;
		}, 2000);
	}

	showEndPanel() {
		window.gamedata.addGameLog();
		console.log('showEndPanel' , this.clickcount);
		let texture = this.completeSwim == true ? 'pop2' : 'pop1';
		this.game.time.events.remove(this.timeEvent);
		let bmd = this.add.bitmapData(this.game.width, this.game.height);
		bmd.ctx.beginPath();
		bmd.ctx.rect(0, 0, this.game.width, this.game.height);
		bmd.ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
		bmd.ctx.fill();
		// bmd.fixedToCamera = true;
		this.mask = this.add.sprite(0, 0, bmd);
		this.mask.fixedToCamera = true;
		this.endPanel = this.add.sprite(this.game.width / 2 - getX(175), this.game.height / 2 - getY(162), texture);
		this.endPanel.fixedToCamera = true;
		// this.endPanel.scale.setTo(.5, .5);
		
		this.player.destroy();
		this.enemyPool.destroy();

		this.pointText.text = window.gamedata.total + '米';

		this.endPanel.addChild(this.game.make.text(this.endPanel.width / 2 , this.endPanel.height / 2 + 20, this.point, {font: '32px', fill: '#f00', align: 'center'}));
		this.endPanel.addChild(this.game.make.text(this.endPanel.width / 2, this.endPanel.height / 2 + 70, this.score, {font: '32px', fill: '#f00', align: 'center'}));
		this.endPanel.addChild(this.game.make.button(this.endPanel.width /2 - 105, this.endPanel.height / 2 + 130, 'btn_return', this.quitGame, this));
		// this.quitGame();
	}

	setupBackground() {
		// this.add.s
		let tile = this.add.tileSprite(0, 0, this.game.width, this.game.height * 20, 'bg_2');

		tile.tileScale.setTo(this.game.width / 750, this.game.height / 1205);
		let bg1 = this.add.sprite(0, this.game.height * 19, 'bg_1');
		bg1.width = this.game.width;
		bg1.height = this.game.height;

		let bg3 = this.add.sprite(0, 0, 'bg_3');
		bg3.width = this.game.width;
		bg3.height = this.game.height;
		// console.log(this.game.width, this.game.height);
		this.game.world.setBounds(0, 0, this.game.width, this.game.height * 20);
		console.log(this.game.width, this.game.height);
		this.game.physics.startSystem(Phaser.Physics.ARCADE);
	}

	setupCtrl() {
		this.leftBtn = this.add.button(30, this.game.height - getY(75), 'btn_left', this.onLeftHandler, this, 0, 0, 1);
		this.leftBtn.fixedToCamera = true;

		this.rightBtn = this.add.button(this.game.width - getX(90), this.game.height - getY(75), 'btn_right', this.onRightHandler, this, 0, 0, 1);
		this.rightBtn.fixedToCamera = true;
		this.upBtn = this.add.button(this.game.world.centerX - getX(28) , this.game.height - getY(90), 'btn_up', this.onUpHandler, this, 0, 0, 1);
		this.upBtn.fixedToCamera = true;

		// this.leftBtn.scale.setTo(.5, .5);
		// this.upBtn.scale.setTo(.5, .5);
		// this.rightBtn.scale.setTo(.5, .5);
	}

	start() {
		
		let anim = this.player.animations.add('run');
		anim.play(5, true);
		// let eAnim = this.enemyPool.animations.add('run');
		this.enemyPool.callAll('animations.add', 'animations', 'run', [0, 1, 2, 3], 5, true);
		this.enemyPool.callAll('animations.play', 'animations', 'run');
	}
	/**
	 * 切换泳道
	 */
	tweenPlayer(load) {
		let x;
		if(load == 1) {
			x = this.load1;
		} else if(load == 2) {
			x = this.load2;
		} else if(load == 3) {
			x = this.load3;
		}
		let tween = this.game.add.tween(this.player.body).to({x: x}, 500,  Phaser.Easing.Linear.None, true);
		tween.onStart.add(() => {
			this.istween = true;
		});
		tween.onComplete.add(() => {
			this.istween = false;
		}, this);
	}

	onLeftHandler() {
		// console.log('to left');
		if(this.istween == true || this.isCollisions == true) return;
		this.curload--;

		if(this.curload < 1) {
			this.curload = 1;
		}
		this.tweenPlayer(this.curload);
	}

	onRightHandler() {
		console.log('to right');
		if(this.istween == true || this.isCollisions == true) return;
		this.curload++;

		if(this.curload > 3) {
			this.curload = 3;
		}
		this.tweenPlayer(this.curload);
	}

	onUpHandler() {
		if(this.isCollisions == false) {
			this.acceleration += window.gamedata.speed;
			this.clickcount++;
		} 
	}

	setupPlayer() {
		this.player = this.add.sprite(this.load2, this.game.world.height - getY(240), 'person');
		// this.player.scale.setTo(.5, .5);
		let txt = this.game.make.text(this.player.width / 2 - getX(10), getY(-50), '玩家', {font: '28px', fill: '#f00', align: 'center'});
		let arrow = this.game.make.sprite(this.player.width /2 - getX(6), getY(-30), 'red');
		this.player.addChild(txt);
		this.player.addChild(arrow);
		// this.player.scale.setTo(2, 2);
		this.game.physics.enable(this.player, Phaser.Physics.ARCADE);
		// this.cursors = this.game.input.keyboard.createCursorKeys();

		this.game.camera.follow(this.player);
	}

	setupEnemies() {
		this.enemyPool = this.game.add.group();
		this.enemyPool.enableBody = true;
		let enemyLen = window.initGame.limitCount;

		for(let i = 0; i < enemyLen; i++) {
			let x, y, ran = Math.floor(Math.random() * 3);
			if(ran == 0) {
				x = this.load1;
			} else if(ran == 1) {
				x = this.load2;
			} else if(ran == 2) {
				x = this.load3;
			}
			// y = Math.floor(Math.random() * this.game.world.height);
			y = this.randomPos(enemyLen, i, this.game.world.height);
			let enemy = this.enemyPool.create(x, y, 'enemy');
			// enemy.scale.setTo(.5, .5);
			// enemy.scale.setTo(2, 2);
			// enemy.body.setCollisionGroup(this.enemyCollisionGroup);
			// enemy.body.collides([this.playerCollisionGroup]);
		}
	}

	randomPos(len, index, totalHeight) {
		// console.log(index * totalHeight / len);
		return index * (totalHeight - getY(200)) / len;
		// let maxLen = Math.min(len, Math.floor(totalHeight / height));
		// let arr = Array.from({length: maxLen});
	}

	setupText() {
		let bgW = getX(80);
		let lineH = getY(15);
		let lineW = getX(55);
		let sp1 = this.add.sprite(getX(20), getY(10), 'time');
		// sp1.scale.setTo(.5, .5);
		// sp1.scale.setTo(1.5, 1.5);
		sp1.fixedToCamera = true;
		this.timeText = this.add.text(lineW, lineH, this.timenum + 's', {font: '28px', fill: '#fff'});
		this.timeText.fixedToCamera = true;
		// this.timeText.anchor.set(0.5, 0.5);
		let sp2 = this.add.sprite(bgW + getX(20), getY(10), 'score');
		sp2.fixedToCamera = true;
		// sp2.scale.setTo(.5, .5);
		this.scoreText = this.add.text(bgW + lineW, lineH, this.score + '楼币', {font: '28px', fill: '#fff'});
		this.scoreText.fixedToCamera = true;
		let sp3 = this.add.sprite(bgW * 2 + getX(20), getY(10), 'point');
		sp3.fixedToCamera = true;
		// sp3.scale.setTo(.5, .5);
		this.pointText = this.add.text( bgW  * 2 + lineW, lineH, this.point + 'm', {font: '28px', fill: '#fff'});
		this.pointText.fixedToCamera = true;
	}

	setupAudio() {

	}

	quitGame() {
		this.end = false;
		this.player && this.player.destroy();
		this.enemyPool && this.enemyPool.destroy();
		this.isstart = false;
		this.count = 0;
		this.score = 0;
		this.scoreText.destroy();
		this.point = 0;
		this.timeEvent && this.game.time.events.remove(this.timeEvent);
		this.pointText.destroy();
		this.timenum = 60;
		this.timeText.destroy();
		this.BAR_WIDTH = 350;
		this.BAR_HEIGHT = 430;
		this.mask.destroy();
		this.leftBtn.destroy();
		this.rightBtn.destroy();
		this.upBtn.destroy();
		this.cursors = null;
		this.curload = 2;
		this.acceleration = 0;
		this.istween = false;
		this.isCollisions = false;
		this.completeSwim = false;
		this.endPanel.destroy();
		this.endPanel = null;

		this.state.start('Boot');

	}

}
