import './style.css';
window.PIXI = require('pixi.js');
window.p2 = require('p2');
window.Phaser = require('phaser');

import Boot from './boot';
import Preloader from './preloader';
import MainMenu from './mainmenu';
import Game from './game';
import End from './end';
import './config.js';


/**
 * 团队排名
 * @type {Array}
 */
window.test_rank = [
	{"ranking":1,"totalAchievement":10000,"teamName":"团队测试1"},
	{"ranking":2,"totalAchievement":9000,"teamName":"团队测试2"},
	{"ranking":3,"totalAchievement":8000,"teamName":"团队测试3"},
	{"ranking":4,"totalAchievement":7000,"teamName":"团队测试4"},
	{"ranking":5,"totalAchievement":6000,"teamName":"团队测试5"},
	{"ranking":6,"totalAchievement":5000,"teamName":"团队测试6"},
	{"ranking":7,"totalAchievement":4000,"teamName":"团队测试7"},
	{"ranking":8,"totalAchievement":3000,"teamName":"团队测试8"},
	{"ranking":9,"totalAchievement":2000,"teamName":"团队测试9"},
	{"ranking":10,"totalAchievement":1000,"teamName":"团队测试10"}
];

class App {
	constructor() {
		let game = new Phaser.Game('100%', '100%', Phaser.CANVAS, 'app');
		game.state.add('Boot', new Boot(game));
		game.state.add('Preloader', new Preloader(game));
		game.state.add('MainMenu', new MainMenu(game));
		game.state.add('Game', new Game(game));
		game.state.start('Boot');
	}
}

window.onload = () => {
	const app = new App();
}