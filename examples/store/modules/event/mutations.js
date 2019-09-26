export default {
    CHANGE_IS_MOVE(state, flag) {
        state.isMove = flag;
    },
    CHANGE_MOUSE_DOWN(state, flag){
        state.mouseDown = flag;
    },
    CHANGE_STICK(state){
        state.stickValue = !state.stickValue;
    }
}