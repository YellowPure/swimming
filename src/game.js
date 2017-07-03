

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
		this.timenum = 60;
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

		this.load1 = 20;

		this.load2 = window.innerWidth / 2 - 18;

		this.load3 = window.innerWidth - 80;
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
		if(this.isstart) {
			this.movePlayer();
			this.moveEnemies();
			// 检测碰撞、生成敌人、开火、响应玩家输入，任何东西都可以放在这里
			this.checkCollisions();
			this.checkOverEnemy();
		}
		// this.spawnEnemies();
		// this.processPlayserInput();
		// this.time++;

		if(this.end == true) {
			if(!this.endPanel) {
				this.showEndPanel();
			}
		}
		
	}

	moveEnemies() {
		if (!this.isstart) return;
		this.enemyPool.forEachAlive((child) => {
			child.body.velocity.y = -this.BASIC_SPEED;
		});
		// this.enemyPool.y -=2;
	}

	/**
	 * 超过一个障碍物
	 */
	checkOverEnemy() {
		this.enemyPool.forEachAlive((child) => {
			if(this.player.body.y < child.body.y) {
				this.score++;
				this.scoreText.text = this.score + '楼币';
				child.alive = false;
				console.log('push score');
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
			this.acceleration = 0;
			this.updatePoint();
		}
		// this.game.physics.arcade.moveToXY(this.player, 0, this.player.body.y - this.game.world.height / 60, 60, 1000 );

		if(this.isCollisions == true) {
			this.player.body.velocity.y = 0;
		} else {
			this.player.body.velocity.y = -speed;
		}

		if(this.player.body.y <= 200 ) {
			this.score = 88;
			this.point = window.gamedata.total;
			this.completeSwim = true;
			this.end = true;
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
		let bar = this.add.sprite(0, this.game.height - this.BAR_HEIGHT, 'bar');
		bar.width = this.BAR_WIDTH;
		bar.height = this.BAR_HEIGHT;
		this.bar = bar;
		this.bar.fixedToCamera = true;
		this.countdownSp = this.add.sprite(this.game.width / 2 - 122, this.game.height / 2 - 146, 'three');
		this.countdownSp.fixedToCamera = true;
		this.countEvent = this.game.time.events.loop(Phaser.Timer.SECOND, this.updateCount, this);
	}

	updateTime() {
		this.timenum--;
		this.timeText.text = this.timenum + 's';
		if(this.timenum <= 0) {
			this.end = true;
		}
	}

	updateCount() {
		this.count ++;
		if(this.count == 1) {
			this.countdownSp.destroy();
			this.countdownSp = this.add.sprite(this.game.width / 2 - 69, this.game.height / 2 - 69, 'two');
			this.countdownSp.fixedToCamera = true;
		} else if(this.count == 2) {
			this.countdownSp.destroy();
			this.countdownSp = this.add.sprite(this.game.width / 2 - 37, this.game.height / 2 - 72, 'one');
			this.countdownSp.fixedToCamera = true;			
		} else if(this.count ==3) {
			console.log('start');
			this.countdownSp.destroy();
			this.countdownSp = this.add.sprite(this.game.width / 2 - 101, this.game.height / 2 - 65, 'go');
			this.countdownSp.fixedToCamera = true;
		} else if(this.count > 3) {
			this.mask.destroy();
			this.countdownSp.destroy();
			this.countEvent && this.game.time.events.remove(this.countEvent);
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
		setTimeout(() => {
			this.isCollisions = false;
			this.player.loadTexture('person');
			this.player.animations.play('run', 5, true);
		}, 2000);
	}

	spawnEnemies() {

	}

	processPlayserInput() {
		
	}

	showEndPanel() {
		// console.log('showEndPanel');
		let texture = this.completeSwim == true ? 'pop2' : 'pop1';
		this.game.time.events.remove(this.timeEvent);

		this.endPanel = this.add.sprite(this.game.width / 2 - 175, this.game.height / 2 - 162, texture);
		this.endPanel.fixedToCamera = true;
		this.endPanel.scale.setTo(.5, .5);

		this.endPanel.addChild(this.game.make.text(this.endPanel.width , this.endPanel.height + 20, this.point, {font: '28px', fill: '#f00'}));
		this.endPanel.addChild(this.game.make.text(this.endPanel.width, this.endPanel.height + 70, this.score, {font: '28px', fill: '#f00'}));
		this.endPanel.addChild(this.game.make.button(this.endPanel.width - 105, this.endPanel.height + 130, 'btn_return', this.quitGame, this));
		// this.quitGame();
	}

	setupBackground() {
		// this.add.s
		let tile = this.add.tileSprite(0, 0, this.game.width, this.game.height * 10, 'bg_2');
		// let sp = this.game.make.sprite(0, this.game.height * 8, this.game.width, this.game.height, 'bg_2');
		// sp.width = window.innerWidth;
		// sp.height = window.innerHeight;
		// this.game.add.existing(sp);
		// console.log(window.innerWidth / 750, window.innerHeight / 1205);

		tile.tileScale.setTo(window.innerWidth / 750, window.innerHeight / 1205);
		let bg1 = this.add.sprite(0, this.game.height * 9, 'bg_1');
		bg1.width = window.innerWidth;
		bg1.height = window.innerHeight;

		let bg3 = this.add.sprite(0, 0, 'bg_3');
		bg3.width = window.innerWidth;
		bg3.height = window.innerHeight;
		console.log(this.game.width, this.game.height);
		this.game.world.setBounds(0, 0, this.game.width, this.game.height * 10);

		this.game.physics.startSystem(Phaser.Physics.ARCADE);
	}

	setupCtrl() {
		this.leftBtn = this.add.button(30, this.game.height - 75, 'btn_left', this.onLeftHandler, this, 0, 0, 1);
		this.leftBtn.fixedToCamera = true;

		this.rightBtn = this.add.button(this.game.width - 90, this.game.height - 75, 'btn_right', this.onRightHandler, this, 0, 0, 1);
		this.rightBtn.fixedToCamera = true;
		this.upBtn = this.add.button(this.game.world.centerX - 28 , this.game.height - 90, 'btn_up', this.onUpHandler, this, 0, 0, 1);
		this.upBtn.fixedToCamera = true;

		this.leftBtn.scale.setTo(.5, .5);
		this.upBtn.scale.setTo(.5, .5);
		this.rightBtn.scale.setTo(.5, .5);
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
		console.log('to left');
		if(this.istween == true) return;
		this.curload--;

		if(this.curload < 1) {
			this.curload = 1;
		}
		this.tweenPlayer(this.curload);
	}

	onRightHandler() {
		console.log('to right');
		if(this.istween == true) return;
		this.curload++;

		if(this.curload > 3) {
			this.curload = 3;
		}
		this.tweenPlayer(this.curload);
	}

	onUpHandler() {
		this.acceleration += window.gamedata.speed;
	}

	setupPlayer() {
		console.log(this.game.world.height);
		this.player = this.add.sprite(this.load2, this.game.world.height - 240, 'person');
		// this.player.scale.setTo(2, 2);
		this.game.physics.enable(this.player, Phaser.Physics.ARCADE);
		// this.cursors = this.game.input.keyboard.createCursorKeys();

		this.game.camera.follow(this.player);
	}

	hit() {
		console.log('hit');
	}

	setupEnemies() {
		this.enemyPool = this.game.add.group();
		this.enemyPool.enableBody = true;

		for(let i = 0; i < window.gamedata.enemy; i++) {
			let x, y, ran = Math.floor(Math.random() * 3);
			if(ran == 0) {
				x = this.load1;
			} else if(ran == 1) {
				x = this.load2;
			} else if(ran == 2) {
				x = this.load3;
			}
			// y = Math.floor(Math.random() * this.game.world.height);
			y = this.randomPos(window.gamedata.enemy, i, this.game.world.height);
			let enemy = this.enemyPool.create(x, y, 'enemy');
			// enemy.scale.setTo(2, 2);
			// enemy.body.setCollisionGroup(this.enemyCollisionGroup);
			// enemy.body.collides([this.playerCollisionGroup]);
		}
	}

	randomPos(len, index, totalHeight) {
		console.log(index * totalHeight / len);
		return index * totalHeight / len;
		// let maxLen = Math.min(len, Math.floor(totalHeight / height));
		// let arr = Array.from({length: maxLen});
	}

	setupText() {
		let bgW = 80;
		let lineH = 17;
		let lineW = 55;
		let sp1 = this.add.sprite(20, 10, 'time');
		sp1.scale.setTo(.5, .5);
		// sp1.scale.setTo(1.5, 1.5);
		sp1.fixedToCamera = true;
		this.timeText = this.add.text(lineW, lineH, this.timenum + 's', {font: '10px', fill: '#fff'});
		this.timeText.fixedToCamera = true;
		// this.timeText.anchor.set(0.5, 0.5);
		let sp2 = this.add.sprite(bgW + 20, 10, 'score');
		sp2.fixedToCamera = true;
		sp2.scale.setTo(.5, .5);
		this.scoreText = this.add.text(bgW + lineW, lineH, this.score + '楼币', {font: '10px', fill: '#fff'});
		this.scoreText.fixedToCamera = true;
		let sp3 = this.add.sprite(bgW * 2 + 20, 10, 'point');
		sp3.fixedToCamera = true;
		sp3.scale.setTo(.5, .5);
		this.pointText = this.add.text( bgW  * 2 + lineW, lineH, this.point + 'm', {font: '10px', fill: '#fff'});
		this.pointText.fixedToCamera = true;
	}

	setupAudio() {

	}

	quitGame() {
		this.end = false;
		this.player.destroy();
		this.enemyPool.destroy();
		this.isstart = false;
		this.count = 0;
		this.score = 0;
		this.scoreText.destroy();
		this.point = 0;
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

		this.state.start('MainMenu');
	}

}

// class Player extends Phaser.Sprite{
// 	constructor() {
// 		let cir = new Phaser.Circle(0, 0, 30);
// 	}
// }
