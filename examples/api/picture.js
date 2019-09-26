import axios from 'axios';
import { filterParams } from '@/utils/util';
// import { host } from '@/services/constant';

export function getAllPicturesList() {
    return axios({
        method:'GET',
        url: "/source/srp/source/manage/listAllPicture",
    })
    .then(res => res.data)
    .then(data => {
        data.map(item => {
            item.selected = false;
            let keys = Object.keys(item);
            keys.map(key => {
                if (key=='url') {
                    item[key] = item[key];
                } else if (key=='smallPicUrl') {
                    item[key] = item[key];
                } 
            })
        });
        return data;
    })
}

export function getPictureByGroup(param) {
    return axios({
        method:'GET',
        url: "/source/srp/source/manage/listByGroupId",
        params: param
    })
    .then(res => {
        return res.data;
    })
}

export function addPicture(pictureObj) {
    return axios({
        method: 'post',
        url: '/source/srp/source/manage/addPicture',
        params: filterParams(pictureObj)
    }).then(res => res.data);
}

export function deletePicture(id) {
    return axios({
        method:'GET',
        url: "/source/srp/source/manage/deletePic",
        params: {id:id}
    })
    .then(res => {
        return res.data;
    })
}