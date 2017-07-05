import { showDialog1, showDialog2,showDialog3, showDialog5 } from './dialogs.js';
import { guide1 } from './guide.js';
import { createTeam, createSuccess } from './createTeam.js';
import {getX, getY} from './util.js';
import Control from './control.js';

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
		this.sfBtn = null;
	}

	create() {
		console.log('MainMenu create');
		//我们已经把所有资源都加载进来了，所以，现在可以进入主菜单
		//在这里，我们将播放一段音乐，添加一张图片和一个按钮
		let bg = this.add.sprite(0, 0,  'main');
		bg.width = window.innerWidth;
		bg.height = window.innerHeight;
		// this.loadingText = this.add.text(this.game.width / 2, this.game.height / 2 - 80, '开始游戏', { font: '50px', fill: '#fff'});
		// this.loadingText.anchor.setTo(.5, .5);
		// this.rankdata = window.test_rank;
		this.displayGroup = this.game.add.group();


		for(let i = 0;i < 4; i++) {
			let y = Math.floor(getY(200) + i * getY(400) / 4);
			let data = window.test_rank[i];
			let person = this.displayGroup.create(this.game.width + i * getX(85), y, 'report');
			let text = this.make.text(110, 2, data.teamName + '游出' + data.totalAchievement + '米', { font: '22px', fill: '#fff'});
			person.addChild(text);
			person.scale.setTo(.5, .5);
		}
		this.bridge = this.add.sprite(0, getY(180), 'bridge');
		this.bridge.scale.setTo(.5, .5);

		
		this.sfBtn = this.add.button(this.game.width - 150, this.game.height - 90, 'self_btn', this.click1, this);
		this.sfBtn.scale.setTo(.5, .5);

		this.tBtn = this.add.button(0, this.game.height - 90, 'team_btn', this.click2, this);
		this.tBtn.scale.setTo(.5, .5);
		// createSuccess();
	}

	update() {
		for(let i = 0 ;i < this.displayGroup.length ;i++) {
			let child = this.displayGroup.getChildAt(i);
			child.x -= 2 *.1 * i + 2;
			if(child.x < -child.width) {
				child.x = i * getX(85) + this.game.width;
			}
		}
		// if (this.input.keyboard.isDown(Phaser.Keyboard.Z) || this.input.activePointer.isDown) {
		// 	this.startGame();
		// }
	}

	click1() {
		window.gamedata.swingType = 'person';
		let res = Control.control('person');
		if(res == true) {
			this.startGame();
		}
	}

	click2() {
		window.gamedata.swingType = 'team';
		let res = Control.control('team');
		if(res == true) {
			this.startGame();
		}
	}

	startGame() {
		this.state.start('Game');
	}
}

