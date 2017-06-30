import './style.css';
window.PIXI = require('pixi.js');
window.p2 = require('p2');
window.Phaser = require('phaser');

import Boot from './boot';
import Preloader from './preloader';
import MainMenu from './mainmenu';
import Game from './game';
import End from './end';

class App {
	constructor() {
		let game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.CANVAS, 'app');

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