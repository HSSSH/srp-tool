import axios from 'axios';

//新增源分组
export function addGroup({name,type}) {
    return axios({
        method: 'post',
        url: '/source/srp/source/sourceGroup/add',
        params: {name,type}
    })
    .then(res => res.data)
}

//删除源分组
export function deleteGroup(id) {
    return axios({
        method: 'post',
        url: '/source/srp/source/sourceGroup/delete',
        params: { id: id}
    })
    .then(res => res.data)
}

//根据获取源分组列表
export function getGroupsListByType(type) {
    return axios({
        method: 'post',
        url: '/source/srp/source/sourceGroup/listByType',
        params: {type: type}
    })
    .then(res => res.data);
}