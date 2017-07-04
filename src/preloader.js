export default class Preloader{
	constructor(game) {
		this.background = null;
		this.preloaderBar = null;
		this.ready = false;
		this.loadingTxt = null;
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

		this.game.load.onFileComplete.add(this.fileComplete, this);
	}

	fileComplete(progress, cacheKey, success, totalLoaded, totalFiles) {
		this.loadingTxt.setText('正在加载...' + progress + '%');
	}

	preload() {
		console.log('Preloader preload');
		//在这里，我们载入了 preloader 所需的资源（一个载入进度条）
		this.stage.backgroundColor = '#fff';
		// this.preloadBar = this.add.sprite(this.game.width / 2 - 100, this.game.height / 2, 'preloaderBar');
		this.loadingTxt = this.add.text(this.game.width / 2, this.game.height / 2 - 30, '正在加载...', {font: '18px', fill: '#999999'});
		this.loadingTxt.anchor.setTo(0.5, 0.5);

		//这里把 preloadBar 精灵设置为一个载入器精灵。当文件在载入时，他会自动从0 到全长进行裁剪长度
		// this.load.setPreloadSprite(this.preloadBar);
		const url = isPro == true ? './images/' : './dist/images/';
		//开始加载游戏所需的剩下的精灵、图片、精灵表、音频文件等
		this.load.image('point', url + 'point_bg.png');
		this.load.image('score', url + 'score_bg.png');
		this.load.image('time', url + 'time_bg.png');
		this.load.image('bar', url + 'bar_bg.png');
		this.load.image('pop1', url + 'pop_1.png');
		this.load.image('pop2', url + 'pop_2.png');
		this.load.image('one', url + '1.png');
		this.load.image('two', url + '2.png');
		this.load.image('three', url + '3.png');
		this.load.image('go', url + 'go.png');
		this.load.image('red', url + 'red.png');
		this.load.image('btn_return', url + 'btn_return.png');
		this.load.image('bg_1', url + 'bg_1.png');
		this.load.image('bg_2', url + 'bg_2.png');
		this.load.image('bg_3', url + 'bg_3.png');
		this.load.image('rule_btn', url + 'rule_btn.png');
		this.load.image('record_btn', url + 'record_btn.png');
		this.load.image('self_btn', url + 'self_btn.png');
		this.load.image('team_btn', url + 'team_btn.png');
		this.load.image('main', url + 'main.png');
		this.load.image('report', url + 'report.png');
		this.load.image('bridge', url + 'bridge.png');
		this.load.spritesheet('btn_left', url + 'btn_left.png', 133, 133);
		this.load.spritesheet('btn_right', url + 'btn_right.png', 133, 133);
		this.load.spritesheet('btn_up', url + 'btn_up.png', 133, 133);
		this.load.atlas('person', url + 'person.png', url + 'person.json');
		this.load.atlas('enemy', url + 'enemy.png', url + 'enemy.json',);
		this.load.atlas('hit', url + 'hit.png', url + 'hit.json',);
		// this.load.audio('explosion', ['assets/explosion.ogg', 'assets/explosion.wav']);
		// this.load.audio('playerExplosion', ['assets/player-explosion.ogg',
		// 'assets/player-explosion.wav']);
	}

	create() {
		console.log('Preloader create');
		//当加载完成后，禁止裁剪载入条，因为在音乐解码之后，将进入 update 循环
		// this.preloadBar.cropEnabled = false;
		this.state.start('MainMenu');
		this.loadingTxt.destroy();
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

