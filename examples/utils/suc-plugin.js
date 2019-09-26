const utils = {
    //时间戳转换成自定义字符串
    dateFormat: (date, fmt) => {
        let dateList = {
            "M+": date.getMonth() + 1,
            "d+": date.getDate(),
            "H+": date.getHours(),
            "m+": date.getMinutes(),
            "s+": date.getSeconds(),
            "q+": Math.floor((date.getMonth() + 3) / 3),
            "S+": date.getMilliseconds()
        };
        if (/(y+)/i.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
        }
        for (var k in dateList) {
            if (new RegExp("(" + k + ")").test(fmt)) {
                fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? dateList[k] : ("00" + dateList[k]).substr(("" + dateList[k]).length));
            }
        }
        return fmt;
    }
}

export default {
    install: (Vue, options) => {
        //时间转换过滤器
        Vue.filter('dateFormat', (date, fmt) => {
            date = new Date(date);
            let dateList = {
                "M+": date.getMonth() + 1,
                "d+": date.getDate(),
                "H+": date.getHours(),
                "m+": date.getMinutes(),
                "s+": date.getSeconds(),
                "q+": Math.floor((date.getMonth() + 3) / 3),
                "S+": date.getMilliseconds()
            };
            if (/(y+)/i.test(fmt)) {
                fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
            }
            for (var k in dateList) {
                if (new RegExp("(" + k + ")").test(fmt)) {
                    fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? dateList[k] : ("00" + dateList[k]).substr(
                        ("" + dateList[k]).length));
                }
            }
            return fmt;
        });

        Vue.prototype.$utils = utils;
    }
}
