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

export {
    getX,
    getY
}