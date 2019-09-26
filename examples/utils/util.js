/**
 * Get the first item that pass the test
 * by second argument function
 *
 * @param {Array} list
 * @param {Function} f
 * @return {*}
 */
export function find(list, f) {
    return list.filter(f)[0]
}

/**
 * Deep copy the given object considering circular structure.
 * This function caches all nested objects and its copies.
 * If it detects circular structure, use cached copy to avoid infinite loop.
 *
 * @param {*} obj
 * @param {Array<Object>} cache
 * @return {*}
 */
export function deepCopy(obj, cache = []) {
    // just return if obj is immutable value
    if (obj === null || typeof obj !== 'object') {
        return obj
    }

    // if obj is hit, it is in circular structure
    const hit = find(cache, c => c.original === obj)
    if (hit) {
        return hit.copy
    }

    const copy = Array.isArray(obj) ? [] : {}
    // put the copy into cache at first
    // because we want to refer it in recursive deepCopy
    cache.push({
        original: obj,
        copy
    })

    Object.keys(obj).forEach(key => {
        copy[key] = deepCopy(obj[key], cache)
    })

    return copy
}

/**
 * forEach for object
 */
export function forEachValue(obj, fn) {
    Object.keys(obj).forEach(key => fn(obj[key], key))
}

export function isObject(obj) {
    return obj !== null && typeof obj === 'object'
}

export function isPromise(val) {
    return val && typeof val.then === 'function'
}

export function assert(condition, msg) {
    if (!condition) throw new Error(`[vuex] ${msg}`)
}

export function filterParams(params) {
    const keys = Object.keys(params).filter(key => params[key] !== '');
    const postParams = {};
    keys.forEach(key =>{
        postParams[key] = params[key];
    });
    return postParams;
}

export function getNowDate() {
    const nowTime = new Date();
    nowTime.setHours(0);
    nowTime.setMinutes(0);
    nowTime.setSeconds(0);
    nowTime.setMilliseconds(0);
    return nowTime;
}

export function getFutureDate(timeDelay) {
    const futureTime = new Date().getTime() + timeDelay;
    const futureDate = new Date(futureTime);
    futureDate.setHours(0);
    futureDate.setMinutes(0);
    futureDate.setSeconds(0);
    futureDate.setMilliseconds(0);
    return futureDate;
}

export function formatDate(date) {
    return date.getFullYear() + '-' +
        ((date.getMonth() + 1) < 10 ?  '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-' +
        (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) +  ' ' +
        (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) +  ':' +
        (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) +  ':' +
        (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
}

export function getNumYear(date) {
    return date.getFullYear();
}

export function transformToDate(time) {
    if (typeof time === 'number') {
        return new Date(time);
    } else if (typeof time === 'string') {
        const date = new Date(Date.parse(time))
        return date == 'Invalid Date' ? new Date() : date;
    } else if (time instanceof Date) {
        return time;
    } else {
        return new Date();
    }
}

export function getTimeByDateString(dateStr) {
    return new Date(dateStr.replace(/-/g,"/")).getTime();
}

export function getObjByKeyInArr(arr, key, value) {
    for (let i = 0; i < arr.length; i++)
        if (arr[i][key] == value) {
            return arr[i];
        }
    return null;
}


export function getMonthScope(startTime, endTime) {
    var totalMonths = 0;
    var smallPart = 0;
    if(startTime && endTime){
        var startYear = startTime.getFullYear(); //获取完整的年份(4位)
        var startMonth = startTime.getMonth()+1; //获取当前月份(0-11,0代表1月)
        var startDay = startTime.getDate(); //获取当前日(1-31)
        var endYear = endTime.getFullYear(); //获取完整的年份(4位)
        var endMonth = endTime.getMonth()+1; //获取当前月份(0-11,0代表1月)
        var endDay = endTime.getDate(); //获取当前日(1-31)

        if(endDay >= startDay - 1){
            totalMonths = (endYear - startYear)*12+(endMonth - startMonth);
            smallPart = ((endDay - startDay + 1) / 30).toFixed(2);
        }
        else {
            totalMonths = (endYear - startYear)*12+(endMonth - startMonth)-1;
            var dayRemains = 0;
            if (startMonth == 2) {
                if (startMonth % 4 == 0) { //29
                    dayRemains = 29;
                } else { //28
                    dayRemains = 28;
                }
            } else if (startMonth % 2 == 0) { //30
                dayRemains = 30;
            } else {  //31
                dayRemains = 31;
            }
            smallPart = (((dayRemains - startDay + 1) + endDay) / 30).toFixed(2);
        }
    }
    return totalMonths+parseFloat(smallPart);
}

//数组里面的对象值
export function isHasNull (arr) {
    let len = arr.length;
    for (let i = 0; i < len; i++) {
        let values = Object.values(arr[i]);
        if (values.some(value => value ===''|| value===null)) {
            return true;
        }
    }
    return false;
}

//对象里的值是否有空值
export function isObjectHasNull(obj) {
    let values = Object.values(obj);
    values.some((value) => {
        return value ==='' || value===null;
    })
    return false;
}

// 获取一天的起始时间（当天的00:00:00）
export function startDateString(date) {
    let newDate = (date instanceof Date) ? date: new Date(date.replace(/-/g, '/'));
    if (newDate.toString() === "Invalid Date") {
        return "";
    } else {
        newDate.setHours(0, 0, 0, 0);
        return formatDate(newDate);
    }
}

// 获取一天的结束时间（当天的23:59:59）
export function endDateString(date) {
    let newDate = (date instanceof Date) ? date: new Date(date);
    if (newDate.toString() === "Invalid Date") {
        return "";
    } else {
        newDate.setHours(23, 59, 59, 0);
        return formatDate(newDate);
    }
}

//储存cookie
export function setCookie(key, value, iDay) {
    var oDate = new Date();
    oDate.setDate(oDate.getDate() + iDay);
    document.cookie = key + '=' + value + ';expires=' + oDate;

}
//删除cookie
export function removeCookie(key) {
    setCookie(key, '', -1);//这里只需要把Cookie保质期退回一天便可以删除
}
//查询cookie
export function getCookie(key) {
    var cookieArr = document.cookie.split('; ');
    for(var i = 0; i < cookieArr.length; i++) {
        var arr = cookieArr[i].split('=');
        if(arr[0] === key) {
            return arr[1];
        }
    }
    return false;
}

//判断是否为JSON字符串
export function isJSON(str) {
    if (typeof str == 'string') {
        try {
            JSON.parse(str);
            return true;
        } catch(e) {
            return false;
        }
    }
}

