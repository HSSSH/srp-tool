import {
    ADD_LAYOUT_PANEL,
    SET_GUIDE_CONFIG,
    ADD_GUIDE_CONTAINER,
    DELETE_GUIDE_CONTAINER,
    SET_LAYOUT,
    SET_LAYOUT_NAME,
    SET_LAYOUT_WIDTH,
    SET_LAYOUT_HEIGHT,
    SET_LAYOUT_BACKGROUND,
    DELETE_LAYOUT,
    COL_CUT,
    ROW_CUT,
    DELETE_HORIZONTAL,
    DELETE_VERTICAL,
    SET_LAYOUT_SMALL_BACK,
    SET_COL_WIDTH,
    SET_ROW_HEIGHT,
    ADD_NEW_RECT,
    SET_ACTIVATE_EV,
    CHANGE_RECT,
    CHANGE_CONFIG,
    DELETE_ELEMENT,
    SET_COMRESOURCE,
    SET_COPY_RESOURCE,
    GET_COPY_RESOURCE
} from './mutation-types';

export default {
    //增加总容器
    [ADD_LAYOUT_PANEL](state,data){
        let obj = JSON.parse(JSON.stringify(state.composePanel));
        obj.panelList.push(JSON.parse(JSON.stringify(state.layoutPanel)));
        switch(data.elementType){
            case 'layoutPanel':
                obj.type = 'single';
            break;
            case 'composePanel':
                obj.type = 'multiple';
                obj.panelList.push(JSON.parse(JSON.stringify(state.layoutPanel)));
                obj.panelList[0].name = '菜单1'
                obj.panelList[1].name = '菜单2'
            break;
        }
        obj.id = new Date().getTime();
        if(data.index == -1){
            state.layout.push(obj);
        }
        else if(data.index > -1){
            state.layout.splice(data.index, 0, obj);
        }
    },

    //设置导航容器配置
    [SET_GUIDE_CONFIG](state,data){
        state.layout[data.index].guideConfig = data.config;
    },

    //增加导航容器
    [ADD_GUIDE_CONTAINER](state,data){
        let obj = JSON.parse(JSON.stringify(state.layoutPanel));
        obj.name = '新菜单'
        if(data.index == -1){
            state.layout[data.num].panelList.push(obj);
        }
        else if(data.index > -1){
            state.layout[data.num].panelList.splice(data.index, 0, obj);
        }
    },

    //删除导航容器
    [DELETE_GUIDE_CONTAINER](state,data){
        state.layout[data.num].panelList.splice(data.index, 1);
    },

    //设置页面
    [SET_LAYOUT](state,layoutData){
        state.layout = layoutData;
    },

    //设置总容器名字
    [SET_LAYOUT_NAME](state,obj){
        state.layout[obj.containIndex[0]].panelList[obj.containIndex[1]].name = obj.val;
    },

    //设置总容器宽度
    [SET_LAYOUT_WIDTH](state,obj){
        state.layout[obj.containIndex[0]].panelList[obj.containIndex[1]].width = obj.val;
    },

    //设置总容器高度
    [SET_LAYOUT_HEIGHT](state,obj){
        state.layout[obj.containIndex[0]].panelList[obj.containIndex[1]].height = obj.val;
    },

    //设置总容器背景颜色
    [SET_LAYOUT_BACKGROUND](state,obj) {
        state.layout[obj.containIndex[0]].panelList[obj.containIndex[1]].background = obj.val;
    },

    //删除总容器
    [DELETE_LAYOUT](state,containIndex){
        state.layout.splice(containIndex[0], 1);
    },

    //纵切容器
    [COL_CUT](state,payload){
        state.layout[payload.i1].panelList[payload.i2].children.splice(payload.i3,0,{
            'width': '',
            'height': '100%',
            'children':[
                {
                    'width': '100%',
                    'height': '100%',
                    'background': 'transparent',
                    'rects': []
                }
            ]
        })
        let perWidth = Math.floor(100 / state.layout[payload.i1].panelList[payload.i2].children.length) + '%';
        state.layout[payload.i1].panelList[payload.i2].children.forEach(item => {
            item.width = perWidth;
        });
    },

    //横切容器
    [ROW_CUT](state,payload){
        state.layout[payload.i1].panelList[payload.i2].children[payload.i3].children.splice(payload.i4,0,{
            'width': '100%',
            'height': '',
            'background': 'transparent',
            'rects': [],
        })
        let perHeight = Math.floor(100 / state.layout[payload.i1].panelList[payload.i2].children[payload.i3].children.length) + '%';
        state.layout[payload.i1].panelList[payload.i2].children[payload.i3].children.forEach(item => {
            item.height = perHeight;
        });
    },

    //纵删容器
    [DELETE_HORIZONTAL](state,payload){
        if(state.layout[payload.i1].panelList[payload.i2].children.length > 1){
            state.layout[payload.i1].panelList[payload.i2].children.splice(payload.i3, 1);
            let perWidth = Math.floor(100 / state.layout[payload.i1].panelList[payload.i2].children.length) + '%';
            state.layout[payload.i1].panelList[payload.i2].children.forEach(item => {
                item.width = perWidth;
            });
        }
    },

    //横删容器
    [DELETE_VERTICAL](state,payload){
        if(state.layout[payload.i1].panelList[payload.i2].children[payload.i3].children.length > 1){
            state.layout[payload.i1].panelList[payload.i2].children[payload.i3].children.splice(payload.i4, 1);
            let perHeight = Math.floor(100 / state.layout[payload.i1].panelList[payload.i2].children[payload.i3].children.length) + '%';
            state.layout[payload.i1].panelList[payload.i2].children[payload.i3].children.forEach(item => {
                item.height = perHeight;
            });
        }
    },

    //设置分割容器背景
    [SET_LAYOUT_SMALL_BACK](state,payload){
        state.layout[payload.i1].panelList[payload.i2].children[payload.i3].children[payload.i4].background = payload.color;
    },

    [SET_COL_WIDTH](state,payload){
        state.layout[payload.i1].panelList[payload.i2].children[payload.i3].width = payload.str;
    },

    [SET_ROW_HEIGHT](state,payload){
        state.layout[payload.i1].panelList[payload.i2].children[payload.i3].children[payload.i4].height = payload.str;
    },

    //增加新组件
    [ADD_NEW_RECT](state, payload) {
        let obj = JSON.parse(JSON.stringify(state.initContainer));
        obj.id = new Date().getTime();
        obj.top = payload.y;
        obj.left = payload.x;
        switch(payload.eleType) {
            case 'label':
                obj.element = JSON.parse(JSON.stringify(state.initText));
                break;
            case 'picture':
                obj.element = JSON.parse(JSON.stringify(state.initPicture));
                break;
            case 'picTextTable':
                obj.element = JSON.parse(JSON.stringify(state.initPicTextTable));
                for (let i = 0; i < obj.element.config.rowNum; i++) {
                    obj.element.config.contentList[i] = [];
                    for (let j = 0; j < obj.element.config.columnNum; j++) {
                        obj.element.config.contentList[i].push({
                            row: i+1,
                            column: j+1,
                            text: `格子${i+1}-${j+1}`,
                            absoluteUrl: require("@/images/icon/upload-pic.png")
                        })
                    }
                }
                break;
            case 'slidePic':
                obj.element = JSON.parse(JSON.stringify(state.initSlidePic));
                break;
            case 'bottom': 
                obj.element = JSON.parse(JSON.stringify(state.initBottom));
                break;
            case 'button':
                obj.element = JSON.parse(JSON.stringify(state.initButton));
                break;
            case 'guide':
                obj.element = JSON.parse(JSON.stringify(state.initGuide));
                break;
            case 'companion':
                obj.element = JSON.parse(JSON.stringify(state.initCompanion));
                break;
            case 'picTextByPage':
                obj.element = JSON.parse(JSON.stringify(state.initPicTextByPage));
                break;
            case 'picTextByPage2':
                obj.element = JSON.parse(JSON.stringify(state.initPicTextByPage2));
                break;
            case 'sideGuide':
                obj.element = JSON.parse(JSON.stringify(state.initSideGuide));
                break;
            case 'video':
                obj.element = JSON.parse(JSON.stringify(state.initVideo));
                break;
            case 'slide':
                obj.element = JSON.parse(JSON.stringify(state.initSlide));
                break;
            case 'developSection':
                obj.element = JSON.parse(JSON.stringify(state.initDevelopSection));
                break;
            case 'slideDetail':
                obj.element = JSON.parse(JSON.stringify(state.initSlideDetail));
                break;
            case 'news':
                obj.element = JSON.parse(JSON.stringify(state.initNews));
                break;        
            case 'document':
                obj.element = JSON.parse(JSON.stringify(state.initDocument));
                break;
            case 'charts':
                obj.element = JSON.parse(JSON.stringify(state.initCharts));
                break;
            case 'select':
                obj.element = JSON.parse(JSON.stringify(state.initSelect));
                break;
            case 'album':
                obj.element = JSON.parse(JSON.stringify(state.initAlbum));
                break;
        }
        obj.width = obj.element.config.reSetWidth?obj.element.config.reSetWidth:obj.width;
        obj.height = obj.element.config.reSetHeight?obj.element.config.reSetHeight:obj.height;
        let panel = getPanel(state.layout,payload.indexSequence[0],payload.indexSequence[1],payload.indexSequence[2],payload.indexSequence[3]);
        if(panel){
            panel.rects.push(obj);
        }
    },

    [SET_ACTIVATE_EV](state,payload) {
        let node = getRect(state.layout,payload.indexSequence[0],payload.indexSequence[1],payload.indexSequence[2],payload.indexSequence[3],payload.index);
        if(payload.flag){
            let list = getAllRect(state.layout);
            list.forEach(item => {
                item.active = false;
            })
        }
        if(node){
            node.active = payload.flag;
        }
    },

    [CHANGE_RECT](state,payload) {
        let node = getRect(state.layout,payload.indexSequence[0],payload.indexSequence[1],payload.indexSequence[2],payload.indexSequence[3],payload.index);
        if(node){
            node.top = payload.newRect.top;
            node.left = payload.newRect.left;
            node.width = payload.newRect.width;
            node.height = payload.newRect.height;
            node.zIndex = payload.newRect.zIndex;
        }
    },

    //修改组件参数
    [CHANGE_CONFIG](state, data) {
        let node = getRect(state.layout,data.allIndex.indexSequence[0],data.allIndex.indexSequence[1],data.allIndex.indexSequence[2],data.allIndex.indexSequence[3],data.allIndex.index);
        if(node){ 
            for(let key in data.config){
                if(typeof data.config[key] != "function" && key != 'eleStyle' && key != 'guideList'){
                    node.element.config[key] = setKeyVal(key,data.config[key]);
                }
                if (key == 'eleStyle' || key == 'guideList' || key == 'slidePicList' || key == 'contentList' || key == 'srpSelectList' || key == 'imgStyle' || key=='titleStyle' || key == 'subTitleStyle') {
                    node.element.config[key] = JSON.parse(JSON.stringify(data.config[key]));
                }
            }
        }
    },

    //删除组件
    [DELETE_ELEMENT](state,payload){
        let panel = getPanel(state.layout,payload.indexSequence[0],payload.indexSequence[1],payload.indexSequence[2],payload.indexSequence[3]);
        if(panel){
            panel.rects.splice(payload.index, 1)
        }
    },

    //设置公共配置
    [SET_COMRESOURCE](state,config){
        state.comResource = config;
    },

    //复制容器设置
    [SET_COPY_RESOURCE](state,config){
        state.copyResource = JSON.parse(JSON.stringify(state.layout[config.i1].panelList[config.i2]));
    },

    //设置容器设置
    [GET_COPY_RESOURCE](state,config){
        if(state.copyResource.children){
            for(let key in state.layout[config.i1].panelList[config.i2]){
                if(typeof state.layout[config.i1].panelList[config.i2][key] != "function"){
                    state.layout[config.i1].panelList[config.i2][key] = state.copyResource[key]
                }
            }
        }
    },

};
//根据数组序号定位容器
function getPanel(list,i1,i2,i3,i4){
    return list[i1].panelList[i2].children[i3].children[i4];
}
//根据数组序号定位组件
function getRect(list,i1,i2,i3,i4,index){
    return list[i1].panelList[i2].children[i3].children[i4].rects[index];
}
//返回所有rect
function getAllRect(list){
    let result = [];
    list.forEach(element => {
        element.panelList.forEach(elementReal => {
            elementReal.children.forEach(child1 => {
                child1.children.forEach(child2 => {
                    child2.rects.forEach(item => {
                        result.push(item);
                    })
                })
            })
        })
    })
    return result;
}
//根据id搜索树,返回节点
function searchTreeNode(node,id) {
    let stark = [];
    stark = stark.concat(node);
    while(stark.length) {
        let temp = stark.shift();
        if(temp.element.config.children) {
            stark = stark.concat(temp.element.config.children);
        }
        if(temp.id === id) {
            return temp;
        }
    }
}
//展开树，返回数组
function getAllTreeNode(node) {
    let stark = [];
    let list = [];
    stark = stark.concat(node);
    while(stark.length) {
        let temp = stark.shift();
        list.push(temp);
        if(temp.element.config.children) {
            stark = stark.concat(temp.element.config.children);
        }
    }
    return list;
}
function setKeyVal(key,val){
    switch (key){
        case 'rowNum':
            return typeof(val) == 'string'?parseInt(val):val;
        case 'columnNum':
            return typeof(val) == 'string'?parseInt(val):val;
        case 'reSetWidth':
            return typeof(val) == 'string'?parseInt(val):val;
        case 'reSetHeight':
            return typeof(val) == 'string'?parseInt(val):val;
    }
    return val;
}
