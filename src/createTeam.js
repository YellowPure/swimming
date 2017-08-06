import Data from './data';

const dialog = $('#dialog');
const overlay = $('#overlay');

dialog.on('input', '.textarea-address', () => {
    if($('.textarea-address').val()!='') {
        $('.table').removeClass('address-add');
        $('.table').removeClass('address-edit');
    }
});

dialog.on('click', '.submit', () => {
    if($('.textarea-address').val() == '') {
        alert('请填写收货地址');
        return;
    }

    if($('.input-name').val() == '') {
        alert('请填写团队名称');
        return;
    }
    if($('.input-num').val() == '') {
        alert('请填写团队编号');
        return;
    }
    $('.submit').removeClass('grey');
    // ajax 请求 提交数据
    createSuccess();
});

dialog.on('click', '.close', () => {
	if(!overlay.is(':hidden')) {
		overlay.hide();
	}
});

dialog.on('click', '.start-btn', () => {
	if(!overlay.is(':hidden')) {
		overlay.hide();
	}
    Data.mainMenu.startGame();
});

/**
 * 创建团队弹窗
 */
const createTeam = (type = 1) => {
    let cl = type == 1 ? 'address-add' : '';
    let dom = type == 1 ? '' : `<span class='address-edit'></span>`;
    let str = `
        <div class='create-team'>
			<form>
            <input type='text' class='input-name' name='name' />
            <input type='text' class='input-num' name='num' />
            ${dom}
            <div class='table  ${cl}'>
            <textarea class='textarea-address' rows='3'  name='address'>
            </textarea>
            </div>
            <span class='submit grey'></span>
            </form>
            <span class='close'></span>
		</div>
	`;
	dialog.html(str);
	if(overlay.is(':hidden')) {
		overlay.show();
	}

	// var $textarea = $('textarea-address');

    // function positionTextarea() {
    //     var h = $wrap.height();
    //     var top = Math.max( 0, ( h - $dummy.height() ) * 0.5 );
    //     $textarea.css({
    //     paddingTop: top,
    //     height: h - top
    // });
    
    // $textarea.on( 'keyup change', function( event ) {
	// 	positionTextarea();
    // }).trigger('change');
}

const createSuccess = () => {
    let str = `
        <div class='success-team'>
            <div>
			<p>团队名称：王小二</p>
			<p>团队编号：0214895</p>
            <div class='adr'>
                王小二 13445674567<br/>
                湖北省武汉市洪山区光谷步行街128号烟酒行
            </div>
            <span class='start-btn'></span>
            </div>
		</div>
	`;
	dialog.html(str);
	if(overlay.is(':hidden')) {
		overlay.show();
	}
}

export {
    createTeam,
    createSuccess
}