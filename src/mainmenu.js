import { showDialog1, showDialog2,showDialog3, showDialog5 } from './dialogs.js';
import { guide1 } from './guide.js';
import { createTeam, createSuccess } from './createTeam.js';
import {getX, getY, getW, getH} from './util.js';
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

		this.controlState1 = false;
	}

	create() {
		console.log('MainMenu create');
		//我们已经把所有资源都加载进来了，所以，现在可以进入主菜单
		//在这里，我们将播放一段音乐，添加一张图片和一个按钮
		let bg = this.add.sprite(0, 0,  'main');
		bg.width = 750;
		bg.height = 1334;
		// bg.scale.setTo(1.5, 1.5);
		// this.loadingText = this.add.text(this.game.width / 2, this.game.height / 2 - 80, '开始游戏', { font: '50px', fill: '#fff'});
		// this.loadingText.anchor.setTo(.5, .5);
		// this.rankdata = window.test_rank;
		this.displayGroup = this.game.add.group();

		let minLen = Math.min(4, window.test_rank.length);

		let ys = [];
		for(let i = 0;i < minLen; i++) {
			let y = Math.floor(400 + i * 700 / 4);
			ys.push(y);
		}

		while(ys.length > 0) {
			let i = Math.floor(Math.random() * ys.length);
			let data = window.test_rank[i];
			// console.log(data);
			let person = this.displayGroup.create(this.game.width + i * 170, ys[i], 'report');
			let text = this.make.text(110, 2, data.teamName + '游出' + data.totalAchievement + '米', { font: '22px', fill: '#fff'});
			person.addChild(text);
			ys.splice(i, 1);
		}


		this.bridge = this.add.sprite(0, 350, 'bridge');
		
		let grass = this.add.sprite(0, this.game.height - 150, 'grass');

		this.tBtn = this.add.button(this.game.width / 2 - 320, this.game.height - 180, 'team_btn', this.click2, this);
		this.sfBtn = this.add.button(this.game.width / 2 + 20, this.game.height - 180, 'self_btn', this.click1, this);
		// createSuccess();
		this.controlState1 = Control.init();

		$('.record-btn').show();
		$('.rule-btn').show();
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
		this.controlState1 = Control.init();
		// if(this.controlState1 != true) {
		// 	Control.init();
		// 	return;
		// }
		this.controlState1 = Control.init();
		if(this.controlState1 != true) {
			return;
		}
		let res = Control.control('person');
		if(res == true) {
			this.startGame();
		}
	}

	click2() {
		window.gamedata.swingType = 'team';
		this.controlState1 = Control.init();

		if(this.controlState1 != true) {
			return;
		}

		// if(this.controlState1 != true) {
		// 	Control.init();
		// 	return;
		// }
		let res = Control.control('team');
		if(res == true) {
			this.startGame();
		}
	}

	startGame() {
		this.state.start('Game');
	}
}

