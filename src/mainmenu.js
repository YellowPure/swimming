export default class MainMenu{
	constructor(game) {
		this.music = null;
		this.playButton = null;
	}

	create() {
		console.log('MainMenu create');
		//我们已经把所有资源都加载进来了，所以，现在可以进入主菜单
		//在这里，我们将播放一段音乐，添加一张图片和一个按钮
		let bg = this.add.sprite(0, 0,  'bg_1');
		bg.width = window.innerWidth;
		bg.height = window.innerHeight;
		this.loadingText = this.add.text(this.game.width / 2, this.game.height / 2 - 80, '开始游戏', { font: '100px', fill: '#fff'});
		this.loadingText.anchor.setTo(.5, .5);
		// this.add.text(this.game.width / 2, this.game.height - 90, 'image assets Copyright (c) 2002', { font: '24 monospace', fill: '#fff', align: 'center'}).anchor.setTo(.5, .5);
	}

	update() {
		if (this.input.keyboard.isDown(Phaser.Keyboard.Z) || this.input.activePointer.isDown) {
			this.startGame();
		}
	}

	startGame() {
		// this.music.stop();
		this.state.start('Game');
	}
}

