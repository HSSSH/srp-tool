import axios from 'axios';
import { filterParams } from '@/utils/util';

//获取所有的文档
export function getDocuments({groupId,pageNo,pageSize,name}) {
    return axios.get('/source/srp/source/manage/listDoc',{
        params: filterParams({groupId,pageNo,pageSize,name})
    })
    .then(res => res.data);
}

//新增文档源
export function addDocument(docItem) {
    return axios({
        method: 'post',
        url: '/source/srp/source/manage/addDoc',
        params: filterParams(docItem)
    })
    .then(res => res.data)
}

//编辑文档源
export function updateDocument({groupId,id,name}) {
    return axios({
        method: 'post',
        url: '/source/srp/source/manage/updateDoc',
        params: filterParams({groupId,id,name})
    })
    .then(res => res.data);
}