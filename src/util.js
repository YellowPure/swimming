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

/**
 * 设置宽度
 * @param {*} width 
 */
const getW = (width) => {
    return width * window.devicePixelRatio / 2;
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