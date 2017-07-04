/**
 * 设置缩放x
 */
const getX = (x) => {
    return x * window.innerWidth / 375;
}
/**
 * 设置缩放y
 */
const getY = (y) => {
    return y * window.innerHeight / 667;
}

export {
    getX,
    getY
}