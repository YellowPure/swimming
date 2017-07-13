/**
 * 设置缩放x
 */
const getX = (x) => {
    return x *window.devicePixelRatio;
}
/**
 * 设置缩放y
 */
const getY = (y) => {
    return y * window.devicePixelRatio;
}

const u = window.navigator.userAgent;
const isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
const isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端

/**
 * 设置宽度 只对android做适配
 * @param {*} width 
 */
const getW = (width) => {
    if(isAndroid) {
        return width * 375 / window.innerWidth;
    } else {
        return width;
    }
}

/**
 * 设置高度
 * @param {*} height 
 */
const getH = (height) => {
    return height * window.devicePixelRatio / 2;
}

export {
    getX,
    getY,
    getW,
    getH
}