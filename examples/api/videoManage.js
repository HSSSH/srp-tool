import axios from 'axios';
import { filterParams } from '@/utils/util';

export function addVideo(videoItem) { //保存视频
    return axios({
        method: 'post',
        url: '/source/srp/source/video/addVideo',
        params: videoItem
    })
    .then(res => res.data);
}

/*export function getVideo(videoId) {
    return axios.get('/source/srp/source/video/get', {
        params: {
            id: videoId
        }
    })
    .then(res => res.data);
}*/

export function getAllVideos() { //获取所有视频
    return axios.get('/source/srp/source/video/listAllVideo')
    .then(res => res.data);
}