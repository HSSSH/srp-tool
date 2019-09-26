import axios from 'axios';
import { filterParams } from '@/utils/util';
//新增文章
export function addArticle({ applicant,content,title,groupId,titlePic,des }) {
    return axios({
        method: 'post',
        url: '/source/srp/source/article/add',
        params: filterParams({ applicant,content,title,groupId,titlePic,des })
    })
    .then(res => res.data)
}

//删除文章
export function deleteArticle(id) {
    return axios.get('/source/srp/source/article/delete',{
        params: {
            id: id
        }
    })
    .then(res => res.data);
}

//编辑文章
export function updateArticle(article) {
    return axios({
        method: 'post',
        url: '/source/srp/source/article/update',
        data: article
    })
    .then(res => res.data);
}

//获取单篇文章的详情
export function getArticle(id) {
    return axios.get('/source/srp/source/article/get', {
        params: {
            id: id
        }
    })
    .then(res => res.data)
}

//获取所有文章
export function getAllArticles({pageNo, pageSize, title, groupId, tagId}) {
    return axios.get('/source/srp/source/article/list',{
        params: filterParams({pageNo,pageSize,title,groupId,tagId})
    })
    .then(res => res.data)
}

//获取所有的分组
export function getAllGroup() {
    return axios.get('/source/srp/source/articleGroup/list')
    .then(res => res.data);
}

//查询文章
export function findArticleByTitle(title) {
    return axios({
        method: 'post',
        url: '/source/srp/source/article/searchTitle',
        params: {
            title:title,
        }
    }) 
    .then(res => res.data);

}

//根据文章id查询所在页码
export function getPageNoByArticleId(articleId) {
    return axios.get('/source/srp/source/article/getPageNoByArticleId',{
        params: {
            articleId: articleId,
            useGroupId: true
        }
    })
    .then(res => res.data);
}