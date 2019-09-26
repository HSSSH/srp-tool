import axios from 'axios';

export function  getTagsListByGroupId(groupId) {
    return axios.get('/source/srp/source/articleTag/listByGroupId',{
        params: {
            groupId: groupId
        }
    })
    .then(res => res.data);
}