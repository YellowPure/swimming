import Data from './data';

const dialog = $('#dialog');
const overlay = $('#overlay');
/**
 * 新手引导
 */
dialog.on('click', '.long-btn', () => {
	guide2();
});

dialog.on('click', '.next-btn', () => {
	guide3();
});


dialog.on('click', '.prev-btn', () => {
	guide1();
});

dialog.on('click', '.prev-btn2', () => {
	guide2();
});

dialog.on('click', '.next-btn2', () => {
	if(!overlay.is(':hidden')) {
		overlay.hide();
	}
	// Data.mainMenu.startGame();
});

const guide1 = () => {
	let str = `
        <div class='guide'>
			<div class='guide1'></div>
			<span class='long-btn'></span>
		</div>
	`;
	dialog.html(str);
	if(overlay.is(':hidden')) {
		overlay.show();
	}
}

const guide2 = () => {
	let str = `
        <div class='guide'>
			<div class='guide2'></div>
			<span class='prev-btn'></span>
			<span class='next-btn'></span>
		</div>
	`;
	dialog.html(str);
	if(overlay.is(':hidden')) {
		overlay.show();
	}
}

const guide3 = () => {
	let str = `
        <div class='guide'>
			<div class='guide3'></div>
			<span class='prev-btn2'></span>
			<span class='next-btn2'></span>
		</div>
	`;
	dialog.html(str);
	if(overlay.is(':hidden')) {
		overlay.show();
	}
}


export {
	guide1
}