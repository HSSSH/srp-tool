import axios from 'axios';

//通过视图id获取视图内容
export function getLayoutListByViewId(id) {
    return axios.get('/core/srp/core/view/get',{
        params: {
            id: id
        }
    })
    .then(res => res.data);
}

//保存视图
export function saveView(layout,viewId) {
    let params = new URLSearchParams();
    params.append('container',JSON.stringify(layout));
    params.append('id',viewId);
    return axios.post('/core/srp/core/view/update',params
    )
    .then(res => res.data);
}

//保存公共导航栏
export function saveNavigate(websiteId,config) {
    let params = new URLSearchParams();
    params.append('navigation',JSON.stringify(config));
    params.append('websiteId',websiteId);
    return axios.post('/core/srp/core/comresource/syncNavigation',params
    )
    .then(res => res.data);
}

//保存公共底部栏
export function saveButtom(websiteId,config) {
    let params = new URLSearchParams();
    params.append('navigation',JSON.stringify(config));
    params.append('websiteId',websiteId);
    return axios.post('/core/srp/core/comresource/syncButtom',params
    )
    .then(res => res.data);
}

//根据命名空间获取网站首页视图
export function getPublishedView(namespace,url) {
    let str = namespace == ''?'/core/srp/core/published/publishedWebsiteHomeView':('/core/srp/core/published/publishedWebsiteHomeView/' + namespace)
    return axios.get(str,{
        params:{
            url:url
        }
    }).then(res => res.data)
}

//发布网站
export function setPublishWeb(webId) {
    return axios.get('/core/srp/core/website/publish',{
        params:{
            id:webId
        }
    }).then(res => res.data)
}

//取消发布网站
export function setUnPublishWeb(webId) {
    return axios.get('/core/srp/core/website/unpublish',{
        params:{
            id:webId
        }
    }).then(res => res.data)
}