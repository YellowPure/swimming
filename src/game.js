

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
		this.BAR_WIDTH = 1050;
		this.BAR_HEIGHT = 1290;
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
		/**
		 * 速度
		 */
		this.speed = window.gamedata.speed * 10;

		this.cursors = null;
		/**
		 * 当前所在泳道 1 left 2 center 3 right
		 */
		this.curload = 2;
		/**
		 * 加速度
		 */
		this.acceleration = 0;

		this.curtime = Date.now();
		/**
		 * 切换泳道时 是否在缓动中
		 */
		this.istween = false;
	}

	create() {
		console.log('Game create');
		// 创建游戏背景、玩家、敌人、子弹、文字、音频等
		this.setupBackground();
		this.setupEnemies();
		this.setupPlayer();
		this.setupText();
		this.setupCtrl();
		this.countDonw();
		// this.setupAudio();
	}

	update() {
		this.movePlayer();
		this.moveEnemies();
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

	moveEnemies() {
		if (!this.isstart) return;
		this.enemyPool.y -=2;
	}

	movePlayer() {
		if (!this.isstart) return;
		this.player.body.setZeroVelocity();
		let speed = this.speed + this.acceleration;
		if(Math.abs(this.curtime - Date.now()) > 1000) {
			this.curtime = Date.now();
			this.acceleration = 0;
		}
		this.player.body.moveUp(speed);

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
		this.game.debug.cameraInfo(this.game.camera, 32, 32);
    	this.game.debug.spriteCoords(this.player, 32, 500);
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
		bmd.fixedToCamera = true;
		this.mask = this.add.sprite(0, 0, bmd);
		this.mask.fixedToCamera = true;
		let bar = this.add.sprite(0, this.game.height - this.BAR_HEIGHT, 'bar');
		bar.width = this.BAR_WIDTH;
		bar.height = this.BAR_HEIGHT;
		this.bar = bar;
		this.bar.fixedToCamera = true;
		this.countdownSp = this.add.sprite(this.game.width / 2, this.game.height / 2, 'three');
		this.countdownSp.fixedToCamera = true;
		this.countEvent = this.game.time.events.loop(Phaser.Timer.SECOND, this.updateCount, this);
	}

	updateCount() {
		this.count ++;
		if(this.count == 1) {
			this.countdownSp.destroy();
			this.countdownSp = this.add.sprite(this.game.width / 2, this.game.height / 2, 'two');
			this.countdownSp.fixedToCamera = true;
		} else if(this.count == 2) {
			this.countdownSp.destroy();
			this.countdownSp = this.add.sprite(this.game.width / 2, this.game.height / 2, 'one');
			this.countdownSp.fixedToCamera = true;			
		} else if(this.count ==3) {
			console.log('start');
			this.countdownSp.destroy();
			this.countdownSp = this.add.sprite(this.game.width / 2, this.game.height / 2, 'go');
			this.countdownSp.fixedToCamera = true;
		} else if(this.count > 3) {
			this.mask.destroy();
			this.countdownSp.destroy();
			this.countEvent && this.game.time.events.remove(this.countEvent);
			this.bar && this.bar.destroy();
			this.isstart = true;
			this.start();
		}
	}

	createEnemy() {

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
		// this.add.s
		this.add.tileSprite(0, 0, this.game.width, this.game.height * 5, 'bg_2');
		let bg1 = this.add.sprite(0, this.game.height * 4, 'bg_1');
		bg1.width = window.innerWidth;
		bg1.height = window.innerHeight;

		let bg3 = this.add.sprite(0, 0, 'bg_3');
		bg3.width = window.innerWidth;
		bg3.height = window.innerHeight;

		this.game.world.setBounds(0, 0, this.game.width, this.game.height * 5);

		this.game.physics.startSystem(Phaser.Physics.P2JS);
		this.game.physics.p2.setImpactEvents(true);		
	}

	setupCtrl() {
		this.leftBtn = this.add.button(100, this.game.height - 200, 'btn_left', this.onLeftHandler, this, 0, 0, 1);
		this.leftBtn.fixedToCamera = true;
		this.rightBtn = this.add.button(this.game.width - 233, this.game.height - 200, 'btn_right', this.onRightHandler, this, 0, 0, 1);
		this.rightBtn.fixedToCamera = true;
		this.upBtn = this.add.button(this.game.world.centerX - 65 , this.game.height - 230, 'btn_up', this.onUpHandler, this, 0, 0, 1);
		this.upBtn.fixedToCamera = true;
		
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
			x = 200;
		} else if(load == 2) {
			x = this.game.world.centerX;
		} else if(load == 3) {
			x = this.game.width - 200;
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
		console.log('to up');
		this.acceleration += this.speed;
	}

	setupPlayer() {
		this.player = this.add.sprite(this.game.world.centerX, this.game.world.height - 500, 'person');

		this.game.physics.p2.enable(this.player);
		// this.cursors = this.game.input.keyboard.createCursorKeys();
		this.player.body.setCollisionGroup(this.playerCollisionGroup);

		this.player.body.collides(this.enemyCollisionGroup, this.hit, this);

		this.game.camera.follow(this.player);
	}

	hit() {
		console.log('hit');
	}

	setupEnemies() {
		this.enemyPool = this.game.add.group();
		this.enemyPool.enableBody = true;
    	this.enemyPool.physicsBodyType = Phaser.Physics.P2JS;

		this.enemyCollisionGroup = this.game.physics.p2.createCollisionGroup();
		this.playerCollisionGroup = this.game.physics.p2.createCollisionGroup();

		this.game.physics.p2.updateBoundsCollisionGroup();

		for(let i = 0; i < window.gamedata.enemy; i++) {
			let x, y, ran = Math.floor(Math.random() * 3);
			if(ran == 0) {
				x = 200;
			} else if(ran == 1) {
				x = this.game.world.centerX;
			} else if(ran == 2) {
				x = this.game.width - 200;
			}
			y = Math.floor(Math.random() * this.game.world.height);

			let enemy = this.enemyPool.create(x, y, 'enemy');
			enemy.body.setCollisionGroup(this.enemyCollisionGroup);
			enemy.body.collides([this.playerCollisionGroup]);
		}
		this.game.physics.p2.enable(this.enemyPool);
	}

	setupText() {
		let bgW = 180;
		let lineH = 8;
		let lineW = 60;
		let sp1 = this.add.sprite(0, 0, 'time');
		sp1.fixedToCamera = true;
		this.timeText = this.add.text(lineW, lineH, this.timenum + 's', {font: '40px', fill: '#fff'});
		this.timeText.fixedToCamera = true;
		// this.timeText.anchor.set(0.5, 0.5);
		let sp2 = this.add.sprite(bgW, 0, 'score');
		sp2.fixedToCamera = true;
		this.scoreText = this.add.text(bgW + lineW, lineH, this.score + '楼币', {font: '40px', fill: '#fff'});
		this.scoreText.fixedToCamera = true;
		let sp3 = this.add.sprite(bgW * 2, 0, 'point');
		sp3.fixedToCamera = true;

		this.pointText = this.add.text( bgW  * 2 + lineW, lineH, this.point + 'm', {font: '40px', fill: '#fff'});
		this.pointText.fixedToCamera = true;
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
