import axios from 'axios';

export function login({username,password}) {
    return axios({
        url: '/login',
        method: 'post',
        data: {
            username,
            password
        },
        transformRequest: [function(data) {
            let ret = ''
            for (let it in data) {
                ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
            }
            return ret;
        }],
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
    .then(res => res.data);
}

export function getCurLoginUser() {
    return axios.get('/rest/authox/curUser').then(res => res.data);
}

export function logout() {
    return axios.get('/logout').then(res => res.data);
}