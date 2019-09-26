import axios from 'axios';

//获取所有网站
export function getSiteList() {
    return axios.get('/core/srp/core/website/list')
    .then(res => res.data)
}

//删除网站
export function deleteSite(id) {
    return axios.get('/core/srp/core/website/delete',{
        params:{
            id: id
        }
    })
    .then(res => res.data);
}

//新建网站
export function addSite(name) {
    return axios({
        url: '/core/srp/core/website/add',
        method: 'post',
        params: {
            name: name
        }
    }).then(res => res.data)
}

//查看特定网站下的所有视图
export function getViewListsBySiteId(siteId) {
    return axios.get('/core/srp/core/view/listByWebsiteId',{
        params: {
            websiteId : siteId
        }
    })
    .then(res => res.data);
}

//查看所有视图
export function getAllViewLists() {
    return axios.get('core/srp/core/view/list')
    .then(res => res.data);
}

//新增视图
export function addView(siteId,title) {
    let arr = [];
    let params = new URLSearchParams();
    params.append('container',JSON.stringify(arr));
    params.append('websiteId',siteId);
    params.append('title',title);
    return axios.post('/core/srp/core/view/add',params)
    .then(res => res.data);
}

//删除视图
export function deleteView(viewId) {
    return axios.get('/core/srp/core/view/delete',{
        params: {
            id: viewId
        }
    })
    .then(res => res.data);
}
