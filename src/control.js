import {
    showDialog1,
	showDialog2,
	showDialog3,
	showDialog4,
	showDialog5
} from './dialogs.js';

import {guide1} from './guide.js';
import {
    createTeam,
    createSuccess
} from './createTeam.js';

const init = () => {
    const starttime = new Date(window.initGame.gameBeginTime).getTime();
    const endtime = new Date(window.initGame.gameEndTime).getTime();
    // 检查活动是否在规定时间内
    if(starttime > Date.now()) {
        showDialog1(1);
        return false;
    }
    if(endtime < Date.now()) {
        showDialog1(2);
        return false;
    }
    
    // 首次玩
    if(window.initGame.gameState == 2) {
        guide1();
        window.gamedata.updateFristGameState();
        return false;
    }
    if(window.initGame.teamState == 2) {
        showDialog3(2);
        return false;
    }
    return true;
}

const control = (type = 'person') => {
    let result;
    if(type == 'team') {
        result = teamControl();
    } else if(type == 'person') {
        result = selfControl();
    }
    return result;
}

const selfControl = () => {

    if(window.initGame.personalCount >= 3) {
        showDialog2('person');
        return false;
    }
    return true;
}

const teamControl = () => {
    // 是否加入团队 1 未加入 2已加入
    if(window.initGame.isTeam == 1) {
        showDialog3(1);
        return false;
    }
    //  else if(window.initGame.isTeam == 2) {
    //     // 1在2踢出3退出
    //     if(window.initGame.teamState == 2) {
    //         showDialog3(2);
    //         return false;
    //     }
    // }

    if(window.initGame.teamCount >= 3) {
        showDialog2('tean');
        return false;
    }
    return true;
}

// 记录按钮被点击
$('.record-btn').on('click', () => {
    // do something
    console.log('record-btn click');
    createTeam(1);
});
// 规则按钮被点击
$('.rule-btn').on('click', () => {
    // do something
    console.log('rule-btn click');
    createTeam(2);
});

export default {
    control,
    init
}
