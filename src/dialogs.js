import {createTeam} from './createTeam.js';
import Data from './data';
const dialog = $('#dialog');
const overlay = $('#overlay');
/**
 * 游戏状态 未开始 | 已结束
 * @param  {[type]} type [description]
 * @return {[type]}      [description]
 */

dialog.on('click', '.know', () => {
	if(!overlay.is(':hidden')) {
		overlay.hide();
	}
});

dialog.on('click', '.wait', () => {
	if(!overlay.is(':hidden')) {
		overlay.hide();
	}
});

dialog.on('click', '.create', () => {
	if(!overlay.is(':hidden')) {
		overlay.hide();
	}
	createTeam();
});

const showDialog1 = (type = 1) => {
	let title = '';
	if (type == 1) {
		title = 'no-start';
	} else if(type == 2) {
		title = 'end';
	}
	let str = `
		<div class='${title}'>
			<div>
			<p><span class='title'>开放时间</span>
			<br />
			${window.initGame.gameBeginTime}
			<br />
			至
			<br />
			${window.initGame.gameEndTime}
			</p>
			<span class='know'></span>
			</div>
		</div>
		
	`;
	dialog.html(str);
	if(overlay.is(':hidden')) {
		overlay.show();
	}
	Data.mainMenu.setBtnGrey();
}

const showDialog2 = (type='person') => {
	let count = type == 'person' ? window.initGame.personalCount: window.initGame.teamCount;
	let str = `
		<div class='cannot'>
			<span class='total'>3</span>
			<span class='cur'>${count}</span>
			<span class='know'></span>
		</div>
	`;
	dialog.html(str);
	if(overlay.is(':hidden')) {
		overlay.show();
	}
}
/**
 * 
 * @param {*} type 1 没团队 2 踢出
 */
const showDialog3 = (type = 1) => {
	let str, title;
	if (type == 1) {
		str = 'no-create';
		title = '';
	} else if(type == 2) {
		str = 'out-team';
		title = `${window.initTeam.teamName}`;
	}	
	let txt = `
		<div class='${str}'>
			<span class='team-name'>${title}</span>
			<span class='wait'></span>
			<span class='create'></span>
		</div>
	`;
	dialog.html(txt);
	if(overlay.is(':hidden')) {
		overlay.show();
	}
}

const showDialog4 = (type) => {
	let str, title;
	if (type == 1) {
		title = '很遗憾';
		str = '由于九一那年团队的创建者将您踢出了团队，您需要重新加入其他团队，或者创建您自己的团队。';
	} else if(type == 2) {
		title = '提示';
		str = '您还没有创建，加入团队哦';
	}
	let txt = `
		<h3>${title}</h3>
		<div>
		<p>${str}</p>
		<button class='close'>等待邀请</button>
		<button class='create'>创建团队</button>
		</div>
	`;
	dialog.html(txt);
	if(overlay.is(':hidden')) {
		overlay.show();
	}
}

const showDialog5 = () => {
	let txt = `
		<h3>创建团队</h3>
		<div>
		<form>
			<p>
				<label>团队名称：</label>
				<input type='text' />
			</p>
			<p>
				<label>团队编号：</label>
				<input type='text' />
			</p>
			<p>
				收货信息:
				<textarea row='20'></textarea>
			</p>
			<button>确定</button>
		</form>
		</div>
	`;
	dialog.html(txt);
	if(overlay.is(':hidden')) {
		overlay.show();
	}
}

const module = {
	showDialog1,
	showDialog2,
	showDialog3,
	showDialog4,
	showDialog5
};

window.gamedata.modules.dialogs = module;

export default module;