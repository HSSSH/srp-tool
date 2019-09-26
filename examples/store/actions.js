import { getCurLoginUser } from '@/api/index';
export const getLoginUser = ({ commit }) => {
    return getCurLoginUser().then(data => {
        commit('receiveLoginUser',data.account);
    })
}
export const setPublishWebViewId = ({commit},viewId) => {
    commit('SET_PUBLISHWEBID',viewId);
}
