const dialog = $('#dialog');
const overlay = $('#overlay');
/**
 * 游戏状态 未开始 | 已结束
 * @param  {[type]} type [description]
 * @return {[type]}      [description]
 */

// dialog.on('click', '.close', () => {
// 	if(!overlay.is(':hidden')) {
// 		overlay.hide();
// 	}
// });

// dialog.on('click', '.create', () => {
// 	if(!overlay.is(':hidden')) {
// 		overlay.hide();
// 	}
// });

const showDialog1 = (type) => {
	let title = '';
	if (type == 1) {
		title = '游戏未开始';
	} else if(type == 2) {
		title = '游戏已结束';
	}
	let str = `
		<h3>${title}</h3>
		<div>
		<p>开放时间
		<br />
		2017.12.12 12:00
		<br />
		至
		<br />
		2017.12.12 12:01
		</p>
		<button class='close'>知道了</button>
		</div>
	`;
	dialog.html(str);
	if(overlay.is(':hidden')) {
		overlay.show();
	}
}

const showDialog2 = () => {
	let str = `
		<h3>无法开始</h3>
		<div>
		<p>每天有3次机会，今天您已经玩了3次了，明天再来吧！</p>
		<button class='close'>知道了</button>
		</div>
	`;
	dialog.html(str);
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

export {
	showDialog1,
	showDialog2,
	showDialog3,
	showDialog4,
	showDialog5
}