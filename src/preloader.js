export default class Preloader{
	constructor(game) {
		this.background = null;
		this.preloaderBar = null;
		this.ready = false;
	}

	init() {
		console.log('Preloader init');
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
		console.log('Preloader preload');
		//在这里，我们载入了 preloader 所需的资源（一个载入进度条）
		this.stage.backgroundColor = '#2d2d2d';
		// this.preloadBar = this.add.sprite(this.game.width / 2 - 100, this.game.height / 2, 'preloaderBar');
		this.add.text(this.game.width / 2, this.game.height / 2 - 30, 'Loading...', {font: '32px monospace', fill: '#fff'}).anchor.setTo(0.5, 0.5);

		//这里把 preloadBar 精灵设置为一个载入器精灵。当文件在载入时，他会自动从0 到全长进行裁剪长度
		// this.load.setPreloadSprite(this.preloadBar);

		//开始加载游戏所需的剩下的精灵、图片、精灵表、音频文件等
		this.load.image('point', './dist/images/point_bg.png');
		this.load.image('score', './dist/images/score_bg.png');
		this.load.image('time', './dist/images/time_bg.png');
		this.load.image('bar', './dist/images/bar_bg.png');
		this.load.image('pop1', './dist/images/pop_1.png');
		this.load.image('pop2', './dist/images/pop_2.png');
		this.load.image('one', './dist/images/1.png');
		this.load.image('two', './dist/images/2.png');
		this.load.image('three', './dist/images/3.png');
		this.load.image('go', './dist/images/go.png');
		this.load.image('red', './dist/images/red.png');
		this.load.image('btn_return', './dist/images/btn_return.png');
		this.load.image('bg_1', './dist/images/bg_1.png');
		this.load.spritesheet('btn_left', './dist/images/btn_left.png', 133, 133);
		this.load.spritesheet('btn_right', './dist/images/btn_right.png', 133, 133);
		this.load.spritesheet('btn_up', './dist/images/btn_up.png', 133, 133);
		// this.load.spritesheet('enemy', 'assets/enemy.png', 32, 32);
		// this.load.audio('explosion', ['assets/explosion.ogg', 'assets/explosion.wav']);
		// this.load.audio('playerExplosion', ['assets/player-explosion.ogg',
		// 'assets/player-explosion.wav']);
	}

	create() {
		console.log('Preloader create');
		//当加载完成后，禁止裁剪载入条，因为在音乐解码之后，将进入 update 循环
		// this.preloadBar.cropEnabled = false;
		this.state.start('MainMenu');
	}

	update() {

		//这样能提供一个更好的游戏体验
		//它会在进入 MainMenu 前等待我们的音频文件解码完毕
		//如果你直接跳到主菜单，音乐仍然可以播放，但是会有几秒钟的延迟，因为这个时候 mp3 正在解码
		//所以，如果你需要音乐与菜单同步，最好就在这里等待解码结束

		//如果游戏中没有音乐文件，可以把 game.state.start 这一行代码放到 create 函数中，并完全删除 update 这个函数。
		// if (this.ready == false)
		// {
		// 	this.ready = true;
		// 	//进入 MainMenu 状态
		// 	this.state.start('MainMenu');
		// }
	}

}

