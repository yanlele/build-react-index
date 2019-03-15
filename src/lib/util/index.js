/**
 * 获取url的query
 */
export function getQuery(param) {
    const reg = new RegExp(`(^|&)${param}=([^&]*)(&|$)`);
    const r = window.location.search.substr(1).match(reg);
    return r != null ? decodeURIComponent(r[2]) : null;
}

/**
 * 获取cookie
 */
export function getCookie(name) {
    const reg = new RegExp(`(^| )${name}=([^;]*)(;|$)`);
    const match = document.cookie.match(reg);
    return match ? match[2] : null;
}

/**
 * 将 Date 转化为指定格式的String
 * 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
 * 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
 * 例子：
 * formatDate(new Date(), "yyyy-MM-dd hh:mm:ss.S") => 2006-07-02 08:09:04.423
 * formatDate(new Date(), "yyyy-M-d h:m:s.S") => 2006-7-2 8:9:4.18
 */
export function formatDate(date, format = 'yyyy-MM-dd hh:mm:ss') {
    if (Object.prototype.toString.call(date) !== '[object Date]') {
        return null;
    }
    let fmt = format;
    const o = {
        'M+': date.getMonth() + 1, // 月份
        'd+': date.getDate(), // 日
        'h+': date.getHours(), // 小时
        'm+': date.getMinutes(), // 分
        's+': date.getSeconds(), // 秒
        'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
        S: date.getMilliseconds(), // 毫秒
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (`${date.getFullYear()}`).substr(4 - RegExp.$1.length));
    }
    let tmp;
    Object.keys(o).forEach((k) => {
        if (new RegExp(`(${k})`).test(fmt)) {
            tmp = o[k];
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? tmp : (`00${tmp}`).substr((`${tmp}`).length));
        }
    });
    return fmt;
}

