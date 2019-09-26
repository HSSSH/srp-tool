import axios from 'axios';
import { filterParams } from '@/utils/util';
//获取所有产品
export function getAllProduct(groupIds) {
    return axios.get('/source/srp/source/product/listAllProducts', {
        params: {groupIds:groupIds}
    })
        .then(res => res.data)
}
//获取所有人员
export function getAllLeader(groupIds) {
    return axios.get('/source/srp/source/employee/listAllEmployees', {
        params: {groupIds:groupIds}
    })
        .then(res => res.data)
}
//获取所有平台
export function getAllSection(groupIds) {
    return axios.get('/source/srp/source/department/listAllDepartments', {
        params: {groupIds:groupIds}
    })
        .then(res => res.data)
}
//获取对应领域的产品列表
export function getProductByGroupIds(params) {
    return axios.get('/source/srp/source/product/list', {
        params: params
    })
        .then(res => res.data)
}
//获取对应领域的人员列表
export function getLeaderByGroupIds(params) {
    return axios.get('/source/srp/source/employee/list', {
        params: params
    })
        .then(res => res.data)
}
//获取对应领域的平台列表
export function getSectionByGroupIds(params) {
    return axios.get('/source/srp/source/department/list', {
        params: params
    })
        .then(res => res.data)
}
//获取产品详情
export function getProductDetail(id) {
    return axios.get('/source/srp/source/product/get', {
        id: id
    })
        .then(res => res.data)
}
//获取人员详情
export function getLeaderDetail(id) {
    return axios.get('/source/srp/source/employee/get', {
        id: id
    })
        .then(res => res.data)
}
//获取平台详情
export function getSectionDetail(id) {
    return axios.get('/source/srp/source/department/get', {
        id: id
    })
        .then(res => res.data)
}
//新增产品
export function addProduct(params) {
    return axios({
        method: 'post',
        url: '/source/srp/source/product/add',
        params: filterParams(params)
    })
        .then(res => res.data)
}
//新增人员
export function addLeader(params) {
    return axios({
        method: 'post',
        url: '/source/srp/source/employee/add',
        params: filterParams(params)
    })
        .then(res => res.data)
}
//新增平台
export function addSection(params) {
    return axios({
        method: 'post',
        url: '/source/srp/source/department/add',
        params: filterParams(params)
    })
        .then(res => res.data)
}
//编辑产品
export function updateProduct(data) {
    return axios({
        method: 'post',
        url: '/source/srp/source/product/update',
        data: data
    })
        .then(res => res.data);
}
//编辑人员
export function updateLeader(data) {
    return axios({
        method: 'post',
        url: '/source/srp/source/employee/update',
        data: data
    })
        .then(res => res.data);
}
//编辑平台
export function updateSection(data) {
    return axios({
        method: 'post',
        url: '/source/srp/source/department/update',
        data: data
    })
        .then(res => res.data);
}
//删除产品
export function deleteProduct(params) {
    return axios.get('/source/srp/source/product/delete', {
        params: params
    })
        .then(res => res.data);
}
//删除人员
export function deleteLeader(params) {
    return axios.get('/source/srp/source/employee/delete', {
        params: params
    })
        .then(res => res.data);
}
//删除平台
export function deleteSection(params) {
    return axios.get('/source/srp/source/department/delete', {
        params: params
    })
        .then(res => res.data);
}
//获取所有产品领域
export function getAllProductGroup() {
    return axios.post('/source/srp/source/product/listAllGroup')
        .then(res => res.data);
}
//获取所有人员领域
export function getAllLeaderGroup() {
    return axios.post('/source/srp/source/employee/listAllGroup')
        .then(res => res.data);
}
//获取所有平台领域
export function getAllSectionGroup() {
    return axios.post('/source/srp/source/department/listAllGroup')
        .then(res => res.data);
}