import Vue from 'vue';
import Vuex from 'vuex';
import rect from './modules/rect';
import event from './modules/event';
import * as actions from './actions';
import mutations from './mutations';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

const globalState = {
    loginUser: '',
    publishWebViewId: ''
}

export default new Vuex.Store({
    /**
     * Assign the modules to the store
     */
    modules: {'rect':  rect ,'event': event},
    state: globalState,
    /**
     * If strict mode should be enabled
     */
    strict: debug,
    mutations,
    actions
});
