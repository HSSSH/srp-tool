import Vue from 'vue';
export default {
    receiveLoginUser(state,user) {
        Vue.set(state,'loginUser',user)
    },
    SET_PUBLISHWEBID(state,viewId){
        Vue.set(state,'publishWebViewId',viewId)
    }
}