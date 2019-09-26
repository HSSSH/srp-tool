export default {
    changeIsMove({commit},flag) {
        commit('CHANGE_IS_MOVE', flag);
    },
    changeMouseDown({commit},flag) {
        commit('CHANGE_MOUSE_DOWN', flag);
    },
    changeStick({commit}) {
        commit('CHANGE_STICK');
    },
};
