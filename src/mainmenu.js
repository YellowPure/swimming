import { showDialog5 } from './dialogs.js';

export default class MainMenu{
	constructor(game) {
		this.music = null;
		this.playButton = null;

		this.bridge = null;
		/**
		 * 团队数组
		 * @type {[type]}
		 */
		this.rankdata = null;
		this.displayGroup = null;
	}

	create() {
		console.log('MainMenu create');
		//我们已经把所有资源都加载进来了，所以，现在可以进入主菜单
		//在这里，我们将播放一段音乐，添加一张图片和一个按钮
		let bg = this.add.sprite(0, 0,  'bg_1');
		bg.width = window.innerWidth;
		bg.height = window.innerHeight;
		this.loadingText = this.add.text(this.game.width / 2, this.game.height / 2 - 80, '开始游戏', { font: '50px', fill: '#fff'});
		this.loadingText.anchor.setTo(.5, .5);
		this.rankdata = window.test_rank;
		this.displayGroup = this.game.add.group();

		let bmd = this.add.bitmapData(50, 50);
		bmd.ctx.beginPath();
		bmd.ctx.rect(0, 0, 50, 50);
		bmd.ctx.fillStyle = '#f00';
		bmd.ctx.fill();

		for(let i = 0;i < this.rankdata.length; i++) {
			let y = Math.floor(180 + i * 650 / this.rankdata.length);
			let person = this.displayGroup.create(this.game.width, y, bmd);
		}
		let bmd1 = this.game.add.bitmapData(100, 420);
		bmd1.ctx.beginPath();
		bmd1.ctx.rect(0, 0, 100, 420);
		bmd1.ctx.fillStyle = '#f70';
		bmd1.ctx.fill();
		this.bridge = this.add.sprite(0, 180, bmd1);

		// this.add.text(this.game.width / 2, this.game.height - 90, 'image assets Copyright (c) 2002', { font: '24 monospace', fill: '#fff', align: 'center'}).anchor.setTo(.5, .5);
		showDialog5();
	}

	update() {
		for(let i = 0 ;i< this.displayGroup.length ;i++) {
			let child = this.displayGroup.getChildAt(i);
			child.x -= 2 *.1 * i + 2;
		}
		if (this.input.keyboard.isDown(Phaser.Keyboard.Z) || this.input.activePointer.isDown) {
			this.startGame();
		}
	}

	startGame() {
		// this.music.stop();
		this.state.start('Game');
	}
}

