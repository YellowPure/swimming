import './style.css';
window.PIXI = require('pixi.js');
window.p2 = require('p2');
window.Phaser = require('phaser');

import Boot from './boot';
import Preloader from './preloader';
import MainMenu from './mainmenu';
import Game from './game';
// import End from './end';
import Data from './data';
import Control from './control.js';

class App {
	constructor() {
		let game = new Phaser.Game(750, 1206, Phaser.AUTO, 'app');
		let boot = new Boot(game);
		// alert('test'); 
		let preloader = new Preloader(game);
		let mainMenu = new MainMenu(game);
		let _game = new Game(game);
		Data.boot = boot;
		Data.preloader = preloader;
		Data.mainMenu = mainMenu;
		Data.game = _game;
		game.state.add('Boot', boot);
		game.state.add('Preloader', preloader);
		game.state.add('MainMenu', mainMenu);
		game.state.add('Game', _game);
		game.state.start('Boot');
	}
}

window.onload = () => {
	const app = new App();
}