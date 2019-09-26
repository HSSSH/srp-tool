import types from './mutation-types';

export default {
    addLayoutPanel({commit}, data){
        commit(types.ADD_LAYOUT_PANEL, data);
    },

    setGuideConfig({commit}, data){
        commit(types.SET_GUIDE_CONFIG, data);
    },

    addGuideContainer({commit}, data){
        commit(types.ADD_GUIDE_CONTAINER, data);
    },

    deleteGuideContainer({commit}, data){
        commit(types.DELETE_GUIDE_CONTAINER, data);
    },

    setLayout({commit}, {layoutData}){
        commit(types.SET_LAYOUT, layoutData);
    },

    setLayoutName({commit},obj){
        commit(types.SET_LAYOUT_NAME, obj);
    },
    
    setLayoutWidth({commit},obj){
        commit(types.SET_LAYOUT_WIDTH, obj);
    },

    setLayoutHeight({commit},obj){
        commit(types.SET_LAYOUT_HEIGHT,obj);
    },

    setLayoutBackground({commit},obj) {
        commit(types.SET_LAYOUT_BACKGROUND,obj);
    },

    deleteLayout({commit},containIndex){
        commit(types.DELETE_LAYOUT,containIndex);
    },

    colCut({commit}, seq){
        commit(types.COL_CUT, seq);
    },

    rowCut({commit}, seq){
        commit(types.ROW_CUT, seq);
    },

    deleteHorizontal({commit}, seq){
        commit(types.DELETE_HORIZONTAL, seq);
    },

    deleteVertical({commit}, seq){
        commit(types.DELETE_VERTICAL, seq);
    },

    setLayoutSmallBack({commit}, seq){
        commit(types.SET_LAYOUT_SMALL_BACK, seq);
    },

    setColWidth({commit}, seq){
        commit(types.SET_COL_WIDTH, seq);
    },

    setRowHeight({commit}, seq){
        commit(types.SET_ROW_HEIGHT, seq);
    },

    addNewRect({commit},{indexSequence,eleType,x,y}){
        commit(types.ADD_NEW_RECT, {indexSequence, eleType, x , y});
    },

    setActivateEv({commit}, {indexSequence,index,flag}) {
        commit(types.SET_ACTIVATE_EV,{indexSequence, index,flag});
    },

    setPosSize({commit}, {indexSequence,index, newRect}) {
        commit(types.CHANGE_RECT, {indexSequence,index, newRect});
    },

    changeConfig({commit},data){
        commit(types.CHANGE_CONFIG, data);
    },

    deleteElement({commit},data){
        commit(types.DELETE_ELEMENT,data);
    },

    setComResource({commit},{config}){
        commit(types.SET_COMRESOURCE,config);
    },

    setCopyResource({commit},config){
        commit(types.SET_COPY_RESOURCE,config);
    },
    
    getCopyResource({commit},config){
        commit(types.GET_COPY_RESOURCE,config);
    },
};
