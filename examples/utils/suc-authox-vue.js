import axios from "axios";
const authoxList = {};
const authoxCheck = (module) => {
    let items = module.split("|");
    if (!authoxList[module]) {
        authoxList[module] = new Promise((resolve, reject) => {
            let params = {};
            params['resource'] = items[0];
            params['op'] = items[1];
            axios.get("/rest/authox/check", {
                params: params
            }).then(res => {
                if (res.data.allowed) {
                    resolve();
                } else {
                    reject();
                }
            }).catch(err => {
                reject();
            });
        });
    }
    return authoxList[module];
};
export default {
    install: (Vue, options) => {
        const authoxList = {};
        Vue.directive('authox', {
            bind: (el, binding, vnode, oldVnode) => {
                let className = el.getAttribute("class");
                className = className.concat(" hidden");
                el.setAttribute("class", className)
                authoxCheck(binding.value).then(() => {
                    className = className.replace("hidden", "");
                    el.setAttribute("class", className);
                }).catch(() => {});
            }
        })
    }
}