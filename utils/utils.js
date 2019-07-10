/**
 * 时间戳转化为年 月 日 时 分 秒
 * number: 传入时间戳
 * format：返回格式，支持自定义，但参数必须与formateArr里保持一致
 */
function formatTime(number, format) {

    var formateArr = ['Y', 'm', 'd', 'H', 'i', 's'];
    var returnArr = [];

    var date = new Date(number * 1000);
    returnArr.push(date.getFullYear());
    returnArr.push((date.getMonth() + 1));
    returnArr.push((date.getDate()));

    returnArr.push((date.getHours()));
    returnArr.push((date.getMinutes()));
    returnArr.push((date.getSeconds()));

    for (var i in returnArr) {
        format = format.replace(formateArr[i], returnArr[i]);
    }
    return format;
}


module.exports = {
    formatTime: formatTime
}
