const dialog = $('#dialog');
const overlay = $('#overlay');

dialog.on('input', '.textarea-address', () => {
    if($('.textarea-address').val()!='') {
        $('.textarea-address').removeClass('address-add');
        $('.textarea-address').removeClass('address-edit');
    }
});

dialog.on('click', '.submit', () => {
    if($('.textarea-address').val() == '') {
        alert('请填写收货地址');
    }

    if($('.input-name').val() == '') {
        alert('请填写团队名称');
    }
    if($('.input-num').val() == '') {
        alert('请填写团队编号');
    }
    if($('.submit').hasClass('grey')) return;
    // ajax 请求 提交数据

});
/**
 * 创建团队弹窗
 */
const createTeam = () => {
    let str = `
        <div class='create-team'>
			<form>
            <input type='text' class='input-name' name='name' />
            <input type='text' class='input-num' name='num' />
            <textarea class='textarea-address address-add name='address'>
            </textarea>
            <button class='submit grey'></button>
            </form>
            <span class='close'></span>
		</div>
	`;
	dialog.html(str);
	if(overlay.is(':hidden')) {
		overlay.show();
	}
}

const createSuccess = () => {
    let str = `
        <div class='success-team'>
			
		</div>
	`;
	dialog.html(str);
	if(overlay.is(':hidden')) {
		overlay.show();
	}
}

export {
    createTeam
}