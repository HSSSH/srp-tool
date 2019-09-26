import Vue from 'vue';
import axios from 'axios';
let authoxCache = {};

export function getAuthox(resource, op) {
    const key = resource + '|||' + op;
    if (!authoxCache[key]) {        
        const deferred = new Promise((resolve, reject) => {
            if (resource === '$$root') {
                resolve();
            } else { 
                axios.get("/rest/authox/check", {
                    params: {
                        resource,
                        op
                    }
                }).then((res) => {
                    const result = res.data;
                    // result 是一个形如 { allowd: true } 的对象
                    if (result.allowed) {
                        resolve();
                    } else {
                        reject();
                    }
                }).catch(function () {
                    reject();
                });
            }
        });       
        authoxCache[key] = deferred;
    }
    return authoxCache[key];
}

export function clearAuthoxCache() { //退出登录时需调用该方法清空权限缓存
    authoxCache = {};
}

/*
* 单一权限 authox-resource="{name: 're | op'}"
* 或 authox-resource="{name: 're | op || re1 | op1'}"
* 与 authox-resource="{name: 're | op && re1 | op1'}"
*/
Vue.directive('authoxResource', function (el, binding) {
    el.classList.add('authoxhidden');
    if (binding.value.name.split('||').length) {
        const authoxs = binding.value.name.split('||');
        authoxs.forEach(authox => {
            setAuthox(authox).then(() => {
                el.classList.remove('authoxhidden');
            }, ()=>{});
        });
    } else if (binding.value.name.split('&&').length) {
        const authoxs = binding.value.name.split('||');
        Promise.all(authoxs.map(authox => {
            return setAuthox(authox);
        })).then(() => {
            el.classList.remove('authoxhidden');
        }, ()=>{});
    } else {
        setAuthox(binding.value.name).then(() => {
            el.classList.remove('authoxhidden');
        }, ()=>{});
    }    
})

function setAuthox(authox) {
    const temp = authox.split('|');
    const resourceName = temp[0].trim();
    const op = temp[1] ? temp[1].trim() : 'ACCESS';    
    return getAuthox(resourceName, op);
}

Vue.directive('authoxResourceMutex', function (el, binding) { //反向权限，有权限时隐藏
    const temp = binding.value.name.split('|');
    const resourceName = temp[0].trim();
    const op = temp[1] ? temp[1].trim() : 'ACCESS';
    el.classList.add('authoxhidden');
    getAuthox(resourceName, op).then(() => {
    }, () => {      
        el.classList.remove('authoxhidden');  
    });
})