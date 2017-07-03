export default class Boot{
	constructor(game) {
	}

	init() {
		console.log('boot init');
		this.input.maxPointers = 1;
		if(!this.game.device.desktop) {

		} else {
			//移动设备相关的设置
			//在这里我们定义了：“缩放游戏，不小于 480x260, 不超过 1024x768”
			this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
			this.scale.setMinMax(480, 260, 1024, 768);
			this.scale.forceLandscape = true;
		}
		this.scale.pageAlignHorizontally = true;
		this.scale.pageAlignVertically = true;
	}

	preload() {
		console.log('boot preload');
		//在这里，我们载入了 preloader 所需的资源（一个载入进度条）
		// this.load.image('preloaderBar', './dist/images/red.png');
	}

	create() {
		console.log('boot create');
		//当游戏把 preloader 相关资源载入缓存，进入真正的 preloader
		this.state.start('Preloader');
	}

}

