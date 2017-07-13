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
    return window.gamedata.mainInit();
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
    return window.gamedata.personClick();
}

const teamControl = () => {
    return window.gamedata.teamClick();
}

// 记录按钮被点击
$('.record-btn').on('click', () => {
    // do something
    console.log('record-btn click');
});
// 规则按钮被点击
$('.rule-btn').on('click', () => {
    // do something
    console.log('rule-btn click');
});

const module = {
    control,
    init
};

window.gamedata.modules.control = module;

export default module;
