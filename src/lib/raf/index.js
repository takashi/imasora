/**
 * raf
 */
module.exports = function () {
    var fps = 60;
    window.requestAnimationFrame = (function () {
        return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        function (callback) {
            window.setTimeout(callback, 1000 / fps);
        };
    })();
};